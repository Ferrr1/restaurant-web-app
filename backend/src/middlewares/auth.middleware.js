import { verifyToken } from "../utils/jwt.js";

// Middleware autentikasi
export const authenticate = (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // Coba ambil dari header Authorization jika tidak ada di cookies
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ error: "Token tidak tersedia" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(403).json({ error: "Token tidak valid" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(403).json({ error: "Token tidak valid" });
  }
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
