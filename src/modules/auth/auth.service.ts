import bcrypt from "bcryptjs";
import config from "../../config";
import { pool } from "../../db";
import type { IUser } from "./auth.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  // console.log("Payload", payload);

  // Password Hashing Before UPloading In Neon DB
  //   const salt = config.salt;
  const hashPassword = await bcrypt.hash(password, 10);
  //   console.log(hashPassword);

  // user login info added in db
  const result = await pool.query(
    `INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *;
    `,
    [name, email, hashPassword, role],
  );
  //   console.log("result", result);
  return result;
};

export const authService = {
  createUserIntoDB,
};
