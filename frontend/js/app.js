/**
 * Oqat — Asosiy ilova kontrolleri (App Orchestrator)
 * Xarita, UI, Qidiruv, Filtrlar, Sevimlilar va Savatni yagona mukammal tizimga birlashtiradi.
 */

let currentCategory = 'all';
let searchQuery = '';
let activeQuickFilters = {
    rating45: false,
    openNow: false,
    budget: false,
    delivery: false
};
let currentSort = 'distance';
let isListView = false;
let allRestaurants = [];

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // 1. Mavzuni initsializatsiya qilish (Dark/Light mode)
    initTheme();

    // 2. Dastlabki restoranlar ma'lumotlarini yuklash (mockData.js)
    allRestaurants = [...MOCK_RESTAURANTS];

    // 3. Masofalarni hisoblash
    updateRestaurantsWithDistances();

    // 4. Kamronning Yandex Maps modulini ishga tushirish
    initYandexMap(handleRestaurantSelected);

    // 5. Ismoilning UI komponentlarini chizish
    renderCategories(MOCK_CATEGORIES, currentCategory, handleCategoryChange);
    updateFavoritesBadge();
    applyFiltersAndRender();

    // 6. Barcha hodisalarni ulash
    setupEventListeners();
}

/**
 * Har bir restoranning foydalanuvchigacha bo'lgan masofasini hisoblash va saralash
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
    });

    sortRestaurantsList();
}

/**
 * Saralash qoidasi (Distance, Rating, Name)
 */
function sortRestaurantsList() {
    if (currentSort === 'distance') {
        allRestaurants.sort((a, b) => a.distanceKm - b.distanceKm);
    } else if (currentSort === 'rating') {
        allRestaurants.sort((a, b) => b.rating - a.rating);
    } else if (currentSort === 'name') {
        allRestaurants.sort((a, b) => a.name.localeCompare(b.name));
    }
}

/**
 * Filtrlash va ekranga chiqarish (Xarita va Ro'yxat uchun)
 */
function applyFiltersAndRender() {
    let filtered = [...allRestaurants];

    // 1. Kategoriya bo'yicha filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(r => r.category_id === currentCategory);
    }

    // 2. Qidiruv bo'yicha filter (nomi, manzili yoki taomlar nomi)
    if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(r => {
            const matchesName = r.name.toLowerCase().includes(q);
            const matchesAddress = r.address.toLowerCase().includes(q);
            const matchesCategory = r.category_name && r.category_name.toLowerCase().includes(q);
            const matchesFood = r.menu && r.menu.some(m => 
                m.name.toLowerCase().includes(q) || 
                (m.description && m.description.toLowerCase().includes(q))
            );
            return matchesName || matchesAddress || matchesCategory || matchesFood;
        });
    }

    // 3. Tezkor filtrlar (Quick filters)
    if (activeQuickFilters.rating45) {
        filtered = filtered.filter(r => r.rating >= 4.7);
    }
    if (activeQuickFilters.openNow) {
        filtered = filtered.filter(r => r.is_open);
    }
    if (activeQuickFilters.budget) {
        filtered = filtered.filter(r => r.price_level === '$');
    }
    if (activeQuickFilters.delivery) {
        filtered = filtered.filter(r => r.features && r.features.some(f => f.toLowerCase().includes('yetkaz')));
    }

    // Xaritadagi markyorlarni yangilash
    renderRestaurantMarkersOnMap(filtered, handleRestaurantSelected);

    // Ro'yxat ko'rinishidagi kartochkalarni yangilash
    renderRestaurantCards(filtered, handleRestaurantSelected);
}

