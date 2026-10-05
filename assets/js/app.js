/**
 * VOLTX Mobile Accessories - Core Application Logic
 * Interactive E-Commerce Experience with Modern UX
 */

// Global App State
const AppState = {
  products: PRODUCTS_DATA,
  cart: JSON.parse(localStorage.getItem('voltx_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('voltx_wishlist')) || [],
  currency: localStorage.getItem('voltx_currency') || 'USD',
  theme: localStorage.getItem('voltx_theme') || 'dark',
  activeCategory: 'all',
  activeDevice: null,
  activeBrand: null,
  searchQuery: '',
  maxPrice: 200,
  sortBy: 'featured',
  appliedCoupon: null,
  shippingMethod: 'standard',
  bundle: {
    case: BUNDLE_ITEMS.cases[0],
    charger: BUNDLE_ITEMS.chargers[0],
    protection: BUNDLE_ITEMS.protection[0],
    accessory: BUNDLE_ITEMS.accessories[0]
  }
};

// Currency Rates Relative to USD
const CURRENCY_CONFIG = {
  USD: { symbol: '$', rate: 1.0, format: (val) => `$${val.toFixed(2)}` },
  EUR: { symbol: '€', rate: 0.92, format: (val) => `€${val.toFixed(2)}` },
  GBP: { symbol: '£', rate: 0.79, format: (val) => `£${val.toFixed(2)}` },
  INR: { symbol: '₹', rate: 83.5, format: (val) => `₹${Math.round(val).toLocaleString()}` }
};

// Available Devices per Brand
const DEVICE_MAP = {
  Apple: [
    "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16",
    "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15",
    "iPhone 14 Series", "Apple Watch Ultra 2", "AirPods Pro 2"
  ],
  Samsung: [
    "Samsung Galaxy S25 Ultra", "Samsung Galaxy S25+", "Samsung Galaxy S25",
    "Samsung Galaxy S24 Ultra", "Samsung Galaxy Z Fold 6", "Samsung Galaxy Z Flip 6"
  ],
  Google: [
    "Google Pixel 9 Pro XL", "Google Pixel 9 Pro", "Google Pixel 9", "Google Pixel 8 Pro"
  ],
  OnePlus: [
    "OnePlus 13", "OnePlus 12", "OnePlus Open"
  ],
  Xiaomi: [
    "Xiaomi 15 Pro", "Xiaomi 14 Ultra"
  ]
};

// Promotional Coupons
const VALID_COUPONS = {
  'VOLT30': { discountPercent: 30, description: '30% Off Storewide' },
  'VIP15': { discountAmount: 15, description: '$15 Off VIP Welcome' },
  'FREESHIP': { freeShipping: true, description: 'Free Express Shipping' },
  'FIRST10': { discountPercent: 10, description: '10% Off First Order' }
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCurrency();
  initAnnouncementCountdown();
  initHeaderScroll();
  initDeviceFinder();
  initCategoryFilters();
  initPriceSlider();
  initSearchAutocomplete();
  initBundleBuilder();
  initCatalog();
  initReviews();
  initFAQ();
  initChatWidget();
  initEventListeners();
  updateCartUI();
  updateWishlistUI();
});

// ==========================================================================
// THEME & CURRENCY
// ==========================================================================
function initTheme() {
  document.documentElement.setAttribute('data-theme', AppState.theme);
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.innerHTML = AppState.theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    themeBtn.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', AppState.theme);
  localStorage.setItem('voltx_theme', AppState.theme);
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.innerHTML = AppState.theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
  showToast(AppState.theme === 'dark' ? '🌙 Dark Mode Activated' : '☀️ Light Mode Activated');
}

function initCurrency() {
  const currencySelect = document.getElementById('currency-selector');
  if (currencySelect) {
    currencySelect.value = AppState.currency;
    currencySelect.addEventListener('change', (e) => {
      AppState.currency = e.target.value;
      localStorage.setItem('voltx_currency', AppState.currency);
      renderCatalog();
      updateCartUI();
      renderBundleSummary();
      showToast(`Currency changed to ${AppState.currency}`);
    });
  }
}

function formatPrice(amountInUSD) {
  const conf = CURRENCY_CONFIG[AppState.currency] || CURRENCY_CONFIG.USD;
  const converted = amountInUSD * conf.rate;
  return conf.format(converted);
}

// Flash Sale Countdown Timer
function initAnnouncementCountdown() {
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  
  if (!hoursEl || !minsEl || !secsEl) return;
  
  let totalSeconds = 5 * 3600 + 42 * 60 + 19;
  
  setInterval(() => {
    if (totalSeconds <= 0) totalSeconds = 24 * 3600;
    totalSeconds--;
    
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ==========================================================================
// DEVICE MATCH FINDER
// ==========================================================================
function initDeviceFinder() {
  const brandSelect = document.getElementById('device-brand-select');
  const modelSelect = document.getElementById('device-model-select');
  const matchBtn = document.getElementById('device-match-btn');
  const activeDeviceBanner = document.getElementById('active-device-banner');
  const activeDeviceText = document.getElementById('active-device-text');
  const clearDeviceBtn = document.getElementById('clear-device-filter-btn');

  if (!brandSelect || !modelSelect) return;

  // Populate models when brand changes
  brandSelect.addEventListener('change', (e) => {
    const selectedBrand = e.target.value;
    modelSelect.innerHTML = '<option value="">-- Select Phone Model --</option>';
    
    if (selectedBrand && DEVICE_MAP[selectedBrand]) {
      modelSelect.disabled = false;
      DEVICE_MAP[selectedBrand].forEach(model => {
        const opt = document.createElement('option');
        opt.value = model;
        opt.textContent = model;
        modelSelect.appendChild(opt);
      });
    } else {
      modelSelect.disabled = true;
    }
  });

  if (matchBtn) {
    matchBtn.addEventListener('click', () => {
      const brand = brandSelect.value;
      const model = modelSelect.value;
      
      if (!brand || !model) {
        showToast('⚠️ Please select both brand and model');
        return;
      }

      AppState.activeBrand = brand;
      AppState.activeDevice = model;

      if (activeDeviceBanner && activeDeviceText) {
        activeDeviceBanner.classList.add('visible');
        activeDeviceText.innerHTML = `Showing accessories precision-fit for <strong>${model}</strong>`;
      }

      renderCatalog();
      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
      showToast(`🎯 Filtered accessories for ${model}`);
    });
  }

  if (clearDeviceBtn) {
    clearDeviceBtn.addEventListener('click', () => {
      AppState.activeBrand = null;
      AppState.activeDevice = null;
      brandSelect.value = '';
      modelSelect.innerHTML = '<option value="">-- Select Phone Model --</option>';
      modelSelect.disabled = true;
      activeDeviceBanner.classList.remove('visible');
      renderCatalog();
      showToast('Device filter cleared');
    });
  }
}

// ==========================================================================
// CATALOG RENDERING & FILTERING
// ==========================================================================
function initCategoryFilters() {
  const categoryPills = document.querySelectorAll('.category-pill-btn');
  categoryPills.forEach(btn => {
    btn.addEventListener('click', (e) => {
      categoryPills.forEach(p => p.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      AppState.activeCategory = target.getAttribute('data-category');
      renderCatalog();
    });
  });

  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = card.getAttribute('data-category');
      AppState.activeCategory = cat;
      
      // Update sidebar pill
      categoryPills.forEach(p => {
        if (p.getAttribute('data-category') === cat) p.classList.add('active');
        else p.classList.remove('active');
      });

      renderCatalog();
      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function initPriceSlider() {
  const slider = document.getElementById('price-range-slider');
  const maxLabel = document.getElementById('price-max-display');
  
  if (slider && maxLabel) {
    slider.addEventListener('input', (e) => {
      AppState.maxPrice = parseFloat(e.target.value);
      maxLabel.textContent = formatPrice(AppState.maxPrice);
      renderCatalog();
    });
  }

  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.sortBy = e.target.value;
      renderCatalog();
    });
  }

  const resetFiltersBtn = document.getElementById('filter-reset-all');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      AppState.activeCategory = 'all';
      AppState.activeDevice = null;
      AppState.activeBrand = null;
      AppState.maxPrice = 200;
      AppState.searchQuery = '';
      if (slider) slider.value = 200;
      if (maxLabel) maxLabel.textContent = formatPrice(200);
      document.querySelectorAll('.category-pill-btn').forEach(p => {
        if (p.getAttribute('data-category') === 'all') p.classList.add('active');
        else p.classList.remove('active');
      });
      document.getElementById('active-device-banner')?.classList.remove('visible');
      renderCatalog();
      showToast('All filters have been reset');
    });
  }
}

