import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const secretKey = config.TOKEN;
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    },
    secretKey,
    { expiresIn: "1d" }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return err;
  }
};

export { generateToken, verifyToken };
