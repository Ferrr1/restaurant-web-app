import { verifyToken } from "../utils/jwt.js";

// Middleware autentikasi
export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token tidak tersedia" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ error: "Token tidak valid" });
  }

  req.user = decoded;
  next();
};

// Middleware otorisasi berdasarkan role
export const authorize = (roles) => {
  return (req, res, next) => {
    console.log("role", roles, req.user.role);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Akses ditolak" });
    }
    next();
  };
};
