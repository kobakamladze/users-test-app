import { Router } from "express";

import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = Router();

/*
    POST /api/users/register

    Creates user
*/
userRouter.post("/register", userController.reigster);

/*
    POST /api/users/login

    Login endpoint
*/
userRouter.post("/login", userController.login);

/*
    GET /api/users/:id

    Fetches one user from database
*/
userRouter.get("/:id", authMiddleware, userController.getOne);

/*
    GET /api/users/:page

    Fetches multiple users from database based on offset which is calculated using page number
*/
userRouter.get("/", authMiddleware, userController.getMany);

/*
    PUT /api/users/update/:id

    Updates user information
*/
userRouter.put("/update/:id", authMiddleware, userController.update);

export default userRouter;
