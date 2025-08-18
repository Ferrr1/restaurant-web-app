import { sql } from "../config/db.config.js";

export async function createRefreshTokenTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS tokens (
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token VARCHAR(255) NOT NULL UNIQUE,
      expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
      type VARCHAR(50) NOT NULL CHECK (type IN ('refresh', 'access', 'password_reset'))
    );
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_tokens_user_id ON tokens(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_tokens_type ON tokens(type)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_tokens_expires_at ON tokens(expires_at)`;
}
