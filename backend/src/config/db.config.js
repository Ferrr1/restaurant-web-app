import { neon } from "@neondatabase/serverless";
import { createUsersTable } from "../models/users.model.js";
import { config } from "./config.js";
import { createLogsTable } from "../models/logs.model.js";
import { createRefreshTokenTable } from "../models/tokens.model.js";
import { createDishesTable } from "../models/dishes.model.js";
import { createCategoryTable } from "../models/category.model.js";
import { createTablesTable } from "../models/tables.model.js";
import { createCustomersTable } from "../models/customers.model.js";

// Create a SQL Connectioon using Database URL
export const sql = neon(config.DATABASE_URL);

export async function initDB() {
  try {
    await createUsersTable();
    await createLogsTable();
    await createRefreshTokenTable();
    await createCategoryTable();
    await createDishesTable();
    await createTablesTable();
    await createCustomersTable();

    console.log("Database Initialize Successfully :)");
  } catch (error) {
    console.log("Error Initializing Database", error);
    process.exit(1);
  }
}
