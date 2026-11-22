-- ==========================================================
-- Oqat — PostgreSQL Ma'lumotlar bazasi sxemasi (Ulug'bek)
-- ==========================================================

-- 1. Kategoriyalar jadvali
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50) DEFAULT 'utensils'
);

-- 2. Restoranlar jadvali
CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    lat DECIMAL(10, 8) NOT NULL,
    lng DECIMAL(11, 8) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    rating DECIMAL(2, 1) DEFAULT 4.5,
    photo VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tezkor geolokatsiya qidiruvlari uchun indekslar
CREATE INDEX IF NOT EXISTS idx_restaurants_coords ON restaurants(lat, lng);
CREATE INDEX IF NOT EXISTS idx_restaurants_category ON restaurants(category_id);

-- 3. Menyu taomlari jadvali
CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    price INT NOT NULL, -- narx so'mda
    description TEXT,
    photo VARCHAR(500),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_menu_restaurant ON menu_items(restaurant_id);
