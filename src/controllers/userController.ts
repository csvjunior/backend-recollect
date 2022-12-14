import express from "express";
import { Request, Response } from "express";
import prisma from "../database";

const app = express();        
    app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
    res.json({ message: "Servidor funcionando com sucesso" });
});

app.post("/", async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({data: {name, email}});
    return res.json({ user });
});
app.get("/get-all", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: {
            posts: true
        }
        
    });
    res.json({ message: "Usuários recuperados com sucesso!", users });
});