import { Request, Response } from "express";
import prisma from "../database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mailOptions, { transport } from "../modules/mailer";
import MESSAGE from "../constants/messages";

class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const { loginEmail, password } = req.body;

      const company = await prisma.company.findFirst({
        where: {
          loginEmail,
        },
      });
      if (!company) {
        return res.status(401).json(MESSAGE.ERROR.EMAIL_PASS_INVALID);
      }
      if (!bcrypt.compareSync(password, company.password)) {
        return res.status(401).send(MESSAGE.ERROR.EMAIL_PASS_INVALID);
      }

      const token = jwt.sign(
        {
          company,
        },
        String(process.env.SECRET_KEY)
      );
      return res.json(token);
    } catch (error) {
      return res.status(500).send(MESSAGE.ERROR.SERVER_ERROR);
    }
  }

  public async forgot_password(req: Request, res: Response) {
    const { loginEmail } = req.body;

    try {
      const company = await prisma.company.findFirst({
        where: {
          loginEmail,
        },
      });

      if (!company) return res.status(400).send(MESSAGE.ERROR.EMAIL_INVALID);

      const token = crypto.randomBytes(20).toString("hex");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await prisma.company.update({
        data: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
        where: { loginEmail },
      });

      const options = mailOptions(
        loginEmail,
        "Recuperação de senha",
        "forgot_password",
        {
          token,
        }
      );

      transport.sendMail(options, (error: any) => {
        if (error) {
          return res.status(400).send(MESSAGE.ERROR.FORGOT_PASSWORD_CANNOT);
        }
        return res.json({
          token: token,
          date: now,
        });
      });
    } catch (error) {
      res.status(500).send(MESSAGE.ERROR.SERVER_ERROR);
    }
  }
  public async reset_password(req: Request, res: Response) {
    const { token, password } = req.body;

    try {
      const company = await prisma.company.findFirst({
        where: {
          passwordResetToken: token,
        },
      });
      if (!company) return res.status(400).send(MESSAGE.ERROR.COMPANY_INVALID);

      if (!company.passwordResetToken || !company.passwordResetExpires)
        return res.status(400).send(MESSAGE.ERROR.TOKEN_INVALID);

      if (company.passwordResetExpires < new Date()) {
        return res.status(400).send(MESSAGE.ERROR.TOKEN_EXPIRED);
      }

      const newPassword = bcrypt.hashSync(password, 10);

      await prisma.company.update({
        data: {
          password: newPassword,
        },
        where: {
          id: company.id,
        },
      });
      return res.status(200).send(MESSAGE.SUCCESS.PASSWORD_UPDATE);
    } catch (error) {
      res.status(400).json(MESSAGE.ERROR.RESET_PASSWORD_ERROR);
    }
  }
}

export default AuthController;
