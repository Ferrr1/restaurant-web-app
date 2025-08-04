import rateLimit from "express-rate-limit";

// Rate limiting untuk proteksi brute force
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 20, // Maksimal 20 request per windowMs
  message: "Terlalu banyak percobaan, silakan coba lagi setelah 15 menit",
});
