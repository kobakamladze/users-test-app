import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const port = process.env?.DATABASE_PORT
  ? Number(process.env?.DATABASE_PORT)
  : 5432;

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    port: port,
    host: process.env.DATABASE_HOST,
  }
);

export default sequelize;
