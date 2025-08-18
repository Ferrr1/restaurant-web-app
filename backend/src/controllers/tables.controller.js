import { sql } from "../config/db.config.js";

export const getTables = async (req, res) => {
  try {
    const tables = await sql`SELECT * FROM tables`;
    res.status(200).json(tables);
  } catch (error) {
    console.error("Get tables error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while retrieving table data",
    });
  }
};
export const addTable = async (req, res) => {
  try {
    const { capacity, status } = req.body;
    if (!capacity || !status)
      return res.status(400).json({ error: "All fields are required" });
    if (capacity < 1 || capacity > 8) {
      return res
        .status(400)
        .json({ error: "Capacity must be between 1 and 8" });
    }
    const [{ number: latestNumber }] =
      await sql`SELECT number FROM tables ORDER BY number DESC LIMIT 1`;
    const number = latestNumber + 1;
    await sql`INSERT INTO tables (number, capacity, status) VALUES (${number}, ${capacity}, ${status})`;
    res.status(201).json({ message: "Table added successfully" });
  } catch (error) {
    console.error("Add table error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while adding table",
    });
  }
};
export const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    await sql`DELETE FROM tables WHERE id = ${id}`;
    res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    console.error("Delete table error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while deleting table",
    });
  }
};
export const updateTable = async (req, res) => {
  try {
    const { id } = req.params;
    const { capacity, status } = req.body;
    if (!capacity || !status)
      return res.status(400).json({ error: "All fields are required" });
    if (capacity < 1 || capacity > 8) {
      return res
        .status(400)
        .json({ error: "Capacity must be between 1 and 8" });
    }
    await sql`UPDATE tables SET capacity = ${capacity}, status = ${status} WHERE id = ${id}`;
    res.status(200).json({ message: "Table updated successfully" });
  } catch (error) {
    console.error("Update table error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while updating table",
    });
  }
};
