/**
 * Oqat — UI, Animatsiyalar va Interaktiv boshqaruv moduli (Ismoil mas'ul)
 * Vazifalari:
 * 1. Dark/Light mavzu almashtirgich
 * 2. Toast xabarnomalar tizimi
 * 3. Sevimlilar (Favorites) boshqaruvi
 * 4. Savat va Buyurtma (Cart & Order Checkout)
 * 5. Kategoriya, Restoran kartochkalari va Menyu modali renderi
 */

// Global holatlar
let userFavorites = JSON.parse(localStorage.getItem('oqat_favorites') || '[]');
let currentCart = {
    restaurantId: null,
    restaurantName: '',
    items: []
};
let currentSheetRestaurant = null;
let currentMenuCategoryFilter = 'all';

/**
 * Pul miqdorini chiroyli formatlash: 38 000 so'm
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
}

/**
 * Zamonaviy suzuvchi xabarnoma (Toast Notification)
 */
function showToast(message, type = 'info', iconClass = 'fa-solid fa-circle-info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-message ${type === 'success' ? 'toast-success' : ''}`;
    toast.innerHTML = `
        <i class="${iconClass} toast-icon"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-fadeout');
        setTimeout(() => toast.remove(), 350);
    }, 3000);
}

/**
 * --------------------------------------------------------------------------
 * MAVZU (DARK / LIGHT MODE)
 * --------------------------------------------------------------------------
 */
function initTheme() {
    const savedTheme = localStorage.getItem('oqat_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('oqat_theme', nextTheme);
    updateThemeIcon(nextTheme);

    showToast(
        nextTheme === 'dark' ? "Tungi rejim yoqildi" : "Kunduzgi rejim yoqildi",
        "info",
        nextTheme === 'dark' ? "fa-solid fa-moon" : "fa-solid fa-sun"
    );
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (!themeBtn) return;
    themeBtn.innerHTML = theme === 'dark' 
        ? '<i class="fa-solid fa-sun" style="color:var(--accent-gold);"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
}

/**
 * --------------------------------------------------------------------------
 * SEVIMLILAR (FAVORITES) TIZIMI
 * --------------------------------------------------------------------------
 */
function isFavorited(restId) {
    return userFavorites.includes(restId);
}

function toggleFavorite(restId, restName) {
    const index = userFavorites.indexOf(restId);
    let added = false;

    if (index > -1) {
        userFavorites.splice(index, 1);
        added = false;
        showToast(`"${restName || 'Restoran'}" sevimlilardan olindi`, "info", "fa-regular fa-heart");
    } else {
        userFavorites.push(restId);
        added = true;
        showToast(`"${restName || 'Restoran'}" saqlandi!`, "success", "fa-solid fa-heart");
    }

    localStorage.setItem('oqat_favorites', JSON.stringify(userFavorites));
    updateFavoritesBadge();

    // Sahifadagi barcha yurakchalar holatini yangilash
    document.querySelectorAll(`.card-favorite-btn[data-rest-id="${restId}"]`).forEach(btn => {
        btn.classList.toggle('favorited', added);
        btn.innerHTML = added ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
    });

    const sheetFavBtn = document.getElementById('sheetFavoriteBtn');
    if (sheetFavBtn && currentSheetRestaurant && currentSheetRestaurant.id === restId) {
        sheetFavBtn.innerHTML = added 
            ? '<i class="fa-solid fa-heart" style="color:#EF4444;"></i>' 
            : '<i class="fa-regular fa-heart"></i>';
    }

    return added;
}

function updateFavoritesBadge() {
    const badge = document.getElementById('favoritesBadge');
    if (!badge) return;

    if (userFavorites.length > 0) {
        badge.innerText = userFavorites.length;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function openFavoritesModal(allRestaurants, onCardClick) {
    const modal = document.getElementById('favoritesModal');
    const body = document.getElementById('favoritesModalBody');
    if (!modal || !body) return;

    const favRestaurants = allRestaurants.filter(r => userFavorites.includes(r.id));

    if (favRestaurants.length === 0) {
        body.innerHTML = `
            <div style="text-align:center; padding: 40px 10px; color: var(--text-muted);">
                <i class="fa-regular fa-heart" style="font-size: 40px; margin-bottom: 12px; color: var(--text-muted); opacity: 0.5;"></i>
                <h4 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Hozircha saqlangan joylar yo'q</h4>
                <p style="font-size: 13px;">O'zingizga yoqqan restoranlarni yurakcha orqali saqlab qo'ying.</p>
            </div>
        `;
    } else {
        body.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:12px;">
                ${favRestaurants.map(rest => `
                    <div class="dish-card" style="cursor:pointer;" onclick="handleSelectFromFav(${rest.id})">
                        <div class="dish-media" style="width:70px; height:70px;">
                            <img src="${rest.photo}" alt="${rest.name}">
                        </div>
                        <div class="dish-info-col">
                            <div>
                                <h4 style="font-size:15px; font-weight:800; color:var(--text-primary);">${rest.name}</h4>
                                <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">⭐ ${rest.rating} • ${rest.category_name}</p>
                            </div>
                            <span style="font-size:12px; font-weight:700; color:var(--primary);">Ko'rish →</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    modal.classList.remove('hidden');

    window.handleSelectFromFav = (id) => {
        modal.classList.add('hidden');
        if (onCardClick) onCardClick(id);
    };
}

