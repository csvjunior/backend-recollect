import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.listen(3000, async () => {
    console.log(`🚀 Service started and listening at: http://127.0.0.1:3000`);
  });
}
