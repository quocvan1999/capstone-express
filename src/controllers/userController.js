import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

// /lay-thong-tin-nguoi-dung/:id
export const getUser = async (req, res) => {
  const { id } = req.params;

  const checkUser = await prisma.nguoi_dung.findUnique({
    where: {
      nguoi_dung_id: Number(id),
    },
    select: {
      nguoi_dung_id: true,
      email: true,
      ho_ten: true,
      tuoi: true,
      anh_dai_dien: true,
    },
  });

  if (!checkUser) {
    return res.status(404).json({
      message: "Không tìm thấy người dùng",
      statusCode: 404,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(200).json({
    message: "Lấy thông tin người dùng thành công",
    content: {
      data: checkUser,
    },
    statusCode: 200,
    timestamp: new Date().toISOString(),
  });
};

// /lay-danh-sach-anh-da-luu-theo-nguoi-dung-id/:id
export const getImagesSaveByUserId = async (req, res) => {
  const { id } = req.params;

  const checkUser = await prisma.nguoi_dung.findUnique({
    where: { nguoi_dung_id: Number(id) },
  });

  if (!checkUser) {
    return res.status(404).json({
      message: "Người dùng không tồn tại",
      statusCode: 404,
      timestamp: new Date().toISOString(),
    });
  }

  const checkImagesSave = await prisma.luu_anh.findMany({
    where: {
      nguoi_dung_id: Number(id),
    },
  });

  if (!checkImagesSave) {
    return res.status(400).json({
      message: "Lấy danh sách lưu hình ảnh không thành công",
      statusCode: 400,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(200).json({
    message: "Lấy danh sách lưu hình ảnh thành công",
    content: {
      data: checkImagesSave,
    },
    statusCode: 200,
    timestamp: new Date().toISOString(),
  });
};

// /lay-danh-sach-hinh-anh-theo-nguoi-dung-id/:id
export const getImagesByUserId = async (req, res) => {
  const { id } = req.params;

  const checkUser = await prisma.nguoi_dung.findUnique({
    where: { nguoi_dung_id: Number(id) },
  });

  if (!checkUser) {
    return res.status(404).json({
      message: "Người dùng không tồn tại",
      statusCode: 404,
      timestamp: new Date().toISOString(),
    });
  }

  const checkImages = await prisma.hinh_anh.findMany({
    where: {
      nguoi_dung_id: Number(id),
    },
  });

  if (!checkImages) {
    return res.status(400).json({
      message: "Lấy danh sách ảnh không thành công",
      statusCode: 400,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(200).json({
    message: "Lấy danh sách hình ảnh thành công",
    content: {
      data: checkImages,
    },
    statusCode: 200,
    timestamp: new Date().toISOString(),
  });
};

// /sua-thong-tin-nguoi-dung/:id
export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { ho_ten, tuoi, anh_dai_dien } = req.body;

  const checkUser = await prisma.nguoi_dung.findUnique({
    where: { nguoi_dung_id: Number(id) },
  });

  if (!checkUser) {
    return res.status(404).json({
      message: "Người dùng không tồn tại",
      statusCode: 404,
      timestamp: new Date().toISOString(),
    });
  }

  const updateUser = await prisma.nguoi_dung.update({
    where: {
      nguoi_dung_id: checkUser.nguoi_dung_id,
    },
    data: { ho_ten, tuoi, anh_dai_dien },
    select: {
      nguoi_dung_id: true,
      email: true,
      ho_ten: true,
      tuoi: true,
      anh_dai_dien: true,
    },
  });

  if (!updateUser) {
    return res.status(400).json({
      message: "Cập nhật người dùng không thành công",
      statusCode: 400,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(200).json({
    message: "Cập nhật người dùng thành công",
    content: {
      data: updateUser,
    },
    statusCode: 200,
    timestamp: new Date().toISOString(),
  });
};
