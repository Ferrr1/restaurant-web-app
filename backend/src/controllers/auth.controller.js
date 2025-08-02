import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { sql } from "../config/db.config.js";
import jwt from "jsonwebtoken";
import { emailRegex, passwordRegex } from "../utils/validate.js";

export async function register(req, res) {
  try {
    const { first_name, last_name, email, password, confirm_password, role } =
      req.body;
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !confirm_password ||
      !role
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email tidak valid" });
    }
    const userExists = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (userExists.length > 0) {
      console.log("User already exists", userExists);
      return res.status(400).json({ error: "User already exists" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: "Password tidak valid" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await sql`
      INSERT INTO users (first_name, last_name, email, password, role) 
      VALUES (${first_name}, ${last_name}, ${email}, ${hashedPassword}, ${role}) 
      RETURNING *
    `;

    res.status(201).json({
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

    if (!email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = result[0];

    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000, // Jika remember, 30 hari, jika tidak, 2 jam
    });

    res.status(200).json({
      message: "Login berhasil",
      user: {
        token,
        ...user,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getUserData(req, res) {
  try {
    const { id } = req.user;
    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    const user = result[0];
    res.status(200).json({ user });
  } catch (error) {
    console.error("Get user data error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// export async function rememberLogin(req, res) {
//   try {
//     const { token } = req.cookies;
//     if (!token) return res.status(401).json({ error: "Tidak ada token" });

//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     const result = await sql`SELECT * FROM users WHERE id = ${payload.id}`;
//     const user = result[0];
//     if (!user) return res.status(401).json({ error: "User tidak ditemukan" });

//     res.status(200).json({
//       message: "Auto login berhasil",
//       user: {
//         id: user.id,
//         email: user.email,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Remember login error:", error);
//     res.status(401).json({ error: "Token tidak valid" });
//   }
// }

export async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout berhasil" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
