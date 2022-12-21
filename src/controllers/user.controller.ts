import { Request, Response } from "express";
import prisma from "../database";

class UserController {
  public async index(req: Request, res: Response) {

    const users = await prisma.user.findMany();

    res
      .json({ message: "Usuários recuperados com sucesso!", users })
      .status(200);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.json(user).status(200);
  }

  public async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const user = await prisma.user.create({
      data: {
        name,
        email
      },
    });

    return res.json(user).status(201);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;


    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const updatedUser = await prisma.user.update({
      data: {
        name,
        email,
      },
      where: { id },
    });

    res.json(updatedUser).status(200);
  }

  public async delete(req: Request, res: Response) {
    const {id} = req.params;

    const user = await prisma.user.findFirst({
      where: {
        id
      }
    })

    if(!user){
      return res.status(404).json({error: 'Usuário não encontrado.'})
    }

    await prisma.user.delete({
      where: {
        id
      }
    })

    return res.sendStatus(204);
  }
}

export default UserController;