/**
 * --------------------------------------------------------------------------
 * SAVAT (CART) VA BUYURTMA SIMULYATORI
 * --------------------------------------------------------------------------
 */
function addToCart(dish, restaurant) {
    // Agar boshqa restorandan bo'lsa, savatni yangilaymiz
    if (currentCart.restaurantId && currentCart.restaurantId !== restaurant.id) {
        if (!confirm(`Savatda "${currentCart.restaurantName}" taomlari bor. Savatni tozalab, "${restaurant.name}" dan yangi buyurtma boshlaysizmi?`)) {
            return;
        }
        currentCart.items = [];
    }

    currentCart.restaurantId = restaurant.id;
    currentCart.restaurantName = restaurant.name;

    const existingItem = currentCart.items.find(i => i.id === dish.id);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        currentCart.items.push({
            id: dish.id,
            name: dish.name,
            price: dish.price,
            photo: dish.photo,
            qty: 1
        });
    }

    updateFloatingCartBar();
    showToast(`"${dish.name}" savatga qo'shildi`, "success", "fa-solid fa-basket-shopping");
}

function updateCartQty(dishId, delta) {
    const itemIndex = currentCart.items.findIndex(i => i.id === dishId);
    if (itemIndex === -1) return;

    currentCart.items[itemIndex].qty += delta;
    if (currentCart.items[itemIndex].qty <= 0) {
        currentCart.items.splice(itemIndex, 1);
    }

    if (currentCart.items.length === 0) {
        currentCart.restaurantId = null;
        currentCart.restaurantName = '';
        closeCartModal();
    }

    updateFloatingCartBar();
    renderCartModalBody();
}

function updateFloatingCartBar() {
    const cartBar = document.getElementById('floatingCartBar');
    const countText = document.getElementById('cartCountText');
    const totalText = document.getElementById('cartTotalText');
    if (!cartBar) return;

    const totalQty = currentCart.items.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = currentCart.items.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (totalQty > 0) {
        countText.innerText = `${totalQty} ta taom (${currentCart.restaurantName})`;
        totalText.innerText = formatCurrency(totalPrice);
        cartBar.classList.remove('hidden');
    } else {
        cartBar.classList.add('hidden');
    }
}

function openCartModal() {
    const modal = document.getElementById('cartModal');
    if (!modal || currentCart.items.length === 0) return;

    renderCartModalBody();
    modal.classList.remove('hidden');
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) modal.classList.add('hidden');
}

