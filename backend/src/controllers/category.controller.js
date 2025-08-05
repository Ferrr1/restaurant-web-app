import { sql } from "../config/db.config.js";
import fs from "fs";
import path from "path";

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file;
    if (!name) return res.status(400).json({ error: "Name must be provided" });
    if (!image) return res.status(400).json({ error: "Image not found" });
    const [existingCategory] =
      await sql`SELECT name FROM categories WHERE name = ${name}`;
    if (existingCategory) {
      deleteUploadedCategoriesImage(image);
      return res
        .status(409)
        .json({ error: "Category with the same name already exists" });
    }

    try {
      await sql`INSERT INTO categories (name, image) VALUES (${name}, ${image.filename})`;
    } catch (error) {
      fs.unlink(
        path.join("src/uploads/images/category", image.filename),
        (err) => {
          console.log(err);
        }
      );
      throw error;
    }

    res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.error("Add category error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while adding category",
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const image = req.file;
    if (!name) return res.status(400).json({ error: "Name must be provided" });

    const category =
      await sql`SELECT id, image FROM categories WHERE id = ${id}`;
    if (!category) {
      deleteUploadedCategoriesImage(image);
      return res.status(404).json({ error: "Category not found" });
    }
    const [existingCategory] =
      await sql`SELECT id FROM categories WHERE name = ${name} AND id != ${id}`;
    if (existingCategory) {
      deleteUploadedCategoriesImage(image);
      return res
        .status(409)
        .json({ error: "Category with the same name already exists" });
    }
    if (image) {
      if (category.image) {
        fs.unlink(
          path.join("src/uploads/images/category", category.image),
          (err) => {
            console.log(err);
          }
        );
      }
      await sql`UPDATE categories SET name = ${name}, image = ${image.fileName} WHERE id = ${id}`;
    } else {
      await sql`UPDATE categories SET name = ${name} WHERE id = ${id}`;
    }
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Update category error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while updating category",
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql`SELECT image FROM categories WHERE id = ${id}`;
    const category = result[0];
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const imagePath = path.join("src/uploads/images/category", category.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      }
    });
    await sql`DELETE FROM categories WHERE id = ${id}`;
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while deleting category",
    });
  }
};
export const getCategories = async (req, res) => {
  try {
    const categories = await sql`SELECT * FROM categories ORDER BY name ASC`;
    res.status(200).json(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "An error occurred while getting categories",
    });
  }
};

const deleteUploadedCategoriesImage = (image) => {
  if (image) {
    fs.unlink(
      path.join("src/uploads/images/category", image.filename),
      (err) => {
        console.log(err);
      }
    );
  }
};
