-- ==========================================================
-- Oqat — Test uchun Toshkent ma'lumotlari (Seed Data)
-- ==========================================================

-- Kategoriyalar
INSERT INTO categories (id, name, icon) VALUES
(1, 'Milliy taomlar', 'fa-solid fa-bowl-rice'),
(2, 'Fast-food', 'fa-solid fa-burger'),
(3, 'Qahva & Desert', 'fa-solid fa-mug-hot'),
(4, 'Turk taomlari', 'fa-solid fa-drumstick-bite')
ON CONFLICT (id) DO NOTHING;

-- Toshkentdagi mashhur restoranlar (Real koordinatalar bilan)
INSERT INTO restaurants (id, name, category_id, lat, lng, address, phone, rating, photo) VALUES
(1, 'Rayhon Milliy Taomlar', 1, 41.326500, 69.228500, 'Beruniy shoh ko''chasi, 2', '+998 71 200 88 88', 4.7, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600'),
(2, 'EVOS Fast Food', 2, 41.311500, 69.280100, 'Amir Temur shoh ko''chasi, 24', '+998 71 203 12 12', 4.6, 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600'),
(3, 'Oqtepa Lavash (Chilonzor)', 2, 41.284200, 69.208100, 'Chilonzor, Bunyodkor ko''chasi', '+998 78 150 00 30', 4.5, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600'),
(4, 'Safia Cafe & Bakery', 3, 41.314800, 69.283400, 'Shahrisabz ko''chasi, 31', '+998 71 205 55 55', 4.8, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600'),
(5, 'Besh Qozon (Osh Markazi)', 1, 41.347300, 69.285800, 'Iftixor ko''chasi, 1 (Teleminora)', '+998 71 200 00 00', 4.9, 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600'),
(6, 'Wendy''s Uzbekistan', 2, 41.311900, 69.278900, 'Sayilgoh ko''chasi (Broadway)', '+998 78 147 00 00', 4.4, 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600')
ON CONFLICT (id) DO NOTHING;

-- Taomlar menyusi
INSERT INTO menu_items (restaurant_id, name, price, description, photo) VALUES
(1, 'Toshkent To''y Oshi', 36000, 'Devzira guruch, barra mol go''shti, no''xat, mayiz va bedana tuxumi', 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=300'),
(1, 'Qovurma Lag''mon', 38000, 'Qo''lda cho''zilgan xamir, sarhil go''sht va sabzavotlar', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300'),
(2, 'Lavash Standart (Mol go''shti)', 32000, 'Shirali go''sht, bodring, pomidor, chips va original sous', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300'),
(2, 'Pishloqli Shaurma', 29000, 'Pechda pishirilgan tovuq go''shti, Golland pishlog''i', 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300'),
(3, 'Lavash Chizburgerli', 36000, 'Mol go''shti, erigan pishloq, bodring va sous', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300'),
(4, 'San Sebastian Cheesecake', 38000, 'Krem-pishloqli pirog, issiq shokolad sousi bilan', 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300'),
(4, 'Cappuccino (350ml)', 24000, 'Arabika qahvasi va nozik ko''pirtirilgan sut', 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=300'),
(5, 'Maxsus To''y Oshi', 40000, 'Qazi va bedana tuxumi qo''shilgan to''y oshi', 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=300'),
(6, 'Baconator Burger', 46000, 'Ikki qavatli go''sht kotleti va bekon', 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300');
