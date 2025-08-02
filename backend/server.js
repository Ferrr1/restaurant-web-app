import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./src/config/db.config.js";
import authRoute from "./src/routes/auth.routes.js";
import { config } from "./src/config/config.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:5173", // atau "*" untuk semua origin
    credentials: true, // penting jika pakai cookie / withCredentials
  })
);

app.get("/api", (req, res) => res.send("This is Api Restaurant Website"));
app.use("/api/auth", authRoute);

initDB().then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
});
