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

      const role = (decoded as any).role;

      // console.log("Auth Middleware line no 21 :\n", role);

      if (roles.length && !roles.includes(role)) {
        throw new Error("Forbidden");
      }

      // console.log("Auth Middleware line no 29 :\n", decoded);

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
