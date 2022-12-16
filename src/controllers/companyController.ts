import express from "express";
import { Request, Response } from "express";
import prisma from "../database";

const app = express();
app.use(express.json());

app.post("/", async (req: Request, res: Response) => {
  const { name, email, password, address, phone } = req.body;
  const company = await prisma.company.create({ data: { name, email, password, address, phone } });
  return res.json({ company });
});

