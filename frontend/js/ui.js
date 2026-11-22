/**
 * Oqat — UI va Responsive boshqaruv moduli (Ismoil mas'ul)
 * Vazifalari:
 * 1. Kategoriya tugmachalarini chizish va faollashtirish
 * 2. Restoran kartochkalarini ro'yxatda (List View) ko'rsatish
 * 3. Menyu oynasini (Bottom-sheet modal) ochish va yopish
 * 4. Narxlarni chiroyli formatlash (so'm)
 */

// Narxni "35 000 so'm" formatida chiqarish
function formatCurrency(amount) {
    return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
}

/**
 * Kategoriya chiplarini chiqarish
 */
function renderCategories(categories, activeCatId, onSelectCategory) {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;

    container.innerHTML = categories.map(cat => `
        <button class="cat-chip ${cat.id === activeCatId ? 'active' : ''}" data-cat-id="${cat.id}">
            <i class="${cat.icon}"></i>
            <span>${cat.name}</span>
        </button>
    `).join('');

    // Bosish hodisalarini ulash
    container.querySelectorAll('.cat-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            const catId = btn.getAttribute('data-cat-id');
            const parsedId = catId === 'all' ? 'all' : parseInt(catId, 10);
            onSelectCategory(parsedId);
        });
    });
}

/**
 * Ro'yxat ko'rinishidagi restoran kartochkalarini chiqarish
 */
function renderRestaurantCards(restaurants, onCardClick) {
    const container = document.getElementById('restaurantCardsContainer');
    const title = document.getElementById('nearbyCountTitle');
    if (!container) return;

    if (title) {
        title.innerText = `Yaqin ovqatlanish joylari (${restaurants.length} ta)`;
    }

    if (restaurants.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: #718096;">
                <i class="fa-solid fa-utensils" style="font-size: 36px; margin-bottom: 10px; color: #cbd5e0;"></i>
                <p>Hech qanday ovqatlanish joyi topilmadi.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = restaurants.map(rest => `
        <div class="rest-card" data-rest-id="${rest.id}">
            <div class="card-img-wrapper">
                <img src="${rest.photo}" alt="${rest.name}" loading="lazy">
                <div class="card-rating-badge">
                    <i class="fa-solid fa-star star-icon"></i>
                    <span>${rest.rating}</span>
                </div>
            </div>
            <div class="card-content">
                <span class="card-category">${rest.category_name || 'Milliy'}</span>
                <h4 class="card-title">${rest.name}</h4>
                <div class="card-meta">
                    <span><i class="fa-solid fa-person-walking"></i> ${rest.formattedDistance || 'Yaqin'}</span>
                    <span>•</span>
                    <span><i class="fa-solid fa-location-dot"></i> ${rest.address.split(',')[0]}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Har bir kartochkaga bosish hodisasi
    container.querySelectorAll('.rest-card').forEach(card => {
        card.addEventListener('click', () => {
            const restId = parseInt(card.getAttribute('data-rest-id'), 10);
            onCardClick(restId);
        });
    });
}

/**
 * Tanlangan restoran menyusi va ma'lumotlarini Bottom Sheet ga yuklash
 */
function openRestaurantSheet(restaurant) {
    if (!restaurant) return;

    const sheet = document.getElementById('menuBottomSheet');
    const backdrop = document.getElementById('modalBackdrop');

    // Elementlarni to'ldirish
    document.getElementById('sheetRestPhoto').src = restaurant.photo;
    document.getElementById('sheetRestName').innerText = restaurant.name;
    document.getElementById('sheetRestCategory').innerText = restaurant.category_name || 'Restoran';
    document.getElementById('sheetRestAddress').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${restaurant.address}`;
    document.getElementById('sheetRestRating').innerText = restaurant.rating;
    document.getElementById('sheetRestDistance').innerText = restaurant.formattedDistance || 'Yaqin';
    document.getElementById('sheetRestPhoneLink').href = `tel:${restaurant.phone.replace(/[^0-9+]/g, '')}`;

    // Taomlar ro'yxatini to'ldirish
    const menuContainer = document.getElementById('sheetMenuItemsContainer');
    const countBadge = document.getElementById('sheetMenuCount');

    const menu = restaurant.menu || [];
    countBadge.innerText = `${menu.length} ta taom`;

    if (menu.length === 0) {
        menuContainer.innerHTML = `<p style="text-align:center; padding: 20px; color:#A0AEC0;">Menyu ma'lumotlari kiritilmagan.</p>`;
    } else {
        menuContainer.innerHTML = menu.map(item => `
            <div class="menu-item-card">
                <img class="menu-item-img" src="${item.photo}" alt="${item.name}" loading="lazy">
                <div class="menu-item-info">
                    <div>
                        <h5 class="menu-item-name">${item.name}</h5>
                        <p class="menu-item-desc">${item.description || ''}</p>
                    </div>
                    <div class="menu-item-bottom">
                        <span class="menu-item-price">${formatCurrency(item.price)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Modalni ko'rsatish
    sheet.classList.remove('collapsed');
    backdrop.classList.remove('hidden');
}

/**
 * Bottom Sheet ni yopish
 */
function closeRestaurantSheet() {
    const sheet = document.getElementById('menuBottomSheet');
    const backdrop = document.getElementById('modalBackdrop');
    if (sheet) sheet.classList.add('collapsed');
    if (backdrop) backdrop.classList.add('hidden');
}
