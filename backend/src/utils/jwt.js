import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const accessTokenSecret = config.JWT_ACCESS_SECRET;
const refreshTokenSecret = config.JWT_REFRESH_SECRET;
const accessTokenExpiry = "15m"; // 15 menit
const refreshTokenExpiry = "7d"; // 7 hari
const emailTokenExpiry = "1d"; // 1 hari
const resetTokenExpiry = "1h"; // 1 jam

const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: accessTokenExpiry,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const generateEmailToken = (payload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: "1d" });
};

const generateResetToken = (payload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: "1h" });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.JWT_REFRESH_SECRET);
};

export {
  accessTokenSecret,
  refreshTokenSecret,
  accessTokenExpiry,
  refreshTokenExpiry,
  emailTokenExpiry,
  resetTokenExpiry,
  generateAccessToken,
  generateRefreshToken,
  generateEmailToken,
  generateResetToken,
  verifyAccessToken,
  verifyRefreshToken,
};
