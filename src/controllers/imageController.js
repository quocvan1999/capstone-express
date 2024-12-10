import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

// /lay-danh-sach-hinh-anh-tim-kiem-phan-trang
export const getImagesSearchPagination = async (req, res) => {
  const { page = 1, limit = 10, search } = req.body;

  const data = await prisma.hinh_anh.findMany({
    where: {
      OR: [
        {
          ten_hinh: {
            contains: search,
          },
        },
      ],
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: {
      ten_hinh: "desc",
    },
  });

  const totalData = await prisma.hinh_anh.count({
    where: {
      OR: [
        {
          ten_hinh: {
            contains: search,
          },
        },
      ],
    },
  });

  return res.status(200).json({
    message: "Lấy danh sách hình ảnh thành công",
    content: {
      data: data,
      page: page,
      limit,
      totalItem: totalData,
      search,
    },
    statusCode: 200,
    timestamp: new Date().toISOString(),
  });
};

// /lay-thong-tin-hinh-anh/:id
export const getImageInfoById = async (req, res) => {
  const { id } = req.params;

  const checkImage = await prisma.hinh_anh.findUnique({
    where: {
      hinh_id: Number(id),
    },
    select: {
      hinh_id: true,
      ten_hinh: true,
      duong_dan: true,
      mo_ta: true,
      nguoi_dung: {
        select: {
          nguoi_dung_id: true,
          email: true,
          ho_ten: true,
          tuoi: true,
          anh_dai_dien: true,
        },
      },
    },
  });

  if (!checkImage) {
    return res.status(404).json({
      message: "Hình ảnh không tồn tại",
      statusCode: 404,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(200).json({
    message: "Lấy thông tin hình ảnh thành công",
    content: {
      data: checkImage,
    },
    statusCode: 200,
    timestamp: new Date().toISOString(),
  });
};

// /lay-danh-sach-binh-luan/:id
export const getCommentByImageId = async (req, res) => {
  const { id } = req.params;

  const checkComment = await prisma.hinh_anh.findMany({
    where: { hinh_id: Number(id) },
    select: {
      binh_luan: {
        select: {
          binh_luan_id: true,
          ngay_binh_luan: true,
          noi_dung: true,
          nguoi_dung_id: true,
          hinh_id: true,
        },
      },
    },
  });

  if (!checkComment) {
    return res.status(404).json({
      message: "Lấy bình luận hình ảnh không thành công",
      statusCode: 404,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(200).json({
    message: "Lấy bình luận hình ảnh thành công",
    content: {
      data: checkComment,
    },
    statusCode: 200,
    timestamp: new Date().toISOString(),
  });
};

// /kiem-tra-luu-hinh-anh
export const checkSaveImageByImageId = async (req, res) => {
  const { hinh_id, nguoi_dung_id } = req.body;

  const checkSaveImage = await prisma.luu_anh.findUnique({
    where: {
      nguoi_dung_id_hinh_id: {
        hinh_id: Number(hinh_id),
        nguoi_dung_id: Number(nguoi_dung_id),
      },
    },
  });

  if (!checkSaveImage) {
    return res.status(404).json({
      message: "Hình ảnh chưa được lưu",
      statusCode: 404,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(200).json({
    message: "Hình ảnh đã được lưu",
    statusCode: 200,
    timestamp: new Date().toISOString(),
  });
};

// /them-binh-luan
export const createComment = async (req, res) => {
  const { nguoi_dung_id, hinh_id, noi_dung, ngay_binh_luan } = req.body;

  const create = await prisma.binh_luan.create({
    data: {
      nguoi_dung_id,
      hinh_id,
      noi_dung,
      ngay_binh_luan,
    },
  });

  if (!create) {
    return res.status(400).json({
      message: "Thêm bình luận không thành công",
      statusCode: 400,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(201).json({
    message: "Thêm bình luận thành công",
    statusCode: 201,
    timestamp: new Date().toISOString(),
  });
};

// /xoa-anh-theo-id/:id
export const deleteImageById = async (req, res) => {
  const { id } = req.params;

  const checkImage = await prisma.hinh_anh.findUnique({
    where: {
      hinh_id: Number(id),
    },
  });

  if (!checkImage) {
    return res.status(404).json({
      message: "Hình ảnh không tồn tại",
      statusCode: 404,
      timestamp: new Date().toISOString(),
    });
  }

  const deleteImage = await prisma.hinh_anh.delete({
    where: {
      hinh_id: checkImage.hinh_id,
    },
  });

  if (!deleteImage) {
    return res.status(400).json({
      message: "Xoá hình ảnh không thành công",
      statusCode: 400,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(200).json({
    message: "Xoá hình ảnh thành công",
    statusCode: 200,
    timestamp: new Date().toISOString(),
  });
};

// /them-anh-theo-id-nguoi-dung
export const createImageByUserId = async (req, res) => {
  const { ten_hinh, duong_dan, mo_ta, nguoi_dung_id } = req.body;

  const checkUser = await prisma.nguoi_dung.findUnique({
    where: {
      nguoi_dung_id: Number(nguoi_dung_id),
    },
  });

  if (!checkUser) {
    return res.status(404).json({
      message: "Người dùng không tồn tại",
      statusCode: 404,
      timestamp: new Date().toISOString(),
    });
  }

  const createImage = await prisma.hinh_anh.create({
    data: {
      ten_hinh,
      duong_dan,
      mo_ta,
      nguoi_dung_id,
    },
  });

  if (!createImage) {
    return res.status(400).json({
      message: "Thêm hình ảnh không thành công",
      statusCode: 400,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(201).json({
    message: "Thêm hình ảnh thành công",
    statusCode: 201,
    timestamp: new Date().toISOString(),
  });
};
