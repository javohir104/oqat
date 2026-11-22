/**
 * Oqat — Mock ma'lumotlar to'plami (Kengaytirilgan va boyitilgan)
 * Realistik Toshkent restoranlari, to'liq menyu, ish vaqti, parametrlar va xususiyatlar.
 */

const MOCK_CATEGORIES = [
    { id: 'all', name: 'Barchasi', icon: 'fa-solid fa-fire' },
    { id: 1, name: 'Milliy taomlar', icon: 'fa-solid fa-bowl-rice' },
    { id: 2, name: 'Fast-food', icon: 'fa-solid fa-burger' },
    { id: 3, name: 'Qahva & Desert', icon: 'fa-solid fa-mug-hot' },
    { id: 4, name: 'Turk taomlari', icon: 'fa-solid fa-drumstick-bite' },
    { id: 5, name: 'Pitsa & Pasta', icon: 'fa-solid fa-pizza-slice' },
    { id: 6, name: 'Osiyo oshxonasi', icon: 'fa-solid fa-fish-fins' }
];

const MOCK_RESTAURANTS = [
    {
        id: 1,
        name: "Rayhon Milliy Taomlar",
        category_id: 1,
        category_name: "Milliy taomlar",
        lat: 41.3265,
        lng: 69.2285,
        address: "Beruniy shoh ko'chasi, 2 (G'uncha kinoteatri ro'parasida)",
        phone: "+998 71 200 88 88",
        rating: 4.8,
        reviews_count: 342,
        working_hours: "09:00 - 23:00",
        is_open: true,
        price_level: "$$",
        features: ["Halol", "Avtoturargoh", "Wi-Fi", "Oila uchun"],
        delivery_time: "25-35 daqiqa",
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
        menu: [
            {
                id: 101,
                name: "Toshkent To'y Oshi",
                price: 38000,
                category: "Asosiy taom",
                description: "Lazer va Devzira guruch, barra mol go'shti, no'xat, mayiz, bedana tuxumi va qazi bo'lagi bilan",
                photo: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "680 kkal"
            },
            {
                id: 102,
                name: "Qovurma Lag'mon",
                price: 42000,
                category: "Asosiy taom",
                description: "Qo'lda cho'zilgan mayin xamir, sarhil mol go'shti, bulg'or qalampiri, selderey va maxsus sous",
                photo: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "540 kkal"
            },
            {
                id: 103,
                name: "Maxsus Qozon Kabob",
                price: 58000,
                category: "Asosiy taom",
                description: "Qozonda mayin pishgan qo'zichoq go'shti, qarsildoq tilla rang kartoshka va marinadlangan piyoz",
                photo: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop",
                is_popular: false,
                calories: "720 kkal"
            },
            {
                id: 104,
                name: "Achichiq-chuchuk Salati",
                price: 16000,
                category: "Salatlar",
                description: "Yangi serob pomidor, yupqa archilgan piyoz va achchiq yashil qalampir",
                photo: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop",
                is_popular: false,
                calories: "95 kkal"
            },
            {
                id: 105,
                name: "Ko'k Choy (Choynakda)",
                price: 8000,
                category: "Ichimliklar",
                description: "Limon va rayhon barglari bilan damlangan xushbo'y tog' ko'k choyi",
                photo: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&auto=format&fit=crop",
                is_popular: false,
                calories: "5 kkal"
            }
        ]
    },
    {
        id: 2,
        name: "EVOS Fast Food",
        category_id: 2,
        category_name: "Fast-food",
        lat: 41.3115,
        lng: 69.2801,
        address: "Amir Temur shoh ko'chasi, 24",
        phone: "+998 71 203 12 12",
        rating: 4.7,
        reviews_count: 856,
        working_hours: "24/7 Tun-u kun",
        is_open: true,
        price_level: "$",
        features: ["24/7", "Tezkor yetkazish", "Halol", "Konditsioner"],
        delivery_time: "15-25 daqiqa",
        photo: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&auto=format&fit=crop",
        menu: [
            {
                id: 201,
                name: "Lavash Standart (Mol go'shti)",
                price: 34000,
                category: "Asosiy taom",
                description: "Yumshoq yupqa lavash xamiri, marinadlangan shirali mol go'shti, barra bodring, pomidor, chips va EVOS original sousi",
                photo: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "590 kkal"
            },
            {
                id: 202,
                name: "Pishloqli Shaurma",
                price: 31000,
                category: "Asosiy taom",
                description: "Pechda charx urib pishgan tovuq filesi, erigan Golland pishlog'i va sarxil sabzavotlar",
                photo: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "520 kkal"
            },
            {
                id: 203,
                name: "Qarsildoq Fri Kartoshkasi (Katta)",
                price: 17000,
                category: "Qo'shimchalar",
                description: "Oltin rangda qarsildoq qilib qovurilgan maxsus Belogoriya fri kartoshkasi",
                photo: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop",
                is_popular: false,
                calories: "340 kkal"
            },
            {
                id: 204,
                name: "Koka-Kola (0.5L Muzdek)",
                price: 12000,
                category: "Ichimliklar",
                description: "Muz va limon bilan taqdim etiladigan tetiklantiruvchi ichimlik",
                photo: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop",
                is_popular: false,
                calories: "140 kkal"
            }
        ]
    },
    {
        id: 3,
        name: "Oqtepa Lavash",
        category_id: 2,
        category_name: "Fast-food",
        lat: 41.2842,
        lng: 69.2081,
        address: "Chilonzor tumani, Bunyodkor ko'chasi 18",
        phone: "+998 78 150 00 30",
        rating: 4.6,
        reviews_count: 512,
        working_hours: "10:00 - 03:00",
        is_open: true,
        price_level: "$",
        features: ["Drive-thru", "Wi-Fi", "Halol", "Bolalar maydonchasi"],
        delivery_time: "20-30 daqiqa",
        photo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
        menu: [
            {
                id: 301,
                name: "Lavash Chizburgerli Maxsus",
                price: 38000,
                category: "Asosiy taom",
                description: "Mol go'shtidan kotlet, ikki qavat Chedder pishlog'i, bodring, pomidor va maxsus sous",
                photo: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "640 kkal"
            },
            {
                id: 302,
                name: "Katta Double Burger",
                price: 36000,
                category: "Asosiy taom",
                description: "Ikki qavat tabiiy go'sht kotleti, yangi aysberg salat bargi, qizil piyoz va burger sousi",
                photo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "610 kkal"
            },
            {
                id: 303,
                name: "Qarsildoq Naggets (6 dona)",
                price: 22000,
                category: "Qo'shimchalar",
                description: "Tovuq filesidan tayyorlangan qarsildoq non uvoqli naggetslar, pishloqli sous bilan",
                photo: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&auto=format&fit=crop",
                is_popular: false,
                calories: "310 kkal"
            }
        ]
    },
    {
        id: 4,
        name: "Safia Cafe & Bakery",
        category_id: 3,
        category_name: "Qahva & Desert",
        lat: 41.3148,
        lng: 69.2834,
        address: "Shahrisabz ko'chasi, 31 (Oybek metro yaqinida)",
        phone: "+998 71 205 55 55",
        rating: 4.9,
        reviews_count: 1240,
        working_hours: "08:00 - 23:00",
        is_open: true,
        price_level: "$$",
        features: ["Premium qahva", "Nonushta", "Wi-Fi", "Ochiq veranda", "Shinam muhit"],
        delivery_time: "20-35 daqiqa",
        photo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop",
        menu: [
            {
                id: 401,
                name: "San Sebastian Cheesecake",
                price: 42000,
                category: "Desertlar",
                description: "Ispancha uslubdagi sarg'ish qobiqli mayin krem-pishloq, issiq Belgia shokolad sousi bilan",
                photo: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "450 kkal"
            },
            {
                id: 402,
                name: "Cappuccino Italiano (350ml)",
                price: 26000,
                category: "Qahva",
                description: "100% Arabika premium donalari, baxmaldek ipak ko'pirtirilgan sut va latte-art",
                photo: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "120 kkal"
            },
            {
                id: 403,
                name: "Kruassan (Nutella va Bodom)",
                price: 22000,
                category: "Pishiriqlar",
                description: "Haqiqiy fransuz sariyog'i bilan tayyorlangan qatlama, ichida ko'p Nutella va bodom parchalari",
                photo: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop",
                is_popular: false,
                calories: "380 kkal"
            },
            {
                id: 404,
                name: "Iced Caramel Macchiato",
                price: 28000,
                category: "Qahva",
                description: "Espresso, sovuq sut, vanil siropi va ustiga quyilgan tabiiy karamel sousi",
                photo: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&auto=format&fit=crop",
                is_popular: false,
                calories: "190 kkal"
            }
        ]
    },
    {
        id: 5,
        name: "Besh Qozon (Osh Markazi)",
        category_id: 1,
        category_name: "Milliy taomlar",
        lat: 41.3473,
        lng: 69.2858,
        address: "Iftixor ko'chasi, 1 (Toshkent Teleminorasi yonida)",
        phone: "+998 71 200 00 00",
        rating: 4.9,
        reviews_count: 2450,
        working_hours: "09:00 - 18:00",
        is_open: true,
        price_level: "$$",
        features: ["Sayyohlar uchun tavsiya", "Halol", "Katta zal", "Keng avtoturargoh"],
        delivery_time: "30-45 daqiqa",
        photo: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&auto=format&fit=crop",
        menu: [
            {
                id: 501,
                name: "Maxsus To'y Oshi (1 porsiya)",
                price: 44000,
                category: "Asosiy taom",
                description: "Devzira guruch, barra go'sht, qazi, kalla go'shti, bedana tuxumi va mayiz bilan boyitilgan afsonaviy toshkentcha osh",
                photo: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "760 kkal"
            },
            {
                id: 502,
                name: "Choyxona Oshi (Qo'y go'shti bilan)",
                price: 42000,
                category: "Asosiy taom",
                description: "Farg'ona vodiysi uslubidagi to'q rangli, murchli va sergo'sht an'anaviy choyxona palovi",
                photo: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "780 kkal"
            },
            {
                id: 503,
                name: "Suzma va Ko'katlar To'plami",
                price: 14000,
                category: "Salatlar",
                description: "Yangi tabiiy suzma, kashnich, arpabodiyon va yalpiz aralashmasi",
                photo: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop",
                is_popular: false,
                calories: "110 kkal"
            }
        ]
    },
    {
        id: 6,
        name: "Wendy's Uzbekistan",
        category_id: 2,
        category_name: "Fast-food",
        lat: 41.3119,
        lng: 69.2789,
        address: "Sayilgoh ko'chasi (Broadway markaziy xiyoboni)",
        phone: "+998 78 147 00 00",
        rating: 4.5,
        reviews_count: 420,
        working_hours: "10:00 - 02:00",
        is_open: true,
        price_level: "$$",
        features: ["Broadway ko'rinishi", "Wi-Fi", "Amerika brendi", "Muzqaymoq"],
        delivery_time: "20-35 daqiqa",
        photo: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop",
        menu: [
            {
                id: 601,
                name: "Baconator Original Burger",
                price: 49000,
                category: "Asosiy taom",
                description: "Ikki qavat yirik mol go'shti kotleti, qovurilgan bekon, erigan pishloq va ketchunez",
                photo: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "710 kkal"
            },
            {
                id: 602,
                name: "Frosty Shokoladli Muzdek Desert",
                price: 19000,
                category: "Desertlar",
                description: "Wendy's firmasining afsonaviy shokoladli sutli qalin kokteyl-muzqaymog'i",
                photo: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "280 kkal"
            }
        ]
    },
    {
        id: 7,
        name: "Chopar Pizza",
        category_id: 5,
        category_name: "Pitsa & Pasta",
        lat: 41.3210,
        lng: 69.2680,
        address: "Navoiy ko'chasi, 14",
        phone: "+998 71 205 11 11",
        rating: 4.7,
        reviews_count: 670,
        working_hours: "10:00 - 00:00",
        is_open: true,
        price_level: "$$",
        features: ["Milliy pitsalar", "Tez yetkazish", "Halol", "Komboslar"],
        delivery_time: "25-40 daqiqa",
        photo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop",
        menu: [
            {
                id: 701,
                name: "Bayram Pitsa (32cm)",
                price: 68000,
                category: "Pitsa",
                description: "Yupqa qarsildoq xamir, qazi bo'laklari, mol go'shti, pishloq Motssarella va maxsus sous",
                photo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "820 kkal"
            },
            {
                id: 702,
                name: "Pepperoni Classic",
                price: 62000,
                category: "Pitsa",
                description: "Mol go'shtidan xushbo'y achchiq Pepperoni kolbasalari, pomidor sousi va ko'p Motssarella",
                photo: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "780 kkal"
            }
        ]
    },
    {
        id: 8,
        name: "Sultan Saray Turk Restorani",
        category_id: 4,
        category_name: "Turk taomlari",
        lat: 41.3050,
        lng: 69.2620,
        address: "Shota Rustaveli ko'chasi, 45",
        phone: "+998 71 255 33 22",
        rating: 4.9,
        reviews_count: 980,
        working_hours: "11:00 - 23:30",
        is_open: true,
        price_level: "$$$",
        features: ["Premium interyer", "Jonli musiqa", "Turk shirinliklari", "Halol"],
        delivery_time: "35-50 daqiqa",
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
        menu: [
            {
                id: 801,
                name: "Iskandar Kabob",
                price: 65000,
                category: "Asosiy taom",
                description: "Tandirda pishgan pite noni ustida yupqa go'sht, pomidor sousi, eritilgan sariyog' va quyuq suzma",
                photo: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "740 kkal"
            },
            {
                id: 802,
                name: "Turkcha Pista Paxlavasi",
                price: 38000,
                category: "Desertlar",
                description: "Gaziantep uslubidagi 40 qatlamli qarsildoq pista va asal sharbati bilan tayyorlangan paxlava",
                photo: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&auto=format&fit=crop",
                is_popular: true,
                calories: "410 kkal"
            }
        ]
    }
];
