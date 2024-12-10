import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { createRefToken, createToken } from "../config/jwt.js";

const prisma = new PrismaClient();

// /dang-nhap
export const login = async (req, res) => {
  const { email, mat_khau } = req.body;

  const checkEmail = await prisma.nguoi_dung.findUnique({
    where: { email },
  });

  if (!checkEmail) {
    return res.status(404).json({
      message: "Email không tồn tại",
      statusCode: 404,
      timestamp: new Date().toISOString(),
    });
  }

  const checkPassword = bcrypt.compareSync(mat_khau, checkEmail.mat_khau);

  if (!checkPassword) {
    return res.status(401).json({
      message: "Mật khẩu không chính xác",
      statusCode: 401,
      timestamp: new Date().toISOString(),
    });
  }

  const payload = {
    userId: checkEmail.nguoi_dung_id,
    email: checkEmail.email,
  };
  const accessToken = createToken(payload);
  const refreshToken = createRefToken(payload);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "Đăng nhập thành công",
    statusCode: 200,
    token: accessToken,
    timestamp: new Date().toISOString(),
  });
};

// /dang-ky
export const signup = async (req, res) => {
  const { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;

  const checkEmail = await prisma.nguoi_dung.findUnique({
    where: {
      email,
    },
  });

  if (checkEmail) {
    return res.status(409).json({
      message: "Email đã tồn tại",
      statusCode: 409,
      timestamp: new Date().toISOString(),
    });
  }

  await prisma.nguoi_dung.create({
    data: {
      email,
      mat_khau: bcrypt.hashSync(mat_khau, 10),
      ho_ten,
      tuoi,
      anh_dai_dien,
    },
  });

  return res.status(201).json({
    message: "Tạo tài khoản thành công",
    statusCode: 201,
    timestamp: new Date().toISOString(),
  });
};
