import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utility/sendResponse";


const signupUser = async (req: Request, res: Response)=>{
    try {
        // console.log(req.body);
        const result = await authService.createUserIntoDB(req.body);
        // console.log("\n Just user info: ", result.rows);
        sendResponse(res,{
            statusCode: 201,
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })
        
    } catch (error: any) {
        sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error
    });
    }
};

export const authController = {
    signupUser,
}