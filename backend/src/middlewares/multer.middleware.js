import multer from "multer";
import path from "path";

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "src/uploads/images/others";
    if (req.originalUrl.includes("/categories")) {
      folder = "src/uploads/images/category";
    } else if (req.originalUrl.includes("/dishes")) {
      folder = "src/uploads/images/dishes";
    }

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 1.5 * 1024 * 1024 }, // max 1.5MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/png", "image/webp"];
    // const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Only PNG and WEBP image files are allowed!`), false);
    }
  },
});
