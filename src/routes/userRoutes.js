import express from "express";
import { middlewareToken } from "../config/jwt.js";
import { tryCatch } from "../config/tryCatch.js";
import {
  getImagesByUserId,
  getImagesSaveByUserId,
  getUser,
  updateUserById,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get(
  "/lay-thong-tin-nguoi-dung/:id",
  middlewareToken,
  tryCatch(getUser)
);
userRoutes.get(
  "/lay-danh-sach-anh-da-luu-theo-nguoi-dung-id/:id",
  middlewareToken,
  tryCatch(getImagesSaveByUserId)
);
userRoutes.get(
  "/lay-danh-sach-hinh-anh-theo-nguoi-dung-id/:id",
  middlewareToken,
  tryCatch(getImagesByUserId)
);
userRoutes.put(
  "/sua-thong-tin-nguoi-dung/:id",
  middlewareToken,
  tryCatch(updateUserById)
);

export default userRoutes;
