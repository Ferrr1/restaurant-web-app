import { sql } from "../config/db.config.js";

export async function createCategoryTable() {
  await sql`CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    image VARCHAR(255) NOT NULL
  )`;
}
