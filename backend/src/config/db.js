import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// Create a SQL Connectioon using Database URL
export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
  try {
    // Create users table
    await sql`CREATE TABLE IF NOT EXISTS users(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(10) CHECK (role IN ('admin', 'kasir'))
    )`;

    // Create products table
    await sql`CREATE TABLE IF NOT EXISTS products(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        barcode VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        unit VARCHAR(50) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        cost_price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL
    )`;

    // Create transactions table
    await sql`CREATE TABLE IF NOT EXISTS transactions(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        cashier_id UUID NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        payment DECIMAL(10, 2) NOT NULL,
        change DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (cashier_id) REFERENCES users(id)
    )`;

    // Create transaction_items table
    await sql`CREATE TABLE IF NOT EXISTS transaction_items(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        transaction_id UUID NOT NULL,
        product_id UUID NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (transaction_id) REFERENCES transactions(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    )`;

    console.log("Database Initialize Successfully :)");
  } catch (error) {
    console.log("Error Initializing Database", error);
    process.exit(1);
  }
}