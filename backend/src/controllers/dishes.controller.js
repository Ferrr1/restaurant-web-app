import { sql } from "../config/db.config.js";
import fs from "fs";
import path from "path";

export const getDishes = async (req, res) => {
  try {
    const dishes = await sql`
      SELECT id, name, category, image, price
      FROM dishes
    `;
    res.status(200).json(dishes);
  } catch (error) {
    console.error("Get dishes error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while retrieving dish data",
    });
  }
};

export const addDish = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ error: "Image not found" });
    }

    await sql`INSERT INTO dishes (name, category, image, price  ) VALUES (${name}, ${category}, ${image.filename}, ${price})`;
    res.status(201).json({ message: "Dish added successfully" });
  } catch (error) {
    console.error("Add dish error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while adding dish",
    });
  }
};

export const deleteDish = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql`SELECT image FROM dishes WHERE id = ${id}`;
    const dish = result[0];

    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    const imagePath = path.join("src/uploads/images", dish.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      }
    });
    await sql`DELETE FROM dishes WHERE id = ${id}`;
    res.status(200).json({ message: "Dish deleted successfully" });
  } catch (error) {
    console.error("Delete dish error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while deleting dish",
    });
  }
};

export const updateDish = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price } = req.body;
    const image = req.file;

    const [dish] = await sql`SELECT id, image FROM dishes WHERE id = ${id}`;
    if (!dish) {
      if (image) {
        fs.unlink(path.join("src/uploads/images", image.filename), () => {});
      }
      return res.status(404).json({ error: "Dish not found" });
    }

    const [existingDish] =
      await sql`SELECT id FROM dishes WHERE name = ${name} AND id != ${id}`;
    if (existingDish) {
      // Hapus file kalau nama sudah dipakai
      if (image) {
        fs.unlink(path.join("src/uploads/images", image.filename), () => {});
      }
      return res
        .status(409)
        .json({ error: "Dish with the same name already exists" });
    }

    // Kalau image baru ada, hapus image lama
    if (image) {
      if (dish.image) {
        fs.unlink(path.join("src/uploads/images", dish.image), () => {});
      }
      await sql`
        UPDATE dishes 
        SET name = ${name}, category = ${category}, image = ${image.filename}, price = ${price}
        WHERE id = ${id}`;
    } else {
      await sql`
        UPDATE dishes 
        SET name = ${name}, category = ${category}, price = ${price}
        WHERE id = ${id}`;
    }

    res.status(200).json({ message: "Dish updated successfully" });
  } catch (error) {
    console.error("Update dish error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while updating dish",
    });
  }
};
