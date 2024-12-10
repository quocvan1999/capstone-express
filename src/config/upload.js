import multer, { diskStorage } from "multer";
import path from "path";

const fileFilter = (req, file, callback) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const fileExt = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(fileExt)) {
    return callback(
      new Error("File không hợp lệ! Chỉ chấp nhận jpg, jpeg, png.")
    );
  }

  callback(null, true);
};

export const upload = multer({
  storage: diskStorage({
    destination: process.cwd() + "/public/imgs",
    filename: (req, file, callback) => {
      const timestamp = Date.now();
      const newName = `${timestamp}_${file.originalname}`;
      callback(null, newName);
    },
  }),
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

export const middlewareUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "Dung lượng file quá lớn!" });
      }
      if (err.message) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: "Lỗi upload file!" });
    }
    next();
  });
};
