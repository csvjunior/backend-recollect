import { Request, Response } from "express";
import prisma from "../database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
}

export default AuthController;