function renderCartModalBody() {
    const container = document.getElementById('cartItemsListContainer');
    const restInfo = document.getElementById('cartModalRestaurantInfo');
    const finalPrice = document.getElementById('cartModalFinalPrice');
    if (!container) return;

    if (restInfo) {
        restInfo.innerText = `🏪 Restoran: ${currentCart.restaurantName}`;
    }

    const totalPrice = currentCart.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if (finalPrice) {
        finalPrice.innerText = formatCurrency(totalPrice);
    }

    if (currentCart.items.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:20px;">Savat bo'sh</p>`;
        return;
    }

    container.innerHTML = currentCart.items.map(item => `
        <div class="cart-row">
            <div class="cart-row-info">
                <div class="cart-row-name">${item.name}</div>
                <div class="cart-row-price">${formatCurrency(item.price)}</div>
            </div>
            <div class="cart-qty-controls">
                <button class="cart-qty-btn" onclick="updateCartQty(${item.id}, -1)">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <span class="cart-qty-num">${item.qty}</span>
                <button class="cart-qty-btn" onclick="updateCartQty(${item.id}, 1)">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function checkoutOrder() {
    closeCartModal();

    // Muvaffaqiyatli buyurtma modali
    const successModal = document.getElementById('orderSuccessModal');
    if (successModal) {
        successModal.classList.remove('hidden');
    }

    // Savatni tozalash
    currentCart = {
        restaurantId: null,
        restaurantName: '',
        items: []
    };
    updateFloatingCartBar();

    showToast("Buyurtmangiz qabul qilindi!", "success", "fa-solid fa-circle-check");
}

/**
 * --------------------------------------------------------------------------
 * KATEGORIYALAR RENDERI
 * --------------------------------------------------------------------------
 */
function renderCategories(categories, activeCatId, onSelectCategory) {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;

    container.innerHTML = categories.map(cat => `
        <button class="category-pill ${cat.id === activeCatId ? 'active' : ''}" data-cat-id="${cat.id}">
            <i class="${cat.icon}"></i>
            <span>${cat.name}</span>
        </button>
    `).join('');

    container.querySelectorAll('.category-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            const catId = btn.getAttribute('data-cat-id');
            const parsedId = catId === 'all' ? 'all' : parseInt(catId, 10);
            onSelectCategory(parsedId);
        });
    });
}

/**
 * --------------------------------------------------------------------------
 * RESTORAN KARTOCHKALARI RENDERI (LIST VIEW)
 * --------------------------------------------------------------------------
 */
function renderRestaurantCards(restaurants, onCardClick) {
    const container = document.getElementById('restaurantCardsContainer');
    const title = document.getElementById('nearbyCountTitle');
    if (!container) return;

    if (title) {
        title.innerText = `Yaqin ovqatlanish maskanlari (${restaurants.length} ta)`;
    }

    if (restaurants.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 50px 20px; color: var(--text-muted);">
                <i class="fa-solid fa-utensils" style="font-size: 42px; margin-bottom: 14px; opacity: 0.4;"></i>
                <h4 style="font-size: 17px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Hech qanday ovqatlanish joyi topilmadi</h4>
                <p style="font-size: 13px;">Qidiruv so'zini yoki tanlangan kategoriyani o'zgartirib ko'ring.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = restaurants.map((rest, index) => {
        const favorited = isFavorited(rest.id);
        const featuresHtml = (rest.features || []).slice(0, 3).map(f => 
            `<span class="card-feature-tag">${f}</span>`
        ).join('');

        return `
            <div class="restaurant-card" data-rest-id="${rest.id}" style="animation-delay: ${index * 45}ms">
                <div class="card-media-box">
                    <img src="${rest.photo}" alt="${rest.name}" loading="lazy">
                    <div class="card-media-gradient"></div>
                    
                    <div class="card-status-badge">
                        ${rest.is_open ? 'Ochiq' : 'Yopiq'}
                    </div>

                    <button class="card-favorite-btn ${favorited ? 'favorited' : ''}" data-rest-id="${rest.id}" title="Sevimlilarga qo'shish">
                        <i class="${favorited ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>

                    <div class="card-rating-pill">
                        <i class="fa-solid fa-star"></i>
                        <span>${rest.rating}</span>
                    </div>

                    <div class="card-delivery-time">
                        <i class="fa-solid fa-clock"></i>
                        <span>${rest.delivery_time || '20-30 daqiqa'}</span>
                    </div>
                </div>

                <div class="card-details-box">
                    <span class="card-category-text">${rest.category_name || 'Milliy'}</span>
                    <h4 class="card-heading">${rest.name}</h4>
                    
                    <div class="card-meta-row">
                        <div class="card-meta-item">
                            <i class="fa-solid fa-person-walking"></i>
                            <span>${rest.formattedDistance || 'Yaqin'}</span>
                        </div>
                        <span>•</span>
                        <div class="card-meta-item">
                            <i class="fa-solid fa-location-dot"></i>
                            <span>${rest.address.split(',')[0]}</span>
                        </div>
                    </div>

                    <div class="card-tags-row">
                        ${featuresHtml}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Bosish hodisalari
    container.querySelectorAll('.restaurant-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Agar fav tugmasi bosilgan bo'lsa, kartochka ochilmaydi
            if (e.target.closest('.card-favorite-btn')) return;

            const restId = parseInt(card.getAttribute('data-rest-id'), 10);
            onCardClick(restId);
        });
    });

    // Yurakcha (Sevimlilar) bosilganda
    container.querySelectorAll('.card-favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const restId = parseInt(btn.getAttribute('data-rest-id'), 10);
            const found = restaurants.find(r => r.id === restId);
            toggleFavorite(restId, found ? found.name : '');
        });
    });
}

/**
 * --------------------------------------------------------------------------
 * BOTTOM SHEET VA MENYU KO'RINISHI
 * --------------------------------------------------------------------------
 */
