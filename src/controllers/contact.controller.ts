import { Request, Response } from "express";
import prisma from "../database";

class ContactController {
    public async index(req: Request, res: Response) {
      const contacts = await prisma.company.findMany();
  
      res
        .json({ message: "Mensagem enviada com sucesso!", contacts })
        .status(200);
    }


    public async show(req: Request, res: Response) {
        const { id } = req.params;
    
        const contacts = await prisma.user.findFirst({
          where: {
            id,
          },
        });

        if (!contacts) {
            return res.status(404).json({ error: "Erro ao enviar sua mensagem!" });
          }
      
          return res.json(contacts).status(200);
        }

     public async create(req: Request, res: Response) {
    const {
      FirtName,
      LastName,
      email,
      message,
      } = req.body;
    }

    
}

export default ContactController;