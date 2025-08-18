import { sql } from "../config/db.config.js";
import fs from "fs";
import path from "path";

export const getDishes = async (req, res) => {
  try {
    const dishes = await sql`
      SELECT d.id AS dishId, d.name AS dishName, c.name AS categoryName, d.image AS dishImage, d.price AS dishPrice
      FROM dishes d
      INNER JOIN categories c ON d.category_id = c.id
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

    if (!name || !category || !price)
      return res
        .status(400)
        .json({ error: "Name, category, and price must be provided" });

    if (!image) {
      return res.status(400).json({ error: "Image not found" });
    }

    const [existingDish] =
      await sql`SELECT name FROM dishes WHERE name = ${name}`;
    if (existingDish) {
      deleteUploadedDishesImage(image);
      return res
        .status(409)
        .json({ error: "Dish with the same name already exists" });
    }

    try {
      await sql`INSERT INTO dishes (name, category_id, image, price) VALUES (${name}, ${category}, ${image.filename}, ${price})`;
    } catch (error) {
      fs.unlink(
        path.join("src/uploads/images/dishes", image.filename),
        (err) => {
          console.log(err);
        }
      );
      throw error;
    }

    res.status(201).json({ message: "Dish added successfully" });
  } catch (error) {
    console.error("Add dish error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while adding dish",
    });
  }
};

export const updateDish = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price } = req.body;
    const image = req.file;

    if (!name || !category || !price)
      return res
        .status(400)
        .json({ error: "Name, category, and price must be provided" });

    const dish = await sql`SELECT id, image FROM dishes WHERE id = ${id}`;
    if (!dish) {
      deleteUploadedDishesImage(image);
      return res.status(404).json({ error: "Dish not found" });
    }

    const [existingDish] =
      await sql`SELECT id FROM dishes WHERE name = ${name} AND id != ${id}`;
    if (existingDish) {
      deleteUploadedDishesImage(image);
      return res
        .status(409)
        .json({ error: "Dish with the same name already exists" });
    }

    // Kalau image baru ada, hapus image lama
    if (image) {
      if (dish.image) {
        fs.unlink(path.join("src/uploads/images/dishes", dish.image), (err) => {
          console.log(err);
        });
      }
      await sql`
        UPDATE dishes 
        SET name = ${name}, category_id = ${category}, image = ${image.filename}, price = ${price}
        WHERE id = ${id}`;
    } else {
      await sql`
        UPDATE dishes 
        SET name = ${name}, category_id = ${category}, price = ${price}
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

export const deleteDish = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql`SELECT image FROM dishes WHERE id = ${id}`;
    const dish = result[0];

    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    const imagePath = path.join("src/uploads/images/dishes", dish.image);
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

const deleteUploadedDishesImage = (image) => {
  if (image) {
    fs.unlink(path.join("src/uploads/images/dishes", image.filename), () => {});
  }
};
