import type { Request, Response } from "express";
import { issueService } from "./issue.service";
import sendResponse from "../../utility/sendResponse";
import type { GET_USER_QUERY } from "../../types";

const createIssue = async (req: Request, res: Response) => {
  try {
    // console.log(req.user);
    const reporter_id = req.user?.id;

    const issueInfo = {
      ...req.body,
      reporter_id,
    };
    const result = await issueService.createIssueIntoDB(issueInfo);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
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

const getAllUser = async (req: Request, res: Response) => {
  //   console.log("\nIssueController line no 34:\n", req.query);
  try {
    const result = await issueService.getAllIssuesFromDB(
      req.query as GET_USER_QUERY,
    );
    // console.log(result);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issues retrieved successfully",
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

export const issueController = {
  createIssue,
  getAllUser,
};
