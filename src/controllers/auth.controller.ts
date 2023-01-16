import { Request, Response } from "express";
import prisma from "../database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mailOptions, { transport } from "../modules/mailer";

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
        return res
          .status(401)
          .json("Email ou senha inválido, verifique e tente novamente.");
      }
      if (!bcrypt.compareSync(password, company.password)) {
        return res
          .status(401)
          .send("Email ou senha inválido, verifique e tente novamente.");
      }

      const token = jwt.sign(
        {
          company,
        },
        String(process.env.SECRET_KEY)
      );
      return res.json(token);
    } catch (error) {
      return res.status(500).send("Ocorreu algum problema, contate o suporte.");
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

      if (!company) return res.status(400).send("Email não encontrado.");

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
          return res
            .status(400)
            .send("Email de senha esquecida não pode ser enviado.");
        }
        return res.json({
          token: token,
          date: now,
        });
      });
    } catch (error) {
      res.status(500).send("Ocorreu algum problema, contate o suporte.");
    }
  }
  public async reset_password(req: Request, res: Response) {
    const { loginEmail, token, password } = req.body;

    try {
      const company = await prisma.company.findFirst({
        where: {
          loginEmail,
          passwordResetToken: token,
        },
      });
      if (!company) return res.status(400).send("Empresa não encontrada.");

      if (!company.passwordResetToken || !company.passwordResetExpires)
        return res.status(400).send("Token inválido");

      if (company.passwordResetExpires < new Date()) {
        return res.status(400).send("Token expirado");
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
      return res.status(200).send("Senha atualizada com sucesso");
    } catch (error) {
      res
        .status(400)
        .json("Não é possível redefinir a senha, tente novamente.");
    }
  }
}

export default AuthController;
