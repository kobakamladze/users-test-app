import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    // getting token itself from header with value of "Bearer {ACTUAL_TOKEN}"
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) return res.status(401).send({ error: "Not aurthorized" });

    const decoded = jwt.verify(token, process.env.SALT!);
    if (!decoded) return res.status(401).send({ error: "Not aurthorized" });
    next();
  } catch (e) {
    console.log(e);
    next(e);
  }
}
