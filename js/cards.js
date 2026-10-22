const container = document.querySelector('.products-container');

function renderProducts(products) {
  const cardsHTML = products.map(product => {

    const oldPriceHTML = product.oldPrice
      ? `<span class="card-old-price">${product.oldPrice} ₴</span>`
      : '';

    let badgeHTML = '';
    if (product.oldPrice) {
      badgeHTML = `<span class="card-badge badge-sale">Знижка</span>`;
    } else if (!product.inStock) {
      badgeHTML = `<span class="card-badge badge-out">Немає в наявності</span>`;
    }

    const buttonHTML = product.inStock
      ? `<button class="cart-btn">У кошик</button>`
      : `<button class="cart-btn disabled" disabled>Немає в наявності</button>`;

    return `
      <div class="product-card ${!product.inStock ? 'out-of-stock' : ''}" data-id="${product.id}">
        <div class="card-image-box">
          ${badgeHTML}
          <img src="${product.art}" alt="${product.name}" class="card-img">
        </div>
        
        <div class="card-content">
          <span class="card-category">${product.category}</span>
          <h3 class="card-title">${product.name}</h3>
          
          <div class="card-price-box">
            <span class="card-price">${product.price} ₴</span>
            ${oldPriceHTML}
          </div>
          
          ${buttonHTML}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = cardsHTML;
}

renderProducts(PRODUCTS);

container.addEventListener('click', (event) => {
  const card = event.target.closest('.product-card');
  if (!card) return;

  const productId = Number(card.dataset.id);
  const product = PRODUCTS.find(p => p.id === productId);

  if (product) {
    openProductModal(product);
  }
});

function openProductModal(product) {
  if (searchInput) {
    searchInput.value = '';
    searchDropdown.classList.add('hidden');
    searchDropdown.innerHTML = '';
  }

  const modalOldPriceHTML = product.oldPrice
    ? `<span class="modal-old-price">${product.oldPrice} ₴</span>`
    : '';

  let modalBadgeHTML = '';
  if (product.oldPrice) {
    modalBadgeHTML = `<span class="modal-badge badge-sale">Знижка</span>`;
  } else if (!product.inStock) {
    modalBadgeHTML = `<span class="modal-badge badge-out">Немає в наявності</span>`;
  }

  const sizesHTML = product.sizes
    ? product.sizes.map((size, index) => `
        <button class="size-btn ${index === 0 ? 'active' : ''}">${size}</button>
      `).join('')
    : '';

  const stockText = product.inStock ? 'Є в наявності' : 'Немає в наявності';
  const stockClass = product.inStock ? 'in-stock' : 'out-of-stock';


  const submitButtonHTML = product.inStock
    ? `<button class="modal-submit-btn">Додати кошик</button>`
    : '';

  let modalContainer = document.getElementById('productModal');

  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'productModal';
    modalContainer.className = 'modal-overlay';
    document.body.appendChild(modalContainer);
  }

  modalContainer.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      
      <div class="modal-image-box">
        ${modalBadgeHTML}
        <img src="${product.art}" alt="${product.name}" class="modal-img">
      </div>
      
      <div class="modal-info">
        <span class="modal-brand-category">${product.brand} - ${product.category}</span>
        <h2 class="modal-title">${product.name}</h2>
        
        <div class="modal-price-box">
          <span class="modal-price">${product.price} ₴</span>
          ${modalOldPriceHTML}
        </div>
        
        <p class="modal-description">${product.description}</p>
        
        <div class="modal-sizes-section">
          <span class="modal-sizes-label">Розмір</span>
          <div class="modal-sizes-list">${sizesHTML}</div>
        </div>

        <div class="modal-quantity-section">
          <span class="modal-quantity-label">Кількість</span>
          <div class="quantity-control">
            <button class="qty-btn minus">-</button>
            <span class="qty-value">1</span>
            <button class="qty-btn plus">+</button>
          </div>
        </div>
        
        <div class="modal-stock ${stockClass}">${stockText}</div>
        
        ${submitButtonHTML}
      </div>
    </div>
  `;

  modalContainer.classList.remove('hidden');

  const minusBtn = modalContainer.querySelector('.qty-btn.minus');
  const plusBtn = modalContainer.querySelector('.qty-btn.plus');
  const qtyValue = modalContainer.querySelector('.qty-value');

  if (minusBtn && plusBtn && qtyValue) {
    let currentQty = 1;
    minusBtn.addEventListener('click', () => {
      if (currentQty > 1) { currentQty--; qtyValue.textContent = currentQty; }
    });
    plusBtn.addEventListener('click', () => {
      currentQty++; qtyValue.textContent = currentQty;
    });
  }

  const closeBtn = modalContainer.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => modalContainer.classList.add('hidden'));
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) modalContainer.classList.add('hidden');
  });
}

