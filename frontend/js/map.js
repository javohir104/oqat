/**
 * Oqat — Yandex Maps moduli (Kamron mas'ul)
 * Vazifalari:
 * 1. Yandex Maps xaritasini initsializatsiya qilish
 * 2. GPS geolokatsiyani aniqlash (Toshkent markazi fallback bilan)
 * 3. Restoranlar markyorlarini (Pins) xaritaga joylash
 * 4. Markyor bosilganda voqeani chaqirish
 */

let oqatMap = null;
let userPlacemark = null;
let restaurantGeoCollection = null;

// Foydalanuvchi koordinatasi (Boshlang'ich default: Toshkent Amir Temur xiyoboni)
let currentUserCoords = [41.311081, 69.279737];

/**
 * Xaritani yuklash va tayyorlash
 */
function initYandexMap(onSelectRestaurantCallback) {
    if (typeof ymaps === 'undefined') {
        console.warn("Yandex Maps API ulanmagan yoki internet yo'q. Simulyatsiya rejimi.");
        return;
    }

    ymaps.ready(() => {
        // 1. Xarita obyekti
        oqatMap = new ymaps.Map("map", {
            center: currentUserCoords,
            zoom: 13,
            controls: ['zoomControl', 'geolocationControl']
        }, {
            searchControlProvider: 'yandex#search',
            suppressMapOpenBlock: true
        });

        restaurantGeoCollection = new ymaps.GeoObjectCollection();
        oqatMap.geoObjects.add(restaurantGeoCollection);

        // 2. Foydalanuvchi joylashuvini so'rash
        detectUserLocation();
    });
}

/**
 * Foydalanuvchining GPS joylashuvini aniqlash
 */
function detectUserLocation(callback) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                currentUserCoords = [pos.coords.latitude, pos.coords.longitude];
                updateUserMarker(currentUserCoords);
                if (oqatMap) {
                    oqatMap.panTo(currentUserCoords, { flying: true, duration: 800 });
                }
                if (callback) callback(currentUserCoords);
            },
            (err) => {
                console.log("GPS ruxsat berilmadi yoki xato, standart koordinata olindi:", err.message);
                updateUserMarker(currentUserCoords);
                if (callback) callback(currentUserCoords);
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    } else {
        updateUserMarker(currentUserCoords);
        if (callback) callback(currentUserCoords);
    }
}

/**
 * Foydalanuvchi joylashgan nuqtaga markyor qo'yish
 */
function updateUserMarker(coords) {
    if (!oqatMap) return;

    if (userPlacemark) {
        oqatMap.geoObjects.remove(userPlacemark);
    }

    userPlacemark = new ymaps.Placemark(coords, {
        hintContent: "Siz shu yerdasiz"
    }, {
        preset: 'islands#redCircleDotIcon'
    });

    oqatMap.geoObjects.add(userPlacemark);
}

/**
 * Restoranlarni xaritaga markyorlar sifatida joylashtirish
 */
function renderRestaurantMarkersOnMap(restaurants, onSelectRestaurantCallback) {
    if (!oqatMap || !restaurantGeoCollection) return;

    restaurantGeoCollection.removeAll();

    restaurants.forEach(rest => {
        // Kategoriyaga mos icon preset tanlash
        let iconPreset = 'islands#orangeFoodIcon';
        if (rest.category_id === 2) iconPreset = 'islands#darkOrangeFastFoodIcon';
        if (rest.category_id === 3) iconPreset = 'islands#brownCoffeeIcon';

        const placemark = new ymaps.Placemark([rest.lat, rest.lng], {
            balloonContentHeader: `<b>${rest.name}</b>`,
            balloonContentBody: `
                <div style="font-size: 13px; line-height: 1.4;">
                    <p>📍 ${rest.address}</p>
                    <p>⭐ <b>${rest.rating}</b> | 📞 ${rest.phone}</p>
                    <p style="margin-top: 6px;"><button id="balloonBtn-${rest.id}" style="background:#FF521B; color:#fff; border:none; padding:4px 10px; border-radius:6px; cursor:pointer;">Menyuni ko'rish</button></p>
                </div>
            `,
            hintContent: rest.name
        }, {
            preset: iconPreset
        });

        // Markyor bosilganda
        placemark.events.add('click', () => {
            if (onSelectRestaurantCallback) {
                onSelectRestaurantCallback(rest.id);
            }
        });

        restaurantGeoCollection.add(placemark);
    });
}

/**
 * Berilgan koordinataga xaritani silliq siljitish (PanTo)
 */
function flyToLocation(lat, lng) {
    if (oqatMap) {
        oqatMap.panTo([lat, lng], { flying: true, duration: 600, zoom: 15 });
    }
}

/**
 * Ikki nuqta orasidagi masofani hisoblash (Haversine formulasi, km da)
 */
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Yer radiusi km
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
 * Masofani chiroyli formatda chiqarish (masalan: '450 m' yoki '1.8 km')
 */
function formatDistance(distKm) {
    if (distKm < 1) {
        return Math.round(distKm * 1000) + " m";
    }
    return distKm.toFixed(1) + " km";
}
