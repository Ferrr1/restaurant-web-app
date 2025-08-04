import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./src/config/db.config.js";
import authRoute from "./src/routes/auth.routes.js";
import categoriesRoute from "./src/routes/category.route.js";
import dishRoute from "./src/routes/dishes.route.js";
import { config } from "./src/config/config.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/api", (req, res) => res.send("This is Api Restaurant Website"));
app.use("/api/auth", authRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/dishes", dishRoute);
// Akses gambar dish: /uploads/dishes/image-name.png
app.use("/uploads/dishes", express.static("src/uploads/images/dishes"));

// Akses gambar kategori: /uploads/categories/image-name.png
app.use("/uploads/categories", express.static("src/uploads/images/category"));

initDB().then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
});
