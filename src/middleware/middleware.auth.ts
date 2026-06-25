import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import type { ROLES } from "../types";

const auth = (...roles: ROLES[]) => {
    
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log("Headers Authorization\n", req.headers.authorization);

      const token = req.headers.authorization;

      if (!token) {
        throw new Error("Unauthorized");
      }

      const decoded = jwt.verify(token, config.secret as string);

      req.user = decoded as any;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
