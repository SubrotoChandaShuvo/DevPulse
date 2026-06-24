import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connectionString,
});

export const initDB = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(20) NOT NULL DEFAULT 'contributor' CHECK (role IN ('contributor', 'maintainer')),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
  } catch (error) {
    console.error("Error initializing DB:", error);
    throw error;
  }
};
