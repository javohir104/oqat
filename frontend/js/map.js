/**
 * Oqat — Yandex Maps Moduli (Kamron mas'ul)
 * Vazifalari:
 * 1. Yandex Maps JS API v2/v3 ni ulash va initsializatsiya qilish
 * 2. Foydalanuvchining GPS geolokatsiyasini aniqlash (Toshkent markazi default)
 * 3. Restoranlarni xaritada chiroyli markyorlar (Custom Pins) bilan aks ettirish
 * 4. Markyor bosilganda restoran haqida qisqacha ma'lumot oynasini (Balloon Popup) ochish
 * 5. Animatsiyali parvoz (Smooth FlyTo) va xarita boshqaruvi
 */

let oqatMap = null;
let userPlacemark = null;
let restaurantGeoCollection = null;
let placemarksMap = {}; // Restoran ID si bo'yicha markyorlarni saqlash

// Foydalanuvchi koordinatasi (Boshlang'ich default: Toshkent Amir Temur xiyoboni)
let currentUserCoords = [41.311081, 69.279737];
const DEFAULT_TASHKENT_COORDS = [41.311081, 69.279737];

/**
 * 1. Xaritani yuklash va tayyorlash (Yandex Maps JS API v2.1)
 */
function initYandexMap(onSelectRestaurantCallback) {
    if (typeof ymaps === 'undefined') {
        console.warn("Yandex Maps API ulanmagan yoki internet ulanishi yo'q.");
        if (typeof showToast === 'function') {
            showToast("Xarita API yuklanmoqda yoki oflayn rejim", "info", "fa-solid fa-map");
        }
        return;
    }

    ymaps.ready(() => {
        // Xarita obyektini yaratish
        oqatMap = new ymaps.Map("map", {
            center: currentUserCoords,
            zoom: 14,
            controls: [] // Standart tugmalar o'rniga o'zimizning premium boshqaruv tugmalarimiz
        }, {
            searchControlProvider: 'yandex#search',
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true
        });

        restaurantGeoCollection = new ymaps.GeoObjectCollection();
        oqatMap.geoObjects.add(restaurantGeoCollection);

        // 2. Foydalanuvchining joriy koordinatalarini (GPS) aniqlash
        detectUserLocation();

        // Xarita boshqaruv tugmalarini ulash
        setupMapCustomControls();
    });
}

/**
 * Xarita o'ng burchagidagi maxsus boshqaruv tugmalari (Zoom in, Zoom out, Reset view)
 */
function setupMapCustomControls() {
    const zoomInBtn = document.getElementById('mapZoomInBtn');
    const zoomOutBtn = document.getElementById('mapZoomOutBtn');
    const resetViewBtn = document.getElementById('mapResetViewBtn');

    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            if (oqatMap) {
                const currentZoom = oqatMap.getZoom();
                oqatMap.setZoom(currentZoom + 1, { duration: 300 });
            }
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            if (oqatMap) {
                const currentZoom = oqatMap.getZoom();
                oqatMap.setZoom(currentZoom - 1, { duration: 300 });
            }
        });
    }

    if (resetViewBtn) {
        resetViewBtn.addEventListener('click', () => {
            if (oqatMap) {
                oqatMap.panTo(DEFAULT_TASHKENT_COORDS, { flying: true, duration: 600 });
                oqatMap.setZoom(13, { duration: 400 });
                if (typeof showToast === 'function') {
                    showToast("Xarita markazga qaytarildi", "info", "fa-solid fa-arrows-to-dot");
                }
            }
        });
    }
}

/**
 * 2. Foydalanuvchining GPS joylashuvini aniqlash
 */
function detectUserLocation(callback) {
    const locateBtn = document.getElementById('locateMeBtn');
    if (locateBtn) locateBtn.classList.add('locate-active');

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                currentUserCoords = [pos.coords.latitude, pos.coords.longitude];
                updateUserMarker(currentUserCoords);
                if (oqatMap) {
                    oqatMap.panTo(currentUserCoords, { flying: true, duration: 800 });
                    oqatMap.setZoom(15, { duration: 500 });
                }
                if (locateBtn) locateBtn.classList.remove('locate-active');
                if (typeof showToast === 'function') {
                    showToast("Sizning joylashuvingiz aniqlandi!", "success", "fa-solid fa-location-crosshairs");
                }
                if (callback) callback(currentUserCoords);
            },
            (err) => {
                console.log("GPS ruxsat berilmadi yoki xato yuz berdi. Toshkent markazi olinadi:", err.message);
                updateUserMarker(currentUserCoords);
                if (locateBtn) locateBtn.classList.remove('locate-active');
                if (typeof showToast === 'function') {
                    showToast("Standart joylashuv: Toshkent shahri", "info", "fa-solid fa-city");
                }
                if (callback) callback(currentUserCoords);
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    } else {
        updateUserMarker(currentUserCoords);
        if (locateBtn) locateBtn.classList.remove('locate-active');
        if (callback) callback(currentUserCoords);
    }
}

/**
 * Foydalanuvchi joylashgan nuqtaga zamonaviy radar pulsatsiyali markyor qo'yish
 */
function updateUserMarker(coords) {
    if (!oqatMap || typeof ymaps === 'undefined') return;

    if (userPlacemark) {
        oqatMap.geoObjects.remove(userPlacemark);
    }

    const UserLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="user-radar-pulse" title="Siz shu yerdasiz"></div>'
    );

    userPlacemark = new ymaps.Placemark(coords, {
        hintContent: "Siz shu yerdasiz"
    }, {
        iconLayout: UserLayout,
        iconShape: {
            type: 'Circle',
            coordinates: [11, 11],
            radius: 14
        }
    });

    oqatMap.geoObjects.add(userPlacemark);
}