function initSearchAutocomplete() {
  const searchInput = document.getElementById('header-search-input');
  const searchClear = document.getElementById('header-search-clear');
  const dropdown = document.getElementById('search-results-dropdown');

  if (!searchInput || !dropdown) return;

  searchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();
    AppState.searchQuery = val;
    
    if (val.length > 0) {
      if (searchClear) searchClear.style.display = 'block';
      const matches = AppState.products.filter(p => 
        p.name.toLowerCase().includes(val) ||
        p.categoryName.toLowerCase().includes(val) ||
        p.description.toLowerCase().includes(val) ||
        p.features.some(f => f.toLowerCase().includes(val))
      );
      renderSearchDropdown(matches);
      dropdown.classList.add('active');
    } else {
      if (searchClear) searchClear.style.display = 'none';
      dropdown.classList.remove('active');
    }

    renderCatalog();
  });

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      AppState.searchQuery = '';
      searchClear.style.display = 'none';
      dropdown.classList.remove('active');
      renderCatalog();
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
}

function renderSearchDropdown(matches) {
  const dropdown = document.getElementById('search-results-dropdown');
  if (!dropdown) return;

  if (matches.length === 0) {
    dropdown.innerHTML = '<div style="padding:1.25rem; text-align:center; color:var(--text-muted);">No accessories found matching your search.</div>';
    return;
  }

  dropdown.innerHTML = matches.slice(0, 5).map(item => `
    <div class="search-result-item" onclick="openQuickView('${item.id}')">
      <img src="${item.image}" alt="${item.name}" class="search-result-img" />
      <div class="search-result-info">
        <div class="search-result-name">${item.name}</div>
        <div class="search-result-price">${formatPrice(item.price)}</div>
      </div>
      <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); addToCart('${item.id}')">
        <i class="fas fa-plus"></i> Add
      </button>
    </div>
  `).join('');
}

