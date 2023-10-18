import { Request } from "express";

export default interface UserDTO extends Request {
  body: { name: string; password: string };
}
