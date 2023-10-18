import e from "cors";
import Event from "../../db/models/event.model.js";

class EventsController {
  async create(req, res, next) {
    try {
      const { userId, eventType } = req.body;

      await new Event({ userId: Number(userId), eventType }).save();

      res.status(201).send("Event created.");
    } catch (error) {
      res.status(500).send({ message: "Internal server error..." });
    }
  }

  async getEvents(req, res, next) {
    try {
      const limit = 15;
      const page = Number(req.params.page);
      const userId = Number(req.params.userId);
      const offset = limit * (page - 1);

      const events = await Event.findAll({
        offset,
        limit,
        where: { userId },
      });

      res.status(200).send(events);
    } catch (error) {
      res.status(500).send({ message: "Internal server error..." });
    }
  }
}

export default new EventsController();
