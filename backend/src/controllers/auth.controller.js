import bcrypt from "bcryptjs";
import { sql } from "../config/db.config.js";
import {
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "../services/email.service.js";
import { createLog } from "../services/logs.service.js";
import {
  generateAccessToken,
  generateEmailToken,
  generateRefreshToken,
  generateResetToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

// Register dengan email verification
export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, confirm_password, role } =
      req.body;

    // Validasi input
    if (!first_name || !last_name || !email || !password || !confirm_password) {
      return res.status(400).json({ error: "Semua field harus diisi" });
    }
    const roleDefault = role ? role : "cashier";

    if (password !== confirm_password) {
      return res.status(400).json({ error: "Password tidak cocok" });
    }

    // Cek user exists
    const userExists = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (userExists.length > 0) {
      return res.status(409).json({ error: "Email sudah terdaftar" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat user dengan status unverified
    const [user] = await sql`
      INSERT INTO users (first_name, last_name, email, password, role, is_verified) 
      VALUES (${first_name}, ${last_name}, ${email}, ${hashedPassword}, ${roleDefault}, false) 
      RETURNING id, first_name, last_name, email, role, is_verified, created_at
    `;

    // Generate email verification token
    const emailToken = generateEmailToken({ id: user.id, email: user.email });

    if (!emailToken) {
      throw new Error("Failed to generate email token");
    }

    // Kirim email verifikasi
    await sendVerificationEmail(user.email, emailToken);

    // Log aktivitas
    await createLog(user.id, "REGISTER", req.ip, req.headers["user-agent"]);

    res.status(201).json({
      message: "Registrasi berhasil. Silakan cek email untuk verifikasi.",
      user,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "Terjadi kesalahan saat registrasi",
    });
  }
};

// Login dengan access dan refresh token
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email dan password harus diisi" });
    }

    const [user] = await sql`
      SELECT id, first_name, last_name, email, role, password, is_verified 
      FROM users WHERE email = ${email}
    `;

    if (!user) {
      return res.status(401).json({ error: "Email atau password salah" });
    }

    if (!user.is_verified) {
      return res
        .status(403)
        .json({ error: "Akun belum diverifikasi. Silakan cek email Anda." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email atau password salah" });
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    if (!accessToken) {
      throw new Error("Failed to generate access token");
    }

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    if (!refreshToken) {
      throw new Error("Failed to generate refresh token");
    }

    // Simpan refresh token ke database
    await sql`
      INSERT INTO tokens (user_id, token, expires_at, type) 
      VALUES (${user.id}, ${refreshToken}, NOW() + INTERVAL '7 days', 'refresh')
    `;

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 menit
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });

    // Log aktivitas
    await createLog(user.id, "LOGIN", req.ip, req.headers["user-agent"]);

    res.status(200).json({
      message: "Login berhasil",
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "Terjadi kesalahan saat login",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user =
      await sql`SELECT id, first_name, last_name, email, role FROM users WHERE id = ${req.user.id}`;
    res.status(200).json(user[0]);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "Terjadi kesalahan saat mengambil data pengguna",
    });
  }
};

// Refresh token endpoint
export const refreshToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies?.refreshToken ||
      req.body.refreshToken ||
      req.headers["authorization"]?.split(" ")[1];

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token tidak tersedia" });
    }

    // Verifikasi refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Cek di database
    const [token] = await sql`
      SELECT * FROM tokens 
      WHERE token = ${refreshToken} AND type = 'refresh' AND expires_at > NOW()
    `;

    if (!token) {
      return res.status(403).json({ error: "Refresh token tidak valid" });
    }

    // Dapatkan user data
    const [user] = await sql`
      SELECT id, email, role FROM users WHERE id = ${decoded.id}
    `;

    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    // Generate access token baru
    const newAccessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Set cookie baru
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 menit
    });

    res.status(200).json({
      message: "Token diperbarui",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh token error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Refresh token kadaluarsa" });
    }

    res.status(500).json({
      error: "Server Error",
      message: "Terjadi kesalahan saat memperbarui token",
    });
  }
};

// Verify email endpoint
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Verifikasi token
    const decoded = verifyAccessToken(token);

    // Update user menjadi verified
    await sql`
      UPDATE users 
      SET is_verified = true 
      WHERE id = ${decoded.id} AND email = ${decoded.email}
    `;

    // Hapus token verifikasi jika ada
    await sql`
      DELETE FROM tokens 
      WHERE user_id = ${decoded.id} AND type = 'email_verification'
    `;

    res.status(200).json({
      message: "Email berhasil diverifikasi. Silakan login.",
    });
  } catch (error) {
    console.error("Email verification error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ error: "Token verifikasi kadaluarsa" });
    }

    res.status(500).json({
      error: "Server Error",
      message: "Terjadi kesalahan saat verifikasi email",
    });
  }
};

// Request password reset
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email harus diisi" });
    }

    const [user] =
      await sql`SELECT id, email FROM users WHERE email = ${email}`;

    if (user) {
      // Generate reset token
      const resetToken = generateResetToken({ id: user.id, email: user.email });

      // Simpan token ke database
      await sql`
        INSERT INTO tokens (user_id, token, expires_at, type)
        VALUES (${user.id}, ${resetToken}, NOW() + INTERVAL '1 hour', 'password_reset')
      `;

      // Kirim email reset password
      await sendResetPasswordEmail(user.email, resetToken);
    }

    // Selalu return success meskipun email tidak ditemukan (security measure)
    res.status(200).json({
      message:
        "Jika email terdaftar, kami telah mengirim instruksi reset password",
    });
  } catch (error) {
    console.error("Request password reset error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "Terjadi kesalahan saat memproses permintaan reset password",
    });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirm_password } = req.body;

    if (!password || !confirm_password) {
      return res
        .status(400)
        .json({ error: "Password dan konfirmasi password harus diisi" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ error: "Password tidak cocok" });
    }

    // Verifikasi token
    const decoded = verifyAccessToken(token);

    // Cek token di database
    const [resetToken] = await sql`
      SELECT * FROM tokens 
      WHERE token = ${token} AND type = 'password_reset' AND expires_at > NOW()
    `;

    if (!resetToken) {
      return res
        .status(400)
        .json({ error: "Token reset password tidak valid atau kadaluarsa" });
    }

    // Hash password baru
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password user
    await sql`
      UPDATE users 
      SET password = ${hashedPassword} 
      WHERE id = ${decoded.id}
    `;

    // Hapus token reset
    await sql`DELETE FROM tokens WHERE token = ${token}`;

    // Log aktivitas
    await createLog(
      decoded.id,
      "PASSWORD_RESET",
      req.ip,
      req.headers["user-agent"]
    );

    res.status(200).json({
      message: "Password berhasil direset. Silakan login dengan password baru.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ error: "Token reset password kadaluarsa" });
    }

    res.status(500).json({
      error: "Server Error",
      message: "Terjadi kesalahan saat reset password",
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    // Hapus refresh token dari database
    if (refreshToken) {
      await sql`DELETE FROM tokens WHERE token = ${refreshToken} AND type = 'refresh'`;
    }

    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    // Log aktivitas
    if (req.user?.id) {
      await createLog(req.user.id, "LOGOUT", req.ip, req.headers["user-agent"]);
    }

    res.status(200).json({
      message: "Logout berhasil",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      error: "Server Error",
      message: "Terjadi kesalahan saat logout",
    });
  }
};
