import { Request, Response } from "express";
import prisma from "../database";

class CommentController {
  public async index(req: Request, res: Response) {
    const comment = await prisma.comment.findMany();

    res
      .json({ message: "Mensagem recuperada com sucesso!", comment })
      .status(200);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const comment = await prisma.comment.findFirst({
      where: {
        id,
      },
    });

    if (!comment) {
      return res.status(404).json({ error: "Mensagem não encontrada." });
    }

    return res.json(comment).status(200);
  }

  public async create(req: Request, res: Response) {
    const { name, email, address } = req.body;

    const comment = await prisma.comment.create({
      data: {
        email,
      },
    });

    return res.json(comment).status(201);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, address } = req.body;

    const comment = await prisma.comment.findFirst({
      where: {
        id,
      },
    });

    if (!comment) {
      return res.status(404).json({ error: "Mensagem não encontrada!." });
    }

    const updatedcomment = await prisma.comment.update({
      data: {
        name,
      },
      where: { id },
    });

    res.json(updatedcomment).status(200);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const comment = await prisma.comment.findFirst({
      where: {
        id,
      },
    });

    if (!comment) {
      return res.status(404).json({ error: "Mensagem não encontrada!." });
    }

    await prisma.comment.delete({
      where: {
        id,
      },
    });

    return res.send().status(204);
  }
}

export default CommentController;
