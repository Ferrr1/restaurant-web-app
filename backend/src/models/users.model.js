import { sql } from "../config/db.config.js";

export async function createUsersTable() {
  await sql`CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(255),
    role VARCHAR(10) CHECK (role IN ('admin', 'cashier')) NOT NULL
  )`;
}
