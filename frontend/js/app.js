/**
 * Oqat — Asosiy ilova kontrolleri (App Orchestrator)
 * Xarita, UI, Qidiruv, Filtrlar va Ma'lumotlarni yagona ishchi tizimga birlashtiradi.
 */

// Agar Backend (Durbek) serveri yonsa, shu URL orqali oladi, bo'lmasa MOCK_RESTAURANTS dan foydalanadi
const API_BASE_URL = 'http://localhost:5000/api';

let currentCategory = 'all';
let searchQuery = '';
let isListView = false;
let allRestaurants = [];

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // 1. Dastlabki restoranlar ma'lumotlarini yuklash (mockData.js dan)
    allRestaurants = [...MOCK_RESTAURANTS];

    // 2. Kamronning Yandex Maps modulini ishga tushirish
    initYandexMap(handleRestaurantSelected);

    // 3. Masofalarni hisoblash va ro'yxatni yangilash
    updateRestaurantsWithDistances();

    // 4. Ismoilning UI komponentlarini chizish
    renderCategories(MOCK_CATEGORIES, currentCategory, handleCategoryChange);
    applyFiltersAndRender();

    // 5. Hodisalarni tinglash (Event Listeners)
    setupEventListeners();
}

/**
 * Har bir restoranning foydalanuvchigacha bo'lgan masofasini hisoblab chiqish
 */
function updateRestaurantsWithDistances() {
    allRestaurants = allRestaurants.map(rest => {
        const distKm = calculateDistanceKm(
            currentUserCoords[0],
            currentUserCoords[1],
            rest.lat,
            rest.lng
        );
        return {
            ...rest,
            distanceKm: distKm,
            formattedDistance: formatDistance(distKm)
        };
    }).sort((a, b) => a.distanceKm - b.distanceKm); // Eng yaqinlarini oldinga qo'yish
}

/**
 * Filtrlash va ekranga chiqarish (Xarita va Ro'yxat uchun)
 */
function applyFiltersAndRender() {
    let filtered = allRestaurants;

    // Kategoriya bo'yicha filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(r => r.category_id === currentCategory);
    }

    // Qidiruv bo'yicha filter (nomi, manzili yoki taomlari)
    if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(r => {
            const matchesName = r.name.toLowerCase().includes(q);
            const matchesAddress = r.address.toLowerCase().includes(q);
            const matchesFood = r.menu && r.menu.some(m => m.name.toLowerCase().includes(q));
            return matchesName || matchesAddress || matchesFood;
        });
    }

    // Xaritadagi markyorlarni yangilash
    renderRestaurantMarkersOnMap(filtered, handleRestaurantSelected);

    // Ro'yxat ko'rinishidagi kartochkalarni yangilash
    renderRestaurantCards(filtered, handleRestaurantSelected);
}

/**
 * Kategoriya bosilganda
 */
function handleCategoryChange(catId) {
    currentCategory = catId;
    renderCategories(MOCK_CATEGORIES, currentCategory, handleCategoryChange);
    applyFiltersAndRender();
}

/**
 * Restoran tanlanganda (Xaritadagi markyordan yoki Ro'yxatdagi kartochkadan)
 */
function handleRestaurantSelected(restaurantId) {
    const found = allRestaurants.find(r => r.id === restaurantId);
    if (!found) return;

    // Xaritani markaziga siljitish
    flyToLocation(found.lat, found.lng);

    // Bottom Sheet menyusini ochish
    openRestaurantSheet(found);
}

/**
 * Tugmalar va kiritish maydonlarini sozlash
 */
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const viewToggleBtn = document.getElementById('viewToggleBtn');
    const locateMeBtn = document.getElementById('locateMeBtn');
    const closeSheetBtn = document.getElementById('closeSheetBtn');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const sheetDragArea = document.getElementById('sheetDragArea');
    const listView = document.getElementById('listView');

    // Qidiruv maydoni
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            if (clearSearchBtn) {
                clearSearchBtn.classList.toggle('hidden', searchQuery.length === 0);
            }
            applyFiltersAndRender();
        });
    }

    // Qidiruvni tozalash tugmasi
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            clearSearchBtn.classList.add('hidden');
            applyFiltersAndRender();
        });
    }

    // Xarita / Ro'yxat ko'rinishini almashtirish
    if (viewToggleBtn && listView) {
        viewToggleBtn.addEventListener('click', () => {
            isListView = !isListView;
            if (isListView) {
                listView.classList.remove('hidden');
                viewToggleBtn.innerHTML = '<i class="fa-solid fa-map-location-dot"></i>';
            } else {
                listView.classList.add('hidden');
                viewToggleBtn.innerHTML = '<i class="fa-solid fa-list-ul"></i>';
            }
        });
    }

    // Mening joylashuvimga qaytish
    if (locateMeBtn) {
        locateMeBtn.addEventListener('click', () => {
            detectUserLocation((coords) => {
                updateRestaurantsWithDistances();
                applyFiltersAndRender();
            });
        });
    }

    // Bottom Sheet ni yopish
    if (closeSheetBtn) closeSheetBtn.addEventListener('click', closeRestaurantSheet);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeRestaurantSheet);
    if (sheetDragArea) sheetDragArea.addEventListener('click', closeRestaurantSheet);
}
