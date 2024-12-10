import express from "express";
import authRoutes from "./authRoutes.js";
import imageRoutes from "./imageRoutes.js";
import userRoutes from "./userRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/image", imageRoutes);
rootRoutes.use("/user", userRoutes);

export default rootRoutes;