function initCatalog() {
  renderCatalog();
}

function renderCatalog() {
  const grid = document.getElementById('products-grid-container');
  const countEl = document.getElementById('catalog-results-count');
  if (!grid) return;

  let filtered = AppState.products.filter(item => {
    // Category filter
    if (AppState.activeCategory !== 'all' && item.category !== AppState.activeCategory) return false;
    
    // Price filter
    if (item.price > AppState.maxPrice) return false;

    // Device filter
    if (AppState.activeDevice) {
      const matchDevice = item.devices.some(d => d.toLowerCase().includes(AppState.activeDevice.toLowerCase()));
      const matchBrand = AppState.activeBrand && item.brandCompatibility.includes(AppState.activeBrand);
      if (!matchDevice && !matchBrand) return false;
    }

    // Search query
    if (AppState.searchQuery) {
      const query = AppState.searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      const matchFeat = item.features.some(f => f.toLowerCase().includes(query));
      if (!matchName && !matchDesc && !matchFeat) return false;
    }

    return true;
  });

  // Sorting
  if (AppState.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (AppState.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (AppState.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (AppState.sortBy === 'popular') {
    filtered.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  if (countEl) countEl.innerHTML = `Showing <strong>${filtered.length}</strong> of ${AppState.products.length} accessories`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 4rem 1rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
        <i class="fas fa-search" style="font-size:3rem; color:var(--accent-cyan); margin-bottom:1rem; opacity:0.6;"></i>
        <h3>No Accessories Match Your Filters</h3>
        <p style="color:var(--text-secondary); margin-bottom:1.5rem;">Try adjusting your price slider, clearing device filter, or picking another category.</p>
        <button class="btn btn-primary btn-sm" onclick="document.getElementById('filter-reset-all').click()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const isWishlisted = AppState.wishlist.includes(product.id);
    const badgeClass = product.badgeType === 'hot' ? 'badge-hot' : product.badgeType === 'sale' ? 'badge-sale' : 'badge-popular';
    
    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-badge-top">
          <span class="badge ${badgeClass}">${product.badge}</span>
        </div>
        
        <button class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${product.id}')" title="Save to Wishlist">
          <i class="${isWishlisted ? 'fas fa-heart' : 'far fa-heart'}"></i>
        </button>

        <div class="product-image-box" onclick="openQuickView('${product.id}')">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" />
          <button class="quick-view-overlay-btn"><i class="fas fa-eye"></i> Quick View</button>
        </div>

        <div class="product-card-body">
          <span class="product-category-tag">${product.categoryName}</span>
          <h3 class="product-title" onclick="openQuickView('${product.id}')">${product.name}</h3>
          
          <div class="product-rating">
            ${generateStarRating(product.rating)}
            <span class="rating-count">(${product.reviewCount})</span>
          </div>

          <div class="product-swatches">
            ${product.colors.map((c, i) => `
              <span class="swatch-dot ${i === 0 ? 'active' : ''}" 
                    style="background-color: ${c.hex}; border-color: ${i === 0 ? 'var(--accent-cyan)' : 'transparent'};" 
                    title="${c.name}"
                    onclick="selectProductColor(event, '${product.id}', '${c.name}')"></span>
            `).join('')}
          </div>

          <div class="product-footer">
            <div class="price-box">
              <span class="current-price">${formatPrice(product.price)}</span>
              ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>
            
            <button class="add-cart-btn" onclick="addToCart('${product.id}')">
              <i class="fas fa-shopping-bag"></i> Add
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let starsHtml = '';
  
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="fas fa-star"></i>';
  }
  if (hasHalf) {
    starsHtml += '<i class="fas fa-star-half-alt"></i>';
  }
  return starsHtml;
}

function selectProductColor(e, productId, colorName) {
  e.stopPropagation();
  const parent = e.target.parentElement;
  parent.querySelectorAll('.swatch-dot').forEach(dot => {
    dot.classList.remove('active');
    dot.style.borderColor = 'transparent';
  });
  e.target.classList.add('active');
  e.target.style.borderColor = 'var(--accent-cyan)';
  showToast(`Selected color: ${colorName}`);
}

// ==========================================================================
// INTERACTIVE BUNDLE BUILDER ("BUILD YOUR EDC KIT")
// ==========================================================================
function initBundleBuilder() {
  renderBundleSteps();
  renderBundleSummary();
}

function renderBundleSteps() {
  const container = document.getElementById('bundle-steps-container');
  if (!container) return;

  const steps = [
    { key: 'case', num: 1, title: '1. Select Case', items: BUNDLE_ITEMS.cases },
    { key: 'charger', num: 2, title: '2. Select Charger', items: BUNDLE_ITEMS.chargers },
    { key: 'protection', num: 3, title: '3. Screen Armor', items: BUNDLE_ITEMS.protection },
    { key: 'accessory', num: 4, title: '4. Essential Gear', items: BUNDLE_ITEMS.accessories }
  ];

  container.innerHTML = steps.map(step => `
    <div class="bundle-step-col">
      <div class="bundle-step-header">
        <span class="bundle-step-num">${step.num}</span>
        <h4 class="bundle-step-title">${step.title}</h4>
      </div>
      <div class="bundle-options-list">
        ${step.items.map(item => {
          const isSelected = AppState.bundle[step.key].id === item.id;
          return `
            <div class="bundle-option-card ${isSelected ? 'selected' : ''}" onclick="selectBundleItem('${step.key}', '${item.id}')">
              <img src="${item.img}" alt="${item.name}" class="bundle-opt-img" />
              <div class="bundle-opt-info">
                <div class="bundle-opt-name">${item.name}</div>
                <div class="bundle-opt-price">${formatPrice(item.price)}</div>
              </div>
              <i class="fas ${isSelected ? 'fa-check-circle text-cyan' : 'fa-circle'}" style="color:${isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)'}"></i>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');
}

function selectBundleItem(stepKey, itemId) {
  const pool = BUNDLE_ITEMS[stepKey === 'case' ? 'cases' : stepKey === 'charger' ? 'chargers' : stepKey === 'protection' ? 'protection' : 'accessories'];
  const found = pool.find(i => i.id === itemId);
  if (found) {
    AppState.bundle[stepKey] = found;
    renderBundleSteps();
    renderBundleSummary();
    showToast(`Updated Bundle: ${found.name}`);
  }
}

function renderBundleSummary() {
  const oldTotalEl = document.getElementById('bundle-original-price');
  const newTotalEl = document.getElementById('bundle-discounted-price');
  const savingsEl = document.getElementById('bundle-savings-amount');
  
  const originalTotal = Object.values(AppState.bundle).reduce((acc, item) => acc + item.price, 0);
  const bundleDiscount = originalTotal * 0.25; // 25% Off bundle discount
  const finalTotal = originalTotal - bundleDiscount;

  if (oldTotalEl) oldTotalEl.textContent = formatPrice(originalTotal);
  if (newTotalEl) newTotalEl.textContent = formatPrice(finalTotal);
  if (savingsEl) savingsEl.textContent = `Save 25% (${formatPrice(bundleDiscount)})`;
}

function addBundleToCart() {
  Object.values(AppState.bundle).forEach(item => {
    // Map bundle item to full product or create cart entry
    const fullProd = AppState.products.find(p => p.name.includes(item.name.slice(0, 10))) || {
      id: item.id,
      name: item.name,
      price: item.price * 0.75, // Apply the 25% bundle discount
      image: item.img,
      categoryName: 'Bundle Kit Item'
    };

    const existing = AppState.cart.find(c => c.id === fullProd.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      AppState.cart.push({
        id: fullProd.id,
        name: fullProd.name,
        price: fullProd.price * 0.75,
        image: item.img,
        quantity: 1,
        color: 'Included in Bundle'
      });
    }
  });

  saveCart();
  updateCartUI();
  openCartDrawer();
  showToast('🎉 Everyday Carry Bundle Added (-25% Discount Applied!)');
}

// ==========================================================================
// CART & DRAWER MANAGEMENT
// ==========================================================================
function addToCart(productId, quantity = 1, selectedColor = null) {
  const product = AppState.products.find(p => p.id === productId);
  if (!product) return;

  const color = selectedColor || product.colors[0]?.name || 'Standard';
  const existing = AppState.cart.find(item => item.id === productId && item.color === color);

  if (existing) {
    existing.quantity += quantity;
  } else {
    AppState.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: color,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
  openCartDrawer();
  showToast(`⚡ Added ${product.name} to bag!`);
}

function updateCartQty(index, change) {
  if (AppState.cart[index]) {
    AppState.cart[index].quantity += change;
    if (AppState.cart[index].quantity <= 0) {
      AppState.cart.splice(index, 1);
    }
    saveCart();
    updateCartUI();
  }
}

function removeCartItem(index) {
  if (AppState.cart[index]) {
    const item = AppState.cart[index];
    AppState.cart.splice(index, 1);
    saveCart();
    updateCartUI();
    showToast(`Removed ${item.name} from bag`);
  }
}

function saveCart() {
  localStorage.setItem('voltx_cart', JSON.stringify(AppState.cart));
}

function updateCartUI() {
  const cartBadge = document.getElementById('cart-count-badge');
  const cartBody = document.getElementById('cart-drawer-items');
  const subtotalEl = document.getElementById('cart-drawer-subtotal');
  const totalEl = document.getElementById('cart-drawer-total');
  const discountLine = document.getElementById('cart-drawer-discount-line');
  const discountAmountEl = document.getElementById('cart-drawer-discount-amount');
  const freeShipBar = document.getElementById('free-shipping-progress');
  const freeShipText = document.getElementById('free-shipping-text');

  const totalItems = AppState.cart.reduce((acc, item) => acc + item.quantity, 0);
  if (cartBadge) {
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
  }

  // Calculate Totals
  const subtotal = AppState.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Free Shipping Goal ($50 threshold)
  const shippingThreshold = 50.0;
  if (freeShipBar && freeShipText) {
    if (subtotal >= shippingThreshold) {
      freeShipBar.style.width = '100%';
      freeShipText.innerHTML = '🎉 You qualify for <strong>FREE Express Shipping!</strong>';
    } else {
      const remaining = shippingThreshold - subtotal;
      const pct = (subtotal / shippingThreshold) * 100;
      freeShipBar.style.width = `${pct}%`;
      freeShipText.innerHTML = `Add <strong>${formatPrice(remaining)}</strong> more to unlock <strong>FREE Shipping</strong>`;
    }
  }

  // Calculate Discounts
  let discountVal = 0;
  if (AppState.appliedCoupon) {
    const coupon = VALID_COUPONS[AppState.appliedCoupon];
    if (coupon.discountPercent) {
      discountVal = subtotal * (coupon.discountPercent / 100);
    } else if (coupon.discountAmount) {
      discountVal = Math.min(coupon.discountAmount, subtotal);
    }
  }

  const finalTotal = Math.max(0, subtotal - discountVal);

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (totalEl) totalEl.textContent = formatPrice(finalTotal);

  if (discountLine && discountAmountEl) {
    if (discountVal > 0) {
      discountLine.style.display = 'flex';
      discountAmountEl.textContent = `-${formatPrice(discountVal)}`;
    } else {
      discountLine.style.display = 'none';
    }
  }

  // Render items inside drawer
  if (!cartBody) return;

  if (AppState.cart.length === 0) {
    cartBody.innerHTML = `
      <div style="text-align:center; padding: 4rem 1rem; color:var(--text-muted);">
        <i class="fas fa-shopping-bag" style="font-size:3.5rem; opacity:0.4; margin-bottom:1rem;"></i>
        <h4>Your Shopping Bag is Empty</h4>
        <p style="font-size:0.85rem; margin-top:0.5rem;">Explore our high-performance MagSafe accessories and power gear.</p>
        <button class="btn btn-primary btn-sm" style="margin-top:1.5rem;" onclick="closeCartDrawer()">Continue Shopping</button>
      </div>
    `;
    return;
  }

  cartBody.innerHTML = AppState.cart.map((item, idx) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.2rem;">Color: ${item.color}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateCartQty(${idx}, -1)">-</button>
          <span class="qty-count">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartQty(${idx}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeCartItem(${idx})" title="Remove item">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');
}

function applyPromoCode() {
  const input = document.getElementById('cart-promo-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (!code) {
    showToast('⚠️ Please enter a coupon code');
    return;
  }

  if (VALID_COUPONS[code]) {
    AppState.appliedCoupon = code;
    updateCartUI();
    showToast(`🎉 Coupon "${code}" Applied: ${VALID_COUPONS[code].description}`);
  } else {
    showToast('❌ Invalid Promo Code. Try "VOLT30" or "VIP15"');
  }
}

// Drawers Toggle
function openCartDrawer() {
  document.getElementById('cart-drawer-backdrop')?.classList.add('active');
  document.getElementById('cart-drawer-panel')?.classList.add('active');
}

function closeCartDrawer() {
  document.getElementById('cart-drawer-backdrop')?.classList.remove('active');
  document.getElementById('cart-drawer-panel')?.classList.remove('active');
}

// ==========================================================================
// WISHLIST MANAGEMENT
// ==========================================================================
function toggleWishlist(productId) {
  const index = AppState.wishlist.indexOf(productId);
  if (index > -1) {
    AppState.wishlist.splice(index, 1);
    showToast('Removed from Wishlist');
  } else {
    AppState.wishlist.push(productId);
    showToast('❤️ Saved to Wishlist!');
  }
  localStorage.setItem('voltx_wishlist', JSON.stringify(AppState.wishlist));
  updateWishlistUI();
  renderCatalog();
}

function updateWishlistUI() {
  const badge = document.getElementById('wishlist-count-badge');
  const listContainer = document.getElementById('wishlist-drawer-items');
  
  if (badge) {
    badge.textContent = AppState.wishlist.length;
    badge.style.display = AppState.wishlist.length > 0 ? 'flex' : 'none';
  }

  if (!listContainer) return;

  if (AppState.wishlist.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align:center; padding: 4rem 1rem; color:var(--text-muted);">
        <i class="far fa-heart" style="font-size:3.5rem; opacity:0.4; margin-bottom:1rem;"></i>
        <h4>Your Wishlist is Empty</h4>
        <p style="font-size:0.85rem; margin-top:0.5rem;">Click the heart icon on any accessory to save it for later.</p>
      </div>
    `;
    return;
  }

  const wishlistedProds = AppState.products.filter(p => AppState.wishlist.includes(p.id));
  listContainer.innerHTML = wishlistedProds.map(prod => `
    <div class="cart-item">
      <img src="${prod.image}" alt="${prod.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <div class="cart-item-title">${prod.name}</div>
        <div class="cart-item-price">${formatPrice(prod.price)}</div>
      </div>
      <button class="btn btn-sm btn-primary" onclick="addToCart('${prod.id}')">
        <i class="fas fa-shopping-bag"></i> Move to Bag
      </button>
      <button class="cart-item-remove" onclick="toggleWishlist('${prod.id}')" title="Remove">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');
}

function openWishlistDrawer() {
  document.getElementById('wishlist-drawer-backdrop')?.classList.add('active');
  document.getElementById('wishlist-drawer-panel')?.classList.add('active');
}

function closeWishlistDrawer() {
  document.getElementById('wishlist-drawer-backdrop')?.classList.remove('active');
  document.getElementById('wishlist-drawer-panel')?.classList.remove('active');
}

// ==========================================================================
// QUICK VIEW MODAL
// ==========================================================================
function openQuickView(productId) {
  const product = AppState.products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quick-view-modal');
  const content = document.getElementById('quick-view-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="quick-view-grid">
      <div class="quick-view-media">
        <img src="${product.image}" alt="${product.name}" class="quick-view-img" id="qv-main-img" />
        <div style="display:flex; gap:0.5rem; margin-top:0.75rem;">
          ${(product.gallery || [product.image]).map(img => `
            <img src="${img}" style="width:60px; height:60px; object-fit:cover; border-radius:6px; border:1px solid var(--border-subtle); cursor:pointer;" 
                 onclick="document.getElementById('qv-main-img').src='${img}'" />
          `).join('')}
        </div>
      </div>
      <div class="quick-view-info">
        <span class="badge badge-cyan" style="margin-bottom:0.75rem;">${product.categoryName}</span>
        <h2>${product.name}</h2>
        <p style="color:var(--accent-cyan); font-weight:600; font-size:0.95rem; margin-bottom:0.75rem;">${product.tagline}</p>
        
        <div class="product-rating" style="margin-bottom:1rem;">
          ${generateStarRating(product.rating)}
          <span class="rating-count">(${product.reviewCount} verified reviews)</span>
        </div>

        <div class="price-box" style="margin-bottom:1.25rem;">
          <span class="current-price" style="font-size:1.8rem;">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="original-price" style="font-size:1.1rem;">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>

        <p style="color:var(--text-secondary); font-size:0.9rem; line-height:1.5; margin-bottom:1.25rem;">${product.description}</p>

        <div style="margin-bottom:1.25rem;">
          <label style="display:block; font-size:0.8rem; font-weight:700; text-transform:uppercase; color:var(--text-muted); margin-bottom:0.4rem;">Select Color Variant</label>
          <div class="product-swatches" id="qv-swatches">
            ${product.colors.map((c, i) => `
              <span class="swatch-dot ${i === 0 ? 'active' : ''}" 
                    style="background-color: ${c.hex}; border-color: ${i === 0 ? 'var(--accent-cyan)' : 'transparent'}; width:24px; height:24px;" 
                    title="${c.name}"
                    onclick="selectQvColor(event, '${c.name}')"></span>
            `).join('')}
          </div>
          <span id="qv-selected-color-label" style="font-size:0.8rem; color:var(--text-secondary);">Color: <strong>${product.colors[0]?.name}</strong></span>
        </div>

        <table class="quick-view-specs-table">
          ${Object.entries(product.specs).map(([key, val]) => `
            <tr>
              <td><strong>${key}:</strong></td>
              <td style="color:var(--text-primary);">${val}</td>
            </tr>
          `).join('')}
        </table>

        <div style="display:flex; gap:1rem; margin-top:1.5rem;">
          <button class="btn btn-primary" style="flex:1;" onclick="addToCart('${product.id}', 1, window.currentQvColor || '${product.colors[0]?.name}'); closeQuickView();">
            <i class="fas fa-shopping-bag"></i> Add to Bag
          </button>
          <button class="btn btn-secondary" onclick="toggleWishlist('${product.id}')">
            <i class="far fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function selectQvColor(e, colorName) {
  window.currentQvColor = colorName;
  const swatches = document.getElementById('qv-swatches');
  if (swatches) {
    swatches.querySelectorAll('.swatch-dot').forEach(dot => {
      dot.classList.remove('active');
      dot.style.borderColor = 'transparent';
    });
    e.target.classList.add('active');
    e.target.style.borderColor = 'var(--accent-cyan)';
  }
  const label = document.getElementById('qv-selected-color-label');
  if (label) label.innerHTML = `Color: <strong>${colorName}</strong>`;
}

function closeQuickView() {
  document.getElementById('quick-view-modal')?.classList.remove('active');
}

// ==========================================================================
// CHECKOUT MULTI-STEP FLOW
// ==========================================================================
function openCheckoutModal() {
  if (AppState.cart.length === 0) {
    showToast('⚠️ Your shopping bag is empty!');
    return;
  }
  closeCartDrawer();
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.add('active');
    setCheckoutStep(1);
    updateCheckoutOrderSummary();
  }
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal')?.classList.remove('active');
}

function setCheckoutStep(stepNumber) {
  document.querySelectorAll('.checkout-step-pane').forEach(pane => pane.style.display = 'none');
  document.querySelectorAll('.checkout-step').forEach((step, i) => {
    if (i + 1 < stepNumber) {
      step.classList.add('completed');
      step.classList.remove('active');
    } else if (i + 1 === stepNumber) {
      step.classList.add('active');
      step.classList.remove('completed');
    } else {
      step.classList.remove('active', 'completed');
    }
  });

  const activePane = document.getElementById(`checkout-step-${stepNumber}`);
  if (activePane) activePane.style.display = 'block';
}

function updateCheckoutOrderSummary() {
  const summaryBox = document.getElementById('checkout-order-items');
  const totalAmountEl = document.getElementById('checkout-final-total');
  if (!summaryBox) return;

  const subtotal = AppState.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let discount = 0;
  if (AppState.appliedCoupon) {
    const c = VALID_COUPONS[AppState.appliedCoupon];
    if (c.discountPercent) discount = subtotal * (c.discountPercent / 100);
    else if (c.discountAmount) discount = Math.min(c.discountAmount, subtotal);
  }
  const finalTotal = Math.max(0, subtotal - discount);

  summaryBox.innerHTML = AppState.cart.map(item => `
    <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.4rem;">
      <span>${item.name} (${item.quantity}x)</span>
      <span style="font-family:var(--font-mono); color:var(--accent-cyan);">${formatPrice(item.price * item.quantity)}</span>
    </div>
  `).join('');

  if (totalAmountEl) totalAmountEl.textContent = formatPrice(finalTotal);
}

function processOrderPayment(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('pay-order-submit-btn');
  if (submitBtn) {
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authorizing Payment...';
    submitBtn.disabled = true;
  }

  setTimeout(() => {
    // Generate simulated Order ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `VTX-${randomNum}`;
    
    // Store in localStorage
    const pastOrders = JSON.parse(localStorage.getItem('voltx_orders')) || [];
    pastOrders.unshift({
      id: orderId,
      date: new Date().toLocaleDateString(),
      items: [...AppState.cart],
      total: AppState.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    });
    localStorage.setItem('voltx_orders', JSON.stringify(pastOrders));

    // Clear Cart
    AppState.cart = [];
    saveCart();
    updateCartUI();

    // Show confirmation screen
    setCheckoutStep(4);
    const orderIdDisplay = document.getElementById('confirmed-order-id');
    if (orderIdDisplay) orderIdDisplay.textContent = orderId;

    if (submitBtn) {
      submitBtn.innerHTML = 'Complete Order';
      submitBtn.disabled = false;
    }

    showToast(`🎉 Order Placed Successfully! (${orderId})`);
  }, 1600);
}

// Live card preview formatting
function formatCardInput(input) {
  let val = input.value.replace(/\D/g, '');
  val = val.substring(0, 16);
  const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
  input.value = formatted;
  const previewNum = document.getElementById('card-preview-num');
  if (previewNum) previewNum.textContent = formatted || '•••• •••• •••• ••••';
}

function formatCardHolder(input) {
  const previewName = document.getElementById('card-preview-holder');
  if (previewName) previewName.textContent = input.value.toUpperCase() || 'YOUR NAME';
}

function formatCardExpiry(input) {
  let val = input.value.replace(/\D/g, '');
  if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
  input.value = val;
  const previewExp = document.getElementById('card-preview-exp');
  if (previewExp) previewExp.textContent = val || 'MM/YY';
}

// ==========================================================================
// ORDER TRACKING MODAL
// ==========================================================================
function openOrderTrackingModal(customOrderId = null) {
  const modal = document.getElementById('order-tracking-modal');
  const input = document.getElementById('tracking-order-input');
  if (modal) {
    modal.classList.add('active');
    if (customOrderId && input) {
      input.value = customOrderId;
      lookupOrderTracking();
    }
  }
}

function closeOrderTrackingModal() {
  document.getElementById('order-tracking-modal')?.classList.remove('active');
}

function lookupOrderTracking() {
  const input = document.getElementById('tracking-order-input');
  const resultCard = document.getElementById('tracking-result-box');
  const orderId = input?.value.trim() || 'VTX-98241';

  if (!resultCard) return;

  resultCard.style.display = 'block';
  resultCard.innerHTML = `
    <div style="background:var(--bg-secondary); border:1px solid var(--border-glow); border-radius:var(--radius-md); padding:1.5rem; margin-top:1.5rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <span style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Tracking Order</span>
          <h3 style="font-family:var(--font-mono); color:var(--accent-cyan);">${orderId}</h3>
        </div>
        <span class="badge badge-cyan"><i class="fas fa-truck-fast"></i> In Transit (Express)</span>
      </div>

      <div class="tracking-timeline">
        <div class="timeline-progress-bar" style="width: 65%;"></div>
        <div class="timeline-node completed">
          <div class="timeline-node-icon"><i class="fas fa-check"></i></div>
          <div class="timeline-node-label">Confirmed</div>
        </div>
        <div class="timeline-node completed">
          <div class="timeline-node-icon"><i class="fas fa-box"></i></div>
          <div class="timeline-node-label">Packed</div>
        </div>
        <div class="timeline-node active">
          <div class="timeline-node-icon"><i class="fas fa-plane"></i></div>
          <div class="timeline-node-label">In Flight</div>
        </div>
        <div class="timeline-node">
          <div class="timeline-node-icon"><i class="fas fa-home"></i></div>
          <div class="timeline-node-label">Delivered</div>
        </div>
      </div>

      <div style="background:var(--bg-card); border-radius:var(--radius-sm); padding:1rem; font-size:0.85rem;">
        <div style="margin-bottom:0.4rem; color:var(--text-primary);">📍 <strong>Latest Update:</strong> Arrived at Regional Air Sorting Hub (Customs Cleared)</div>
        <div style="color:var(--text-muted);">Estimated Delivery: <strong>Tomorrow by 4:00 PM</strong> (FedEx Priority Courier)</div>
      </div>
    </div>
  `;
}

// ==========================================================================
// CUSTOMER REVIEWS
// ==========================================================================
function initReviews() {
  const container = document.getElementById('reviews-grid-container');
  if (!container) return;

  container.innerHTML = REVIEWS_DATA.map(rev => `
    <div class="review-card">
      <div class="review-header">
        <img src="${rev.avatar}" alt="${rev.author}" class="reviewer-avatar" />
        <div>
          <div class="reviewer-name">
            ${rev.author}
            ${rev.verified ? '<i class="fas fa-check-circle verified-icon" title="Verified Buyer"></i>' : ''}
          </div>
          <div class="reviewer-device">${rev.device} • ${rev.date}</div>
        </div>
      </div>
      <div class="review-stars">${generateStarRating(rev.rating)}</div>
      <h4 class="review-title">"${rev.title}"</h4>
      <p class="review-comment">${rev.comment}</p>
    </div>
  `).join('');
}

// ==========================================================================
// FAQ ACCORDION
// ==========================================================================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(f => f.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ==========================================================================
// AI LIVE CHAT SUPPORT WIDGET
// ==========================================================================
const BOT_KNOWLEDGE = {
  "iphone 16": "All our MagSafe cases, 15W Qi2 charging stations, and camera lens protectors are 100% precision engineered for the entire iPhone 16 & 16 Pro Max lineup!",
  "gan": "GaN (Gallium Nitride) chargers produce 3x less heat, charge up to 5x faster, and are 50% smaller than traditional silicon wall bricks.",
  "shipping": "We offer FREE Express Shipping on all orders over $50. Standard delivery takes 2-4 business days worldwide.",
  "warranty": "Every VOLTX product comes with a 2-Year No-Hassle Replacement Warranty, plus lifetime protection on all screen guards!",
  "discount": "Use promo code 'VOLT30' in your cart for 30% off today, or 'VIP15' for $15 off!",
  "magsafe": "Our MagSafe gear utilizes aerospace N52 neodymium magnetic arrays with up to 1,500g holding force."
};

function initChatWidget() {
  const toggleBtn = document.getElementById('chat-widget-btn');
  const panel = document.getElementById('chat-panel');
  const closeBtn = document.getElementById('chat-close-btn');
  const sendBtn = document.getElementById('chat-send-btn');
  const input = document.getElementById('chat-input');

  if (toggleBtn && panel) {
    toggleBtn.addEventListener('click', () => panel.classList.toggle('active'));
  }
  if (closeBtn && panel) {
    closeBtn.addEventListener('click', () => panel.classList.remove('active'));
  }
  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => handleUserChatMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUserChatMessage();
    });
  }
}

function sendQuickChatMessage(text) {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = text;
    handleUserChatMessage();
  }
}

function handleUserChatMessage() {
  const input = document.getElementById('chat-input');
  const messagesBox = document.getElementById('chat-messages');
  if (!input || !messagesBox) return;

  const text = input.value.trim();
  if (!text) return;

  // Append user message
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'chat-msg user';
  userMsgEl.textContent = text;
  messagesBox.appendChild(userMsgEl);
  input.value = '';

  messagesBox.scrollTop = messagesBox.scrollHeight;

  // Bot response logic
  setTimeout(() => {
    let reply = "I'm your VOLTX Gear AI assistant. Ask me about MagSafe compatibility, fast charging speeds, warranties, or shipping!";
    const lower = text.toLowerCase();

    for (const [k, answer] of Object.entries(BOT_KNOWLEDGE)) {
      if (lower.includes(k)) {
        reply = answer;
        break;
      }
    }

    const botMsgEl = document.createElement('div');
    botMsgEl.className = 'chat-msg bot';
    botMsgEl.textContent = reply;
    messagesBox.appendChild(botMsgEl);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }, 600);
}

// ==========================================================================
// TOAST NOTIFICATION SYSTEM
// ==========================================================================
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-30px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// GLOBAL EVENT LISTENERS & MODAL HANDLERS
// ==========================================================================
function initEventListeners() {
  // VIP Signup Form
  const vipForm = document.getElementById('vip-signup-form');
  if (vipForm) {
    vipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('vip-email-input').value;
      if (email) {
        showToast('🎉 VIP Code "VIP15" activated! Enjoy $15 off.');
        document.getElementById('vip-email-input').value = '';
      }
    });
  }

  // Close modals when clicking backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      document.querySelector('.catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
