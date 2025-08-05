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
    const { name, phoneNumber, table: tableId } = req.body;
    await sql`INSERT INTO customers (name, phoneNumber, table_id, created_at) VALUES (${name}, ${phoneNumber}, ${tableId}, NOW()) RETURNING *`;
    res.status(201).json({ message: "Reservation added successfully" });
  } catch (error) {
    console.error("Add reservation error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while adding reservation",
    });
  }
};
