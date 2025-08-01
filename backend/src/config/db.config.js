import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { createUsersTable } from "../models/users.model.js";

// Create a SQL Connectioon using Database URL
export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
  try {
    await createUsersTable();

    console.log("Database Initialize Successfully :)");
  } catch (error) {
    console.log("Error Initializing Database", error);
    process.exit(1);
  }
}
