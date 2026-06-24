import { pool } from "../../db";
import type { IUser } from "./auth.interface";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  // console.log("Payload", payload);
  // const hashPassword =
  const result = await pool.query(
    `INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *;
    `,
    [name, email, password, role],
  );
  //   console.log("result", result);
  return result;
};

export const authService = {
  createUserIntoDB,
};
