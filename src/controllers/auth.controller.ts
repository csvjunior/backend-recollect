import { Request, Response } from "express";
import prisma from "../database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mailOptions, { transport } from "../modules/mailer";

class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const company = await prisma.company.findFirst({
        where: {
          email,
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
          .json("Email ou senha inválido, verifique e tente novamente.");
      }

      const token = jwt.sign(
        {
          company,
        },
        String(process.env.SECRET_KEY)
      );
      return res.json(token);
    } catch (error) {
      return res.status(500).json("Ocorreu algum problema, contate o suporte.");
    }
  }

  public async forgot_password(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const company = await prisma.company.findFirst({
        where: {
          email,
        },
      });

      if (!company) return res.status(400).json("Email não encontrado.");

      const token = crypto.randomBytes(20).toString("hex");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      const updatedCompany = await prisma.company.update({
        data: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
        where: { email },
      });
      const options = mailOptions(
        email,
        "Recuperação de senha",
        "forgot_password",
        {
          token,
        }
      );

      transport.sendMail(options, (error) => {
        if (error) {
          return res
            .status(400)
            .json("Email de senha esquecida não pode ser enviado.");
        }
        return res.json({
          token: token,
          date: now,
        });
      });
    } catch (error) {
      res.status(400).json("Ocorreu algum problema, contate o suporte.");
    }
  }
  public async reset_password(req: Request, res: Response) {
    const { email, token } = req.body;

    try {
      const company = await prisma.company.findFirst({
        where: {
          email,
          passwordResetToken: token,
        },
      });
      if (!company) return res.status(400).json("Empresa não encontrada.");
      if (!company.passwordResetExpires)
        return res.status(400).json("Token inválido");

      if (company.passwordResetExpires < new Date()) {
        return res.status(400).json("Token expirado");
      }
      return res.status(200).json("Senha atualizada com sucesso");
    } catch (error) {
      res
        .status(400)
        .json("Não é possível redefinir a senha, tente novamente.");
    }
  }
}

export default AuthController;
