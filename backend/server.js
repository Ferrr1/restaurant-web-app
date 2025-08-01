import express from "express";
import dotenv from "dotenv";
import { initDB } from "./src/config/db.config.js";
import authRoute from "./src/routes/auth.routes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
const PORT = process.env.PORT || 5001;

app.get("/api", (req, res) => res.send("This is Api Restaurant Website"));
app.use("/api/auth", authRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
