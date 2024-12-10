CREATE TABLE nguoi_dung (
    nguoi_dung_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    mat_khau VARCHAR(255) NOT NULL,
    ho_ten VARCHAR(255),
    tuoi INT,
    anh_dai_dien VARCHAR(255)
);

CREATE TABLE hinh_anh (
    hinh_id INT PRIMARY KEY AUTO_INCREMENT,
    ten_hinh VARCHAR(255),
    duong_dan VARCHAR(255) NOT NULL,
    mo_ta TEXT,
    nguoi_dung_id INT,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE SET NULL
);

CREATE TABLE binh_luan (
    binh_luan_id INT PRIMARY KEY AUTO_INCREMENT,
    nguoi_dung_id INT,
    hinh_id INT,
    ngay_binh_luan DATE,
    noi_dung TEXT,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE CASCADE,
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id) ON DELETE CASCADE
);

CREATE TABLE luu_anh (
    nguoi_dung_id INT,
    hinh_id INT,
    ngay_luu DATE,
    PRIMARY KEY (nguoi_dung_id, hinh_id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE CASCADE,
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id) ON DELETE CASCADE
);

-- Thêm dữ liệu vào bảng `nguoi_dung` pass: 123
INSERT INTO nguoi_dung (email, mat_khau, ho_ten, tuoi, anh_dai_dien)
VALUES 
('user1@example.com', '$2b$10$anU4O/Nfu1v7GMbEbzbXg.NZ5xYZBwydRMy7V.WC7vRaU88ehREcm', 'Nguyen Van A', 25, 'avatar1.png'),
('user2@example.com', '$2b$10$anU4O/Nfu1v7GMbEbzbXg.NZ5xYZBwydRMy7V.WC7vRaU88ehREcm', 'Tran Thi B', 30, 'avatar2.png'),
('user3@example.com', '$2b$10$anU4O/Nfu1v7GMbEbzbXg.NZ5xYZBwydRMy7V.WC7vRaU88ehREcm', 'Le Van C', 28, 'avatar3.png'),
('user4@example.com', '$2b$10$anU4O/Nfu1v7GMbEbzbXg.NZ5xYZBwydRMy7V.WC7vRaU88ehREcm', 'Pham Van D', 35, 'avatar4.png'),
('user5@example.com', '$2b$10$anU4O/Nfu1v7GMbEbzbXg.NZ5xYZBwydRMy7V.WC7vRaU88ehREcm', 'Hoang Thi E', 22, 'avatar5.png'),
('user6@example.com', '$2b$10$anU4O/Nfu1v7GMbEbzbXg.NZ5xYZBwydRMy7V.WC7vRaU88ehREcm', 'Dang Van F', 27, 'avatar6.png'),
('user7@example.com', '$2b$10$anU4O/Nfu1v7GMbEbzbXg.NZ5xYZBwydRMy7V.WC7vRaU88ehREcm', 'Nguyen Thi G', 29, 'avatar7.png'),
('user8@example.com', '$2b$10$anU4O/Nfu1v7GMbEbzbXg.NZ5xYZBwydRMy7V.WC7vRaU88ehREcm', 'Le Van H', 31, 'avatar8.png'),
('user9@example.com', '$2b$10$anU4O/Nfu1v7GMbEbzbXg.NZ5xYZBwydRMy7V.WC7vRaU88ehREcm', 'Pham Thi I', 26, 'avatar9.png'),
('user10@example.com', '$2b$10$anU4O/Nfu1v7GMbEbzbXg.NZ5xYZBwydRMy7V.WC7vRaU88ehREcm', 'Tran Van J', 34, 'avatar10.png');


-- Thêm dữ liệu vào bảng `hinh_anh`
INSERT INTO hinh_anh (ten_hinh, duong_dan, mo_ta, nguoi_dung_id)
VALUES
('Hình 1', '/images/hinh1.jpg', 'Mô tả hình 1', 1),
('Hình 2', '/images/hinh2.jpg', 'Mô tả hình 2', 2),
('Hình 3', '/images/hinh3.jpg', 'Mô tả hình 3', 3),
('Hình 4', '/images/hinh4.jpg', 'Mô tả hình 4', 4),
('Hình 5', '/images/hinh5.jpg', 'Mô tả hình 5', 5),
('Hình 6', '/images/hinh6.jpg', 'Mô tả hình 6', 6),
('Hình 7', '/images/hinh7.jpg', 'Mô tả hình 7', 7),
('Hình 8', '/images/hinh8.jpg', 'Mô tả hình 8', 8),
('Hình 9', '/images/hinh9.jpg', 'Mô tả hình 9', 9),
('Hình 10', '/images/hinh10.jpg', 'Mô tả hình 10', 10);


-- Thêm dữ liệu vào bảng `binh_luan`
INSERT INTO binh_luan (nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung)
VALUES
(1, 1, '2024-11-20', 'Bình luận của user 1 trên hình 1'),
(2, 1, '2024-11-21', 'Bình luận của user 2 trên hình 1'),
(3, 2, '2024-11-22', 'Bình luận của user 3 trên hình 2'),
(4, 3, '2024-11-23', 'Bình luận của user 4 trên hình 3'),
(5, 4, '2024-11-24', 'Bình luận của user 5 trên hình 4'),
(6, 5, '2024-11-25', 'Bình luận của user 6 trên hình 5'),
(7, 6, '2024-11-26', 'Bình luận của user 7 trên hình 6'),
(8, 7, '2024-11-27', 'Bình luận của user 8 trên hình 7'),
(9, 8, '2024-11-28', 'Bình luận của user 9 trên hình 8'),
(10, 9, '2024-11-29', 'Bình luận của user 10 trên hình 9');


-- Thêm dữ liệu vào bảng `luu_anh`
INSERT INTO luu_anh (nguoi_dung_id, hinh_id, ngay_luu)
VALUES
(1, 1, '2024-11-20'),
(2, 2, '2024-11-21'),
(3, 3, '2024-11-22'),
(4, 4, '2024-11-23'),
(5, 5, '2024-11-24'),
(6, 6, '2024-11-25'),
(7, 7, '2024-11-26'),
(8, 8, '2024-11-27'),
(9, 9, '2024-11-28'),
(10, 10, '2024-11-29');


