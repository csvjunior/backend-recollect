import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import routes from "./routes";


dotenv.config();

async function main(): Promise<void> {

  const app = express();
  

  app.use(cors());
  app.use(express.json());

  app.use(routes);

  app.listen(3000, async () => {
    console.log("🚀 Servidor rodando na porta 3000");
  });
}

main()
    .catch(async (e) => {

        console.error(e)
        process.exit(1)

    })