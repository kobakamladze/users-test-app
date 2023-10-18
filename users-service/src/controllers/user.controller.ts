import { Request, Response, NextFunction } from "express";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";

// models
import User from "../../db/models/user.model.js";

// interfaces
import UserDTO from "../dtos/user.dto.js";
import sendEvent from "../utils/event.sender.js";

enum UserEvents {
  CREATED = "USER_CREATED",
  UPADTED = "USER_UPDATED",
}

const SALT = Number(process.env.SALT) || 10;
class UserController {
  async reigster(req: UserDTO, res: Response, next: NextFunction) {
    try {
      const { name, password }: { name: string; password: string } = req.body;

      const candidate: User | null = await User.findOne({ where: { name } });
      if (candidate) {
        return res
          .status(400)
          .send({ error: "User with such nickname already exists" });
      }

      const newUser: User = await new User({
        name,
        password: await hash(password, SALT),
      }).save();

      res
        .setHeader(
          "authorization",
          `Bearer ${jwt.sign({ name }, String(SALT))}`
        )
        .status(201)
        .send({ name: newUser.name });

      await sendEvent({ userId: newUser.id, eventType: UserEvents.CREATED });
    } catch (error) {
      res.status(500).send({ error: error || "Internal server error" });
    }
  }

  async login(req: UserDTO, res: Response, next: NextFunction) {
    try {
      const { name, password }: { name: string; password: string } = req.body;

      const candidate: User | null = await User.findOne({ where: { name } });
      if (!candidate) {
        return res.status(400).send({ error: "Invalid nickname or password" });
      }

      const passwordMatch: boolean = await compare(
        password,
        candidate.password
      );
      if (!passwordMatch) {
        return res.status(400).send({ error: "Invalid nickname or password" });
      }

      res
        .setHeader(
          "authorization",
          `Bearer ${jwt.sign({ name }, String(SALT))}`
        )
        .status(200)
        .send({ name: candidate.name });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error || "Internal server error" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const { name }: { name: string } = req.body;

      const candidate: User | null = await User.findByPk(id);
      if (!candidate) {
        return res.status(400).send({ error: "User does not exist" });
      }

      const senderData: { name: string } = jwt.decode(
        req.headers?.authorization?.split(" ")[1]!
      ) as { name: string };

      if (senderData?.name !== candidate.name) {
        return res.status(400).send({ error: "Invalid operation..." });
      }

      // only name can be updated in this application
      await User.update({ name }, { where: { id } });
      const updatedUser: User | null = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });

      res
        .setHeader(
          "authorization",
          `Bearer ${jwt.sign({ name: updatedUser!.name }, String(SALT))}`
        )
        .status(200)
        .send({ message: "Updated" });

      await sendEvent({ userId: candidate.id, eventType: UserEvents.UPADTED });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error || "Internal server error" });
    }
  }

  async getMany(req: Request, res: Response, next: NextFunction) {
    try {
      const page: number = Number(req.params.page);
      const limit: number = 5;
      const offset: number = limit * (page - 1);

      const usersList: User[] = await User.findAll({
        offset,
        limit,
        attributes: { exclude: ["password"] },
      });

      res.status(200).send(usersList);
    } catch (error) {
      res.status(500).send({ error: error || "Internal server error" });
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const candidate: User | null = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!candidate) {
      return res.status(400).send({ error: "User does not exist" });
    }

    res.status(200).send(candidate);
  }
}

export default new UserController();
