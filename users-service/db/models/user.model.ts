import Sequelize, { Model } from "sequelize";
import sequelize from "../db.js";

class User extends Model {
  public id!: number;
  public name!: string;
  public password!: string;
}
User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Users",
    defaultScope: {
      raw: true,
    },
  }
);

export default User;
