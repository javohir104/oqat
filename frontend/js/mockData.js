/**
 * Oqat — Mock ma'lumotlar to'plami
 * Backend (Durbek) va Database (Ulug'bek) to'liq ulanmaguncha frontendni testlash uchun ishlatiladi.
 */

const MOCK_CATEGORIES = [
    { id: 'all', name: 'Barchasi', icon: 'fa-solid fa-utensils' },
    { id: 1, name: 'Milliy taomlar', icon: 'fa-solid fa-bowl-rice' },
    { id: 2, name: 'Fast-food', icon: 'fa-solid fa-burger' },
    { id: 3, name: 'Qahva & Desert', icon: 'fa-solid fa-mug-hot' },
    { id: 4, name: 'Turk taomlari', icon: 'fa-solid fa-drumstick-bite' }
];

const MOCK_RESTAURANTS = [
    {
        id: 1,
        name: "Rayhon Milliy Taomlar",
        category_id: 1,
        category_name: "Milliy taomlar",
        lat: 41.3265,
        lng: 69.2285,
        address: "Beruniy shoh ko'chasi, 2 (G'uncha kinoteatri yaqinida)",
        phone: "+998 71 200 88 88",
        rating: 4.7,
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop",
        menu: [
            {
                id: 101,
                name: "Toshkent To'y Oshi",
                price: 36000,
                description: "Devzira guruch, barra mol go'shti, no'xat, mayiz va bedana tuxumi bilan",
                photo: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=300&auto=format&fit=crop"
            },
            {
                id: 102,
                name: "Qovurma Lag'mon",
                price: 38000,
                description: "Qo'lda cho'zilgan xamir, sarhil mol go'shti, bulg'or qalampiri va sous",
                photo: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop"
            },
            {
                id: 103,
                name: "Qozon Kabob",
                price: 54000,
                description: "Yumshoq qo'zichoq go'shti, qovurilgan qarsildoq kartoshka va piyoz",
                photo: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop"
            },
            {
                id: 104,
                name: "Achichiq-chuchuk salati",
                price: 15000,
                description: "Yangi pomidor, yupqa archilgan piyoz va achchiq ko'k qalampir",
                photo: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop"
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
        rating: 4.6,
        photo: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&auto=format&fit=crop",
        menu: [
            {
                id: 201,
                name: "Lavash Standart (Mol go'shti)",
                price: 32000,
                description: "Shirali go'sht, bodring, pomidor, qarsildoq chips va original sous",
                photo: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&auto=format&fit=crop"
            },
            {
                id: 202,
                name: "Pishloqli Shaurma",
                price: 29000,
                description: "Pechda pishirilgan tovuq go'shti, Golland pishlog'i va barra sabzavotlar",
                photo: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300&auto=format&fit=crop"
            },
            {
                id: 203,
                name: "Fri Kartoshkasi (Katta)",
                price: 16000,
                description: "Oltinrang qovurilgan qarsildoq fri kartoshkalari",
                photo: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&auto=format&fit=crop"
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
        address: "Chilonzor tumani, Bunyodkor ko'chasi",
        phone: "+998 78 150 00 30",
        rating: 4.5,
        photo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop",
        menu: [
            {
                id: 301,
                name: "Lavash Chizburgerli",
                price: 36000,
                description: "Mol go'shti, erigan pishloq, bodring va achchiq sous",
                photo: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&auto=format&fit=crop"
            },
            {
                id: 302,
                name: "Katta Burger",
                price: 33000,
                description: "Tabiiy go'sht kotleti, aysberg bargi, maxsus burger sousi",
                photo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop"
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
        address: "Shahrisabz ko'chasi, 31",
        phone: "+998 71 205 55 55",
        rating: 4.8,
        photo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop",
        menu: [
            {
                id: 401,
                name: "San Sebastian Cheesecake",
                price: 38000,
                description: "Ispancha uslubdagi mayin krem-pishloqli pirog, issiq shokolad sousi bilan",
                photo: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&auto=format&fit=crop"
            },
            {
                id: 402,
                name: "Cappuccino (350ml)",
                price: 24000,
                description: "Toza Arabika qahva donalari va ipakdek nozik ko'pirtirilgan sut",
                photo: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&auto=format&fit=crop"
            },
            {
                id: 403,
                name: "Kruassan (Shokoladli)",
                price: 18000,
                description: "Fransuzcha sariyog'li qatlama xamir, ichida boy Nutella kremi",
                photo: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&auto=format&fit=crop"
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
        address: "Iftixor ko'chasi, 1 (Teleminora yaqinida)",
        phone: "+998 71 200 00 00",
        rating: 4.9,
        photo: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600&auto=format&fit=crop",
        menu: [
            {
                id: 501,
                name: "Maxsus To'y Oshi (1 porsiya)",
                price: 40000,
                description: "Besh qozon uslubida pishirilgan to'y oshi, qazi va bedana tuxumi qo'shilgan",
                photo: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=300&auto=format&fit=crop"
            },
            {
                id: 502,
                name: "Choyxona Oshi",
                price: 38000,
                description: "Qo'y go'shti va qora murch bilan to'yingan an'anaviy farg'onacha osh",
                photo: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=300&auto=format&fit=crop"
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
        address: "Sayilgoh ko'chasi (Broadway)",
        phone: "+998 78 147 00 00",
        rating: 4.4,
        photo: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop",
        menu: [
            {
                id: 601,
                name: "Baconator Burger",
                price: 46000,
                description: "Ikki qavatli barra mol go'shti, qovurilgan bekon va erigan pishloq",
                photo: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&auto=format&fit=crop"
            },
            {
                id: 602,
                name: "Frosty Shokoladli Desert",
                price: 18000,
                description: "Wendy's afsonaviy muzdek shokoladli shirinligi",
                photo: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&auto=format&fit=crop"
            }
        ]
    }
];
