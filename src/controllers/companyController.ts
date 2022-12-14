import express from "express";
import { Request, Response } from "express";
import prisma from "../database";

const app = express();
app.use(express.json());

app.post("/", async (req: Request, res: Response) => {
  const { name, email, address, telephone } = req.body;
  const company = await prisma.user.create({ data: { name, email } });
  return res.json({ company });
});