/**
 * Kategoriya tugmasi bosilganda
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

    // Xaritada silliq yaqinlashtirish
    flyToLocation(found.lat, found.lng);

    // Xaritaning o'zida qisqacha ma'lumot oynasini (Balloon) ochish
    if (typeof openRestaurantBalloon === 'function') {
        openRestaurantBalloon(found.id);
    }

    // Bottom Sheet menyusini ochish
    openRestaurantSheet(found);
}

/**
 * Barcha hodisa tinglovchilari (Event Listeners)
 */
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const viewToggleBtn = document.getElementById('viewToggleBtn');
    const locateMeBtn = document.getElementById('locateMeBtn');
    const favoritesToggleBtn = document.getElementById('favoritesToggleBtn');
    const closeSheetBtn = document.getElementById('closeSheetBtn');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const sheetDragArea = document.getElementById('sheetDragArea');
    const listView = document.getElementById('listView');
    const sortSelect = document.getElementById('sortSelect');
    
    // Savat va modal tugmalari
    const floatingCartBar = document.getElementById('floatingCartBar');
    const closeCartModalBtn = document.getElementById('closeCartModalBtn');
    const confirmOrderBtn = document.getElementById('confirmOrderBtn');
    const closeFavoritesModalBtn = document.getElementById('closeFavoritesModalBtn');
    const closeOrderSuccessBtn = document.getElementById('closeOrderSuccessBtn');

    // 1. Qidiruv maydoni
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            if (clearSearchBtn) {
                clearSearchBtn.classList.toggle('hidden', searchQuery.length === 0);
            }
            applyFiltersAndRender();
        });
    }

    // 2. Qidiruvni tozalash
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            clearSearchBtn.classList.add('hidden');
            applyFiltersAndRender();
            searchInput.focus();
        });
    }

    // 3. Tezkor filter chiplari
    document.querySelectorAll('.filter-tag-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const filterKey = chip.getAttribute('data-filter');
            if (filterKey && activeQuickFilters.hasOwnProperty(filterKey)) {
                activeQuickFilters[filterKey] = !activeQuickFilters[filterKey];
                chip.classList.toggle('active', activeQuickFilters[filterKey]);
                applyFiltersAndRender();
            }
        });
    });

    // 4. Saralash dropdowni
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            sortRestaurantsList();
            applyFiltersAndRender();
        });
    }

    // 5. Xarita / Ro'yxat ko'rinishini almashtirish
    if (viewToggleBtn && listView) {
        viewToggleBtn.addEventListener('click', () => {
            isListView = !isListView;
            if (isListView) {
                listView.classList.remove('hidden');
                viewToggleBtn.innerHTML = '<i class="fa-solid fa-map-location-dot"></i>';
                viewToggleBtn.title = "Xaritaga o'tish";
            } else {
                listView.classList.add('hidden');
                viewToggleBtn.innerHTML = '<i class="fa-solid fa-list-ul"></i>';
                viewToggleBtn.title = "Ro'yxatga o'tish";
            }
        });
    }

    // 6. Mening joylashuvimga qaytish
    if (locateMeBtn) {
        locateMeBtn.addEventListener('click', () => {
            detectUserLocation(() => {
                updateRestaurantsWithDistances();
                applyFiltersAndRender();
            });
        });
    }

    // 7. Sevimlilar modali
    if (favoritesToggleBtn) {
        favoritesToggleBtn.addEventListener('click', () => {
            openFavoritesModal(allRestaurants, handleRestaurantSelected);
        });
    }
    if (closeFavoritesModalBtn) {
        closeFavoritesModalBtn.addEventListener('click', () => {
            const modal = document.getElementById('favoritesModal');
            if (modal) modal.classList.add('hidden');
        });
    }

    // 8. Savat va Buyurtma modali
    if (floatingCartBar) {
        floatingCartBar.addEventListener('click', openCartModal);
    }
    if (closeCartModalBtn) {
        closeCartModalBtn.addEventListener('click', closeCartModal);
    }
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener('click', checkoutOrder);
    }
    if (closeOrderSuccessBtn) {
        closeOrderSuccessBtn.addEventListener('click', () => {
            const successModal = document.getElementById('orderSuccessModal');
            if (successModal) successModal.classList.add('hidden');
        });
    }

    // 9. Bottom Sheet ni yopish
    if (closeSheetBtn) closeSheetBtn.addEventListener('click', closeRestaurantSheet);
    if (modalBackdrop) modalBackdrop.addEventListener('click', () => {
        closeRestaurantSheet();
        closeCartModal();
        const favModal = document.getElementById('favoritesModal');
        if (favModal) favModal.classList.add('hidden');
    });
    if (sheetDragArea) sheetDragArea.addEventListener('click', closeRestaurantSheet);

    // 10. Klaviatura tugmalari (Shortcuts)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeRestaurantSheet();
            closeCartModal();
            const favModal = document.getElementById('favoritesModal');
            if (favModal) favModal.classList.add('hidden');
            const successModal = document.getElementById('orderSuccessModal');
            if (successModal) successModal.classList.add('hidden');
        } else if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            if (searchInput) searchInput.focus();
        }
    });
}