function openRestaurantSheet(restaurant) {
    if (!restaurant) return;
    currentSheetRestaurant = restaurant;
    currentMenuCategoryFilter = 'all';

    const sheet = document.getElementById('menuBottomSheet');
    const backdrop = document.getElementById('modalBackdrop');

    // Asosiy ma'lumotlar
    document.getElementById('sheetRestPhoto').src = restaurant.photo;
    document.getElementById('sheetRestName').innerText = restaurant.name;
    document.getElementById('sheetRestCategory').innerText = restaurant.category_name || 'Restoran';
    document.getElementById('sheetRestAddress').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${restaurant.address}`;
    document.getElementById('sheetRestRating').innerText = restaurant.rating;
    document.getElementById('sheetRestReviews').innerText = `${restaurant.reviews_count || 120}+ sharh`;
    document.getElementById('sheetRestDistance').innerText = restaurant.formattedDistance || '350 m';
    document.getElementById('sheetRestDeliveryTime').innerText = restaurant.delivery_time || '25 daqiqa';
    document.getElementById('sheetRestPriceLevel').innerText = restaurant.price_level || '$$';
    document.getElementById('sheetRestStatusText').innerText = restaurant.is_open ? 'Hozir ochiq' : 'Yopiq';
    document.getElementById('sheetRestPhoneLink').href = `tel:${restaurant.phone.replace(/[^0-9+]/g, '')}`;

    // Sevimlilar holati
    const favBtn = document.getElementById('sheetFavoriteBtn');
    if (favBtn) {
        const isFav = isFavorited(restaurant.id);
        favBtn.innerHTML = isFav 
            ? '<i class="fa-solid fa-heart" style="color:#EF4444;"></i>' 
            : '<i class="fa-regular fa-heart"></i>';
        favBtn.onclick = () => toggleFavorite(restaurant.id, restaurant.name);
    }

    // Marshrut tugmasi (Yandex Maps navigatsiya havolasi)
    const routeBtn = document.getElementById('sheetRestRouteBtn');
    if (routeBtn) {
        routeBtn.onclick = () => {
            const url = `https://yandex.uz/maps/?rtext=~${restaurant.lat},${restaurant.lng}&rtt=auto`;
            window.open(url, '_blank');
        };
    }

    // Ulashish (Share) tugmasi
    const shareBtn = document.getElementById('sheetRestShareBtn');
    if (shareBtn) {
        shareBtn.onclick = () => {
            if (navigator.share) {
                navigator.share({
                    title: restaurant.name,
                    text: `${restaurant.name} ovqatlanish maskani menyusi va manzili`,
                    url: window.location.href
                }).catch(() => {});
            } else {
                navigator.clipboard.writeText(window.location.href);
                showToast("Havola nusxalandi!", "success", "fa-solid fa-copy");
            }
        };
    }

    // Menyu tablarini sozlash va taomlarni render qilish
    setupMenuCategoryTabs(restaurant.menu || []);
    renderSheetDishes(restaurant.menu || []);

    // Oynani ko'rsatish
    sheet.classList.remove('collapsed');
    backdrop.classList.remove('hidden');
}

function setupMenuCategoryTabs(menu) {
    const tabs = document.querySelectorAll('.sheet-menu-tabs-row .menu-tab-btn');
    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-tab') === currentMenuCategoryFilter);
        tab.onclick = () => {
            currentMenuCategoryFilter = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.toggle('active', t === tab));
            renderSheetDishes(menu);
        };
    });
}

function renderSheetDishes(menu) {
    const container = document.getElementById('sheetMenuItemsContainer');
    const countBadge = document.getElementById('sheetMenuCount');
    if (!container) return;

    let filteredMenu = menu;
    if (currentMenuCategoryFilter !== 'all') {
        filteredMenu = menu.filter(item => item.category === currentMenuCategoryFilter);
    }

    countBadge.innerText = `${filteredMenu.length} ta taom`;

    if (filteredMenu.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 28px 10px; color: var(--text-muted);">
                <i class="fa-solid fa-plate-wheat" style="font-size:32px; opacity:0.4; margin-bottom:8px;"></i>
                <p style="font-size:13px;">Ushbu toifada taomlar mavjud emas.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredMenu.map(dish => `
        <div class="dish-card">
            <div class="dish-media">
                <img src="${dish.photo}" alt="${dish.name}" loading="lazy">
                ${dish.is_popular ? `<span class="dish-popular-tag">⭐ Mashhur</span>` : ''}
            </div>
            <div class="dish-info-col">
                <div>
                    <h5 class="dish-name-heading">${dish.name}</h5>
                    <p class="dish-desc-text">${dish.description || ''}</p>
                </div>
                <div class="dish-bottom-bar">
                    <span class="dish-price-text">${formatCurrency(dish.price)}</span>
                    <button class="add-dish-btn" onclick="handleAddDishToCart(${dish.id})">
                        <i class="fa-solid fa-plus"></i> Qo'shish
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    window.handleAddDishToCart = (dishId) => {
        const foundDish = (currentSheetRestaurant.menu || []).find(d => d.id === dishId);
        if (foundDish && currentSheetRestaurant) {
            addToCart(foundDish, currentSheetRestaurant);
        }
    };
}

function closeRestaurantSheet() {
    const sheet = document.getElementById('menuBottomSheet');
    const backdrop = document.getElementById('modalBackdrop');
    if (sheet) sheet.classList.add('collapsed');
    if (backdrop) backdrop.classList.add('hidden');
    currentSheetRestaurant = null;
}
