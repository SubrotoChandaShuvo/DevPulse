import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utility/sendResponse";
import jwt from "jsonwebtoken";
import config from "../../config";

// signin user
const signupUser = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const result = await authService.createUserIntoDB(req.body);
    // console.log("\n Just user info: ", result.rows);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// login user
const loginUser = async (req: Request, res: Response) => {
  try {
    // console.log("--------\n before getting", req.body, "\n---------");
    const result = await authService.loginUserIntoDB(req.body);
    // console.log("oi ki reee", result);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};


export const authController = {
  signupUser,
  loginUser,
};
