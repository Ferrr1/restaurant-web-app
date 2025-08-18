import { sql } from "../config/db.config.js";

export async function createLogsTable() {
  await sql`CREATE TABLE IF NOT EXISTS logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`;

  await sql`CREATE INDEX IF NOT EXISTS idx_logs_user_id ON logs(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_logs_action ON logs(action)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at)`;
}
