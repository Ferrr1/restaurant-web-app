import "dotenv/config";

export const config = Object.freeze({
  PORT: process.env.PORT || 5001,
  DATABASE_URL: process.env.DATABASE_URL,
  TOKEN: process.env.JWT_SECRET,
});
