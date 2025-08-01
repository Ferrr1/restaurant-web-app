import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { sql } from "../config/db.config.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { first_name, last_name, email, password, confirm_password, role } =
      req.body;

    if (password !== confirm_password) {
      return res.status(400).json({ error: "Password tidak cocok" });
    }
    if (!role) {
      return res.status(400).json({ error: "Role tidak tersedia" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await sql`
      INSERT INTO users (first_name, last_name, email, password, role) 
      VALUES (${first_name}, ${last_name}, ${email}, ${hashedPassword}, ${role}) 
      RETURNING *
    `;

    res.json({
      message: "Registrasi berhasil",
      user: result[0],
    });
  } catch (error) {
    console.log("Error Registering", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password, remember } = req.body;

    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = result[0];

    if (!user)
      return res.status(401).json({ error: "Email atau password salah" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Email atau password salah" });

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000, // Jika remember, 30 hari, jika tidak, 2 jam
    });

    res.json({
      message: "Login berhasil",
      user: {
        token,
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function rememberLogin(req, res) {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ error: "Tidak ada token" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const result = await sql`SELECT * FROM users WHERE id = ${payload.id}`;
    const user = result[0];
    if (!user) return res.status(401).json({ error: "User tidak ditemukan" });

    res.json({
      message: "Auto login berhasil",
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Remember login error:", error);
    res.status(401).json({ error: "Token tidak valid" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout berhasil" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
