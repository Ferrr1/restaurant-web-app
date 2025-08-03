import { verifyAccessToken, verifyRefreshToken } from "../utils/jwt.js";
import { sql } from "../config/db.config.js";
import { createLog } from "../services/logs.service.js";

// Middleware autentikasi dengan access token
export const authenticate = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        error: "Akses ditolak",
        message: "Token autentikasi tidak tersedia",
      });
    }

    // Verifikasi access token
    const decoded = verifyAccessToken(accessToken);

    // Cek user di database
    const [user] = await sql`SELECT id FROM users WHERE id = ${decoded.id}`;
    if (!user) {
      return res.status(401).json({
        error: "Akses ditolak",
        message: "User tidak ditemukan",
      });
    }

    // Tambahkan user ke request
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Sesi berakhir",
        message: "Token telah kadaluarsa, silakan refresh token",
      });
    }

    console.error("Auth error:", error.message);
    return res.status(401).json({
      error: "Error autentikasi",
      message: "Token tidak valid",
    });
  }
};

// Middleware untuk mengecek token refresh
export const checkRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        error: "Akses ditolak",
        message: "Refresh token tidak tersedia",
      });
    }

    // Verifikasi refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Cek di database
    const [token] = await sql`
      SELECT * FROM tokens 
      WHERE token = ${refreshToken} AND type = 'refresh' AND expires_at > NOW()
    `;

    if (!token) {
      return res.status(403).json({
        error: "Akses ditolak",
        message: "Refresh token tidak valid",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Sesi berakhir",
        message: "Refresh token kadaluarsa, silakan login kembali",
      });
    }

    console.error("Refresh token error:", error.message);
    return res.status(401).json({
      error: "Error autentikasi",
      message: "Refresh token tidak valid",
    });
  }
};

// Middleware otorisasi berdasarkan role
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      // Log unauthorized access attempt
      createLog(
        req.user.id,
        "UNAUTHORIZED_ACCESS",
        req.ip,
        req.headers["user-agent"],
        {
          attemptedRoute: req.originalUrl,
          requiredRoles: roles,
        }
      );

      return res.status(403).json({
        error: "Akses ditolak",
        message: "Anda tidak memiliki izin untuk mengakses resource ini",
      });
    }
    next();
  };
};
