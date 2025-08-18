import { sql } from "../config/db.config.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await sql`SELECT * FROM customers ORDER BY name ASC`;
    res.status(200).json(customers);
  } catch (error) {
    console.error("Get customers error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while retrieving customer data",
    });
  }
};

export const addReservation = async (req, res) => {
  try {
    const { name, phoneNumber, table: tableId, status } = req.body;
    if ((!name, !phoneNumber, !tableId))
      return res
        .status(400)
        .json({ error: "Name, phone number, and table must be provided" });
    if (status !== "dine in" && status !== "reserved")
      return res
        .status(400)
        .json({ error: "Status must be dine in or reserved" });
    const [statusTable] =
      await sql`SELECT status FROM tables WHERE id = ${tableId}`;
    console.log(statusTable);
    if (statusTable.status === "reserved")
      return res.status(400).json({ error: "Table is already reserved" });
    if (statusTable.status === "dine in")
      return res.status(400).json({ error: "Table is already occupied" });
    const [existingCustomer] =
      await sql`SELECT * FROM customers WHERE name = ${name} AND phoneNumber = ${phoneNumber}`;
    if (existingCustomer)
      return res.status(400).json({
        error: "Customer with the same Name or Phone Number Already Exists",
      });
    try {
      const [newCustomer] =
        await sql`INSERT INTO customers (name, phoneNumber, table_id, created_at) VALUES (${name}, ${phoneNumber}, ${tableId}, NOW()) RETURNING *`;
      console.debug("New customer inserted:", newCustomer);
      await sql`UPDATE tables SET status = ${status} WHERE id = ${tableId}`;
    } catch (error) {
      console.error("Error inserting customer:", error);
      throw error;
    }
    res.status(201).json({ message: "Reservation added successfully" });
  } catch (error) {
    console.error("Add reservation error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while adding reservation",
    });
  }
};