const availableProducts = PRODUCTS.filter(product => product.inStock);

renderProducts(availableProducts);

renderProducts(PRODUCTS);

const toggleCheckbox = document.getElementById('toggle');

toggleCheckbox.addEventListener('change', () => {
  const productsToRender = toggleCheckbox.checked
    ? PRODUCTS.filter(product => product.inStock)
    : PRODUCTS;

  renderProducts(productsToRender);
});

const sortSelect = document.getElementById('sortSelect');

function updateProducts() {
  let currentProducts = [...PRODUCTS];

  if (toggleCheckbox.checked) {
    currentProducts = currentProducts.filter(product => product.inStock);
  }

  const sortValue = sortSelect.value;
  if (sortValue === '1') {
    currentProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === '2') {
    currentProducts.sort((a, b) => b.price - a.price);
  } else {
    currentProducts.sort((a, b) => a.id - b.id);
  }

  renderProducts(currentProducts);
}

toggleCheckbox.addEventListener('change', updateProducts);
sortSelect.addEventListener('change', updateProducts);

const buttons = document.querySelectorAll('.catalog-btn-div button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');
  });
});



const categoryButtons = document.querySelectorAll('.catalog-btn-div button');

let currentCategory = 'Усе';

function updateProducts() {
  let currentProducts = [...PRODUCTS];

  if (currentCategory !== 'Усе') {
    currentProducts = currentProducts.filter(product => product.category === currentCategory);
  }

  if (toggleCheckbox.checked) {
    currentProducts = currentProducts.filter(product => product.inStock);
  }

  const sortValue = sortSelect.value;
  if (sortValue === '1') {
    currentProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === '2') {
    currentProducts.sort((a, b) => b.price - a.price);
  } else {
    currentProducts.sort((a, b) => a.id - b.id);
  }

  renderProducts(currentProducts);
}

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    currentCategory = button.getAttribute('data-category') || button.textContent.trim();

    updateProducts();
  });
});

toggleCheckbox.addEventListener('change', updateProducts);
sortSelect.addEventListener('change', updateProducts);

const searchInput = document.getElementById('searchInput');
const searchDropdown = document.getElementById('searchDropdown');

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();

  if (query === '') {
    searchDropdown.classList.add('hidden');
    searchDropdown.innerHTML = '';
    return;
  }

  const searchWords = query.split(/\s+/);
  const matchedProducts = PRODUCTS.filter(product => {
    const productName = product.name.toLowerCase();
    return searchWords.every(word => productName.includes(word));
  });

  const topProducts = matchedProducts.slice(0, 3);

  if (topProducts.length === 0) {
    searchDropdown.innerHTML = `<div class="search-no-result">Нічого не знайдено</div>`;
    searchDropdown.classList.remove('hidden');
    return;
  }

  searchDropdown.innerHTML = topProducts.map(product => {

    const oldPriceHTML = product.oldPrice
      ? `<span class="dropdown-old-price">${product.oldPrice} ₴</span>`
      : '';

    const stockClass = product.inStock ? '' : 'out-of-stock-item';
    const stockBadgeHTML = !product.inStock
      ? `<span class="dropdown-stock-text">Немає в наявності</span>`
      : '';

    return `
      <div class="search-dropdown-item ${stockClass}" data-id="${product.id}">
        <div class="dropdown-img-box">
          <img src="${product.art}" alt="${product.name}" class="dropdown-item-img">
        </div>
        
        <div class="dropdown-item-info">
          <span class="dropdown-item-title">${product.name}</span>
          
          <div class="dropdown-price-box">
            <span class="dropdown-item-price">${product.price} ₴</span>
            ${oldPriceHTML}
          </div>
          
          ${stockBadgeHTML}
        </div>
      </div>
    `;
  }).join('');

  searchDropdown.classList.remove('hidden');
});

searchDropdown.addEventListener('click', (event) => {
  const item = event.target.closest('.search-dropdown-item');
  if (!item) return;

  const productId = Number(item.dataset.id);
  const product = PRODUCTS.find(p => p.id === productId);

  if (product) {
    openProductModal(product);
    searchInput.value = '';
    searchDropdown.classList.add('hidden');
    searchDropdown.innerHTML = '';
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.search-wrapper')) {
    searchDropdown.classList.add('hidden');
  }
});