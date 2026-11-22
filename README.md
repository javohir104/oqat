# Oqat — Yaqin ovqatlanish joylari va menyu platformasi

Foydalanuvchiga o'ziga eng yaqin bo'lgan ovqatlanish joylarini (milliy taomlar, fast-food, oshxonalar, qahvaxonalar) Yandex xaritasi orqali ko'rsatish hamda ularning taomlar menyusi va narxlarini qulay interfeysda taqdim etuvchi startap loyiha.

---

## 🛠 Texnologik stek
* **Frontend:** HTML5, CSS3 (Modern Responsive UI), JavaScript (Vanilla ES6+), Yandex Maps JavaScript API v2.1
* **Backend:** Node.js / Express (REST API)
* **Ma'lumotlar bazasi:** PostgreSQL / MySQL
* **Version Control:** Git & GitHub

---

## 📁 Loyiha tuzilmasi
```text
oqat/
├── frontend/
│   ├── index.html        # Asosiy sahifa
│   ├── css/
│   │   └── style.css     # Mobilga mos zamonaviy dizayn
│   └── js/
│       ├── mockData.js   # API tayyor bo'lguncha test ma'lumotlari
│       ├── map.js        # Yandex xarita va geolokatsiya (Kamron)
│       ├── ui.js         # Interfeys, qidiruv, filtr va menyu modali (Ismoil)
│       └── app.js        # Asosiy bog'lovchi skript
├── database/
│   ├── schema.sql        # Jadvallar arxitekturasi (Ulug'bek)
│   └── seed.sql          # Toshkentdagi real joylar va taomlar
├── backend/              # REST API server (Durbek)
└── README.md
```

---

## 🚀 Ishga tushirish (Frontend)
1. `frontend/index.html` faylini istalgan brauzerda (yoki VS Code `Live Server` orqali) oching.
2. Brauzer geolokatsiyaga ruxsat so'raganda **"Ruxsat berish"** (Allow) tugmasini bosing.
3. Xaritada eng yaqin ovqatlanish maskanlari, ularning reytingi va masofasi ko'rinadi.
4. Istalgan restoranni tanlab, uning to'liq taomlar menyusi va narxlarini ko'rishingiz mumkin.

---

## 👥 Jamoa va Mas'ullar
* **Team Lead:** Loyiha koordinatsiyasi, Code Review va Git Flow nazorati
* **Kamron:** Frontend & Maps Integrator (`feature/map-integration`)
* **Ismoil:** Frontend UI/UX & Responsive (`feature/ui-layout`)
* **Durbek:** Backend Developer (`feature/backend-api`)
* **Ulug'bek:** Database / SQL Engineer (`feature/sql-database`)
