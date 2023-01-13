import path from "path";
import nodemailer from "nodemailer";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";

import { host, port, user, pass } from "../config/mail.json";

export const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass },
});

const handlebarOption: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve(__dirname, "..", "template"),
    defaultLayout: undefined,
  },
  viewPath: path.resolve(__dirname, "..", "template"),
  extName: ".html"
};

transport.use("compile", hbs(handlebarOption));

const mailOptions = (
  to: string[],
  subject: string,
  template: string,
  context: any
) => {
  return {
    from: "contato@recollect.com.br",
    to,
    subject,
    template,
    context,
  };
};

export default mailOptions;
