import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

import sequelize from "../db/db.js";
import eventsRouter from "./routes/events.router.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:8000" }));

app.use("/api", eventsRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database...");

    app.listen(PORT, console.log(`Server listening on PORT: ${PORT}...`));
  } catch (error) {
    // if connection to database was not established function stops working immediately
    throw error;
  }
};
start();
