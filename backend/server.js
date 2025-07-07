import express from "express";
import dotenv from "dotenv";
import { initDB } from "./src/config/db.js";
// import rateLimiter from "./src/middleware/rateLimiter.js";
// import transactionsRoute from "./src/routes/transactions.route.js";
// import job from "./src/config/cron.js";

dotenv.config();
const app = express();

// job.start();
// Middleware
app.use(express.json());
// app.use(rateLimiter);
const PORT = process.env.PORT || 5001;

app.get("/api", (req, res) => res.send("This is Api for Cashier Website"));

// app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
