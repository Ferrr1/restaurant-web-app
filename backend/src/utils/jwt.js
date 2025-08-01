import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "18937218djhaudh./.,;adwu8374";

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
    { expiresIn: "1h" }
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
