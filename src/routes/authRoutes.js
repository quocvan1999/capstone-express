import express from "express";
import { login, signup } from "../controllers/authController.js";
import { tryCatch } from "../config/trycatch.js";

const authRoutes = express.Router();

authRoutes.post("/dang-nhap", tryCatch(login));
authRoutes.post("/dang-ky", tryCatch(signup));

export default authRoutes;
