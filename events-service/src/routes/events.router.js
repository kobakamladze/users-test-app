import { Router } from "express";

import eventsController from "../controllers/events.controller.js";

const eventsRouter = Router();

/*
    GET /events/:page/:userId

    Fetches multiple events of particular user by userId
*/
eventsRouter.get("/events/:page/:userId", eventsController.getEvents);

/*
    POST /events/crate

    Creates event
*/
eventsRouter.post("/events/create", eventsController.create);

export default eventsRouter;
