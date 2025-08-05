import { sql } from "../config/db.config.js";

export async function createDishesTable() {
  await sql`CREATE TABLE IF NOT EXISTS dishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE SET NULL,
    image VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    ordered INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  )`;

  await sql`CREATE INDEX IF NOT EXISTS idx_dishes_category_id ON dishes(category_id)`;
}
