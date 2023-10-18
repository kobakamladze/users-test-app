import express from "express";
import cors from "cors";
import { config } from "dotenv";

import sequelize from "../db/db.js";

import router from "./routes/index.js";

// enabling dotenv
config();

const PORT = process.env?.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database...");

    app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}...`));
  } catch (error: any) {
    // if connection to database was not established function stops working immediately
    throw error;
  }
}
start();
