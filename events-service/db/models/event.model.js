import Sequelize, { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";

class Event extends Model {
  id;
  userId;
  eventType;
}

Event.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    eventType: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Event",
    defaultScope: {
      raw: true,
    },
  }
);

export default Event;
