import { Request, Response } from "express";
import prisma from "../database";

import express from "express";


const app = express();
app.use(express.json());

app.post("/", async (req: Request, res: Response) => {
  const { name, email, password, address, phone } = req.body;
  const company = await prisma.company.create({ 
    data: { 
        name, 
        email,
        password, 
        address,
        phone 
      }, 
    });

  return res.json({ company });
});

class CompanyController {
  public async index(req: Request, res: Response) {

    const companies = await prisma.company.findMany();

    res
      .json({ message: "Empresas recuperadas com sucesso!", companies })
      .status(200);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const company = await prisma.company.findFirst({
      where: {
        id,
      },
    });

    if (!company) {
      return res.status(404).json({ error: "Empresa não encontrada!" });
    }

    return res.json(company).status(200);
  }

  public async create(req: Request, res: Response) {
    const { name, email, password, address, phone } = req.body;

    const company = await prisma.company.create({
      data: {
        name,
        email,
        password,
        address,
        phone
      },
    });

    return res.json(company).status(201);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, password, address, phone } = req.body;


    const company = await prisma.company.findFirst({
      where: {
        id,
      },
    });

    if(!company){
      return res.status(404).json({
        error: "Empresa não encontrada!"
      })
    }

    const updatedCompany = await prisma.company.update({
      data: {
        name,
        password,
        address,
        phone
      },
      where: { id },
    });

    res.json(updatedCompany).status(200);
  }

  public async delete(req: Request, res: Response) {
    const {id} = req.params;

    const company = await prisma.company.findFirst({
      where: {
        id
      }
    })

    if(!company){
      return res.status(404).json({error: 'Empresa não encontrada!.'})
    }

    await prisma.company.delete({
      where: {
        id
      }
    })

    return res.sendStatus(204);
  }
}

export default CompanyController;
