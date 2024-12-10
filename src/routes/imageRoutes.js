import express from "express";
import { tryCatch } from "../config/trycatch.js";
import {
  getCommentByImageId,
  getImageInfoById,
  getImagesSearchPagination,
  checkSaveImageByImageId,
  createComment,
  deleteImageById,
  createImageByUserId,
} from "../controllers/imageController.js";
import { middlewareToken } from "../config/jwt.js";
import { middlewareUpload, upload } from "../config/upload.js";

const imageRoutes = express.Router();

imageRoutes.get(
  "/lay-danh-sach-hinh-anh-tim-kiem-phan-trang",
  tryCatch(getImagesSearchPagination)
);
imageRoutes.get("/lay-thong-tin-hinh-anh/:id", tryCatch(getImageInfoById));
imageRoutes.get("/lay-danh-sach-binh-luan/:id", tryCatch(getCommentByImageId));
imageRoutes.get(
  "/kiem-tra-luu-hinh-anh",
  middlewareToken,
  tryCatch(checkSaveImageByImageId)
);
imageRoutes.post("/them-binh-luan", middlewareToken, tryCatch(createComment));
imageRoutes.delete(
  "/xoa-anh-theo-id/:id",
  middlewareToken,
  tryCatch(deleteImageById)
);
imageRoutes.post(
  "/them-anh-theo-id-nguoi-dung",
  middlewareToken,
  middlewareUpload,
  tryCatch(createImageByUserId)
);

export default imageRoutes;
