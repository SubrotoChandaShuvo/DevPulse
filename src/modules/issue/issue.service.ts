import { pool } from "../../db";
import type { GET_USER_QUERY } from "../../types";
import type { IIssue } from "./issue.interface";

const createIssueIntoDB = async (payload: IIssue) => {
  const { title, description, type, reporter_id } = payload;

  const result = await pool.query(
    `
        INSERT INTO issues (title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *;
        `,
    [title, description, type, reporter_id],
  );

  return result;
};

const getAllIssuesFromDB = async (payload: GET_USER_QUERY) => {
  const { type, status, sort = "newest" } = payload;
  let issues = `SELECT * FROM issues`;

  const conditions: string[] = [];
  const values: any[] = [];

  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  if (conditions.length > 0) {
    issues += ` WHERE ${conditions.join(" AND ")}`;
  }

  //sorting
  if (sort === "oldest") {
    issues += ` ORDER BY created_at ASC`;
  } else {
    issues += ` ORDER BY created_at DESC`;
  }

  const issuesResult = await pool.query(issues, values);

  const result = issuesResult.rows;

  // reporter info add
  for (const issue of result) {
    const userResult = await pool.query(
      `
      SELECT id, name, role
      FROM users
      WHERE id = $1
      `,
      [issue.reporter_id],
    );

    issue.reporter = userResult.rows[0];

    delete issue.reporter_id;
  }

  return result;
};

const getSingleIssueFromDB = async (payLoad: string) => {
  console.log(payLoad);
  const result = await pool.query(
    `
        SELECT * FROM issues 
        WHERE id = $1`,
    [payLoad],
  );
  //   console.log(result.rows[0]);
  const issue = result.rows[0];
  const reporterInfo = await pool.query(
    `
    SELECT id, name, role FROM users 
    WHERE id=$1`,
    [issue.reporter_id],
  );
  //   console.log(reporterInfo.rows[0]);
  //   issue.reporter = reporterInfo.rows[0];
  //   console.log(issue);
  delete issue.reporter_id;
  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: reporterInfo.rows[0],
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
};