/**
 * Kategoriyaga mos emoji/belgi aniqlash
 */
function getCategoryIcon(categoryId) {
    switch (categoryId) {
        case 1: return '🍲'; // Milliy
        case 2: return '🍔'; // Fast-food
        case 3: return '☕'; // Qahva
        case 4: return '🥩'; // Turk
        case 5: return '🍕'; // Pitsa
        case 6: return '🍣'; // Osiyo
        default: return '🍽️';
    }
}

/**
 * 3. Restoranlarni xaritada chiroyli markyorlar (Pins) bilan aks ettirish
 * 4. Markyor bosilganda qisqacha ma'lumot oynasini (Balloon) ochish
 */
function renderRestaurantMarkersOnMap(restaurants, onSelectRestaurantCallback) {
    if (!oqatMap || !restaurantGeoCollection || typeof ymaps === 'undefined') return;

    restaurantGeoCollection.removeAll();
    placemarksMap = {};

    // Maxsus HTML Pin shabloni (Uber Eats / Wolt uslubi)
    const PinLayout = ymaps.templateLayoutFactory.createClass(`
        <div class="custom-pin-container" id="pin-$[properties.id]">
            <div class="custom-pin-bubble">
                <span class="pin-emoji">$[properties.emoji]</span>
                <span>$[properties.name]</span>
                <span class="pin-rating">
                    <i class="fa-solid fa-star"></i> $[properties.rating]
                </span>
            </div>
            <div class="custom-pin-pointer"></div>
        </div>
    `);

    // Balloon ichidagi "Menyuni ko'rish" tugmasini global qilish
    window.openMenuFromBalloon = (restId) => {
        if (onSelectRestaurantCallback) {
            onSelectRestaurantCallback(restId);
        }
    };

    restaurants.forEach(rest => {
        const emoji = getCategoryIcon(rest.category_id);

        // 4. Markyor bosilganda chiquvchi qisqacha ma'lumot oynasi (Balloon HTML)
        const balloonHtml = `
            <div class="map-balloon-popup">
                <div class="balloon-media">
                    <img src="${rest.photo}" alt="${rest.name}">
                    <span class="balloon-tag">${rest.category_name}</span>
                </div>
                <div class="balloon-content">
                    <h4 class="balloon-name">${rest.name}</h4>
                    <div class="balloon-stats">
                        <span class="balloon-rating"><i class="fa-solid fa-star"></i> ${rest.rating}</span>
                        <span class="balloon-dot">•</span>
                        <span class="balloon-dist"><i class="fa-solid fa-person-walking"></i> ${rest.formattedDistance || 'Yaqin'}</span>
                        <span class="balloon-dot">•</span>
                        <span class="balloon-status ${rest.is_open ? 'open' : 'closed'}">${rest.is_open ? 'Ochiq' : 'Yopiq'}</span>
                    </div>
                    <p class="balloon-address"><i class="fa-solid fa-location-dot"></i> ${rest.address}</p>
                    <div class="balloon-action-row">
                        <a href="tel:${rest.phone.replace(/[^0-9+]/g, '')}" class="balloon-btn balloon-btn-call" title="Qo'ng'iroq qilish">
                            <i class="fa-solid fa-phone"></i>
                        </a>
                        <button class="balloon-btn balloon-btn-menu" onclick="window.openMenuFromBalloon(${rest.id})">
                            <i class="fa-solid fa-book-open"></i> Menyuni ko'rish
                        </button>
                    </div>
                </div>
            </div>
        `;

        const placemark = new ymaps.Placemark([rest.lat, rest.lng], {
            id: rest.id,
            name: rest.name,
            emoji: emoji,
            rating: rest.rating,
            balloonContent: balloonHtml,
            hintContent: `${rest.name} (${rest.rating} ⭐)`
        }, {
            iconLayout: PinLayout,
            iconOffset: [-60, -38],
            balloonOffset: [0, -38],
            balloonCloseButton: true,
            balloonMaxHeight: 340,
            balloonPanelMaxMapArea: 0,
            hideIconOnBalloonOpen: false
        });

        // Markyor bosilganda:
        // 1. Qisqacha ma'lumot balonchasini ochish
        // 2. Xaritani silliq markazlashtirish
        placemark.events.add('click', () => {
            placemark.balloon.open();
            flyToLocation(rest.lat, rest.lng);
        });

        placemarksMap[rest.id] = placemark;
        restaurantGeoCollection.add(placemark);
    });
}

/**
 * Xaritada restoranning qisqacha ma'lumot balonchasini dasturiy ochish
 */
function openRestaurantBalloon(restaurantId) {
    if (placemarksMap[restaurantId]) {
        placemarksMap[restaurantId].balloon.open();
    }
}

/**
 * Berilgan koordinataga silliq parvoz qilish (FlyTo)
 */
function flyToLocation(lat, lng) {
    if (oqatMap) {
        oqatMap.panTo([lat, lng], {
            flying: true,
            duration: 800
        }).then(() => {
            oqatMap.setZoom(16, { duration: 400 });
        });
    }
}

/**
 * Ikki nuqta orasidagi masofani hisoblash (Haversine formulasi, km)
 */
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Yer radiusi
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Masofani qulay formatda chiqarish (masalan: 320 m yoki 2.4 km)
 */
function formatDistance(distKm) {
    if (distKm < 1) {
        return Math.round(distKm * 1000) + " m";
    }
    return distKm.toFixed(1) + " km";
}
