import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import routes from "./routes";
import handleError = require("./middlewares/handleError");
import MESSAGE from "./constants/messages";


dotenv.config();

async function main(): Promise<void> {

  const app = express();
  

  app.use(cors());
  app.use(express.json());

  app.use(routes);

  app.use(handleError);

  app.listen(3000, async () => {
    console.log(MESSAGE.SUCCESS.SERVER_RUNNING);
  });
}

main()
    .catch(async (e) => {

        console.error(e)
        process.exit(1)

    })