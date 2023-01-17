import { Request, Response } from "express";
import mailOptions, { transport } from "../modules/mailer";
import MESSAGE from "../constants/messages";

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
            .send(MESSAGE.ERROR.EMAIL_SEND_FAILURE);
        }
        return res.status(201).send(MESSAGE.SUCCESS.EMAIL_SEND);
      });
    } catch (error) {
      res.status(500).send(MESSAGE.ERROR.SERVER_ERROR);
    }
  }
}

export default ContactController;
