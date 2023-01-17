import { Request, Response } from "express";
import mailOptions, { transport } from "../modules/mailer";

class ContactController {
  public async create(req: Request, res: Response) {
    const { firstName, lastName, email, message } = req.body;

    try {
      const options = mailOptions(
        ["contato@recollect.com.br"],
        `Recebemos um contato de ${firstName} ${lastName}`,
        "contact",
        {
          firstName,
          lastName,
          email,
          message,
        }
      );

      transport.sendMail(options, (error: any) => {
        if (error) {
          return res
            .status(400)
            .send("Falha no envio do email, tente novamente.");
        }
        return res.status(201).send("Email enviado com sucesso.");
      });
    } catch (error) {
      res.status(500).send("Ocorreu algum problema, contate o suporte.");
    }
  }
}

export default ContactController;
