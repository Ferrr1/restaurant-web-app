import { sql } from "../config/db.config.js";

export async function createTablesTable() {
  await sql`CREATE TABLE IF NOT EXISTS tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number INTEGER UNIQUE NOT NULL,
    occupied INTEGER DEFAULT 0,
    capacity INTEGER NOT NULL,
    status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  )`;

  //   await sql`CREATE INDEX IF NOT EXISTS idx_dishes_category_id ON dishes(category_id)`;
}
