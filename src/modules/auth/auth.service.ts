import bcrypt from "bcryptjs";
import config from "../../config";
import { pool } from "../../db";
import type { IUser } from "./auth.interface";
import jwt from "jsonwebtoken";

// signin user
const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  // console.log("Payload", payload);

  // Password Hashing Before UPloading In Neon DB
  //   const salt = config.salt;
  const hashPassword = await bcrypt.hash(password, 10);
  //   console.log(hashPassword);

  // user login info added in db
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *;
    `,
    [name, email, hashPassword, role],
  );
  //   console.log("result", result);

  delete result.rows[0].password;
  return result;
};

// login user
const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  const userData = await pool.query(
    `
        SELECT * FROM users
        WHERE
        email = $1
        `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("Invalid Credentials");
  }

  const user = userData.rows[0];
  //   console.log("line 48",user);
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  // console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    throw new Error("Invalid Credentials");
  }

  // Generate Token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  const token = jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: "1d",
  });
  // console.log(accessToken);
  return {token, jwtPayload};
};

export const authService = {
  createUserIntoDB,
  loginUserIntoDB,
};
