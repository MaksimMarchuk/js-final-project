const productsContainer = document.querySelector('.products-container');
const cartContainer = document.getElementById('cartItemsContainer');
const cartCountElement = document.getElementById('cartCount');
const totalItemsCountElement = document.getElementById('totalItemsCount');
const totalCartPriceElement = document.getElementById('totalCartPrice');
const emptyCartMessage = document.getElementById('emptyCartMessage');

let cart = [];

function renderProducts(products) {
  if (!productsContainer) return;

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

  productsContainer.innerHTML = cardsHTML;
}

function renderCart() {
  const cartContainer = document.getElementById('cartItemsContainer');
  const emptyCartMessage = document.getElementById('emptyCartMessage');
  const cartCountElement = document.getElementById('cartCount');
  const totalItemsCountElement = document.getElementById('totalItemsCount');
  const totalCartPriceElement = document.getElementById('totalCartPrice');
  
  const mainmodalBottom = document.querySelector('.mainmodalBottom');

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = '';
    if (emptyCartMessage) emptyCartMessage.style.display = 'block';
    
    if (mainmodalBottom) mainmodalBottom.style.display = 'none';
  } else {
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    
    if (mainmodalBottom) mainmodalBottom.style.display = 'flex';
    
    cartContainer.innerHTML = cart.map((item, index) => {
      return `
        <div class="cart-item" data-index="${index}" data-id="${item.id}" style="display: flex; align-items: center; margin-bottom: 15px; gap: 10px;">
          <div class="cart-item-img-box" style="width: 60px; height: 60px;">
            <img src="${item.art}" alt="${item.name}" class="cart-item-img" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          
          <div class="cart-item-info" style="flex-grow: 1;">
            <h4 class="cart-item-title" style="margin: 0 0 5px 0;">${item.name}</h4>
            <p class="cart-item-desc" style="margin: 0 0 5px 0; font-size: 12px; opacity: 0.7;">${item.category} • розмір ${item.size}</p>
            
            <div class="cart-item-controls" style="display: flex; align-items: center; justify-content: space-between;">
              <div class="counter">
                <button class="qty-btn minus">-</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn plus">+</button>
              </div>
              <span class="cart-item-price">${item.price * item.quantity} ₴</span>
            </div>
            
            <button class="cart-item-remove-btn" style="background: none; border: none; color: tomato; cursor: pointer; padding: 0; margin-top: 5px; font-size: 12px;">Видалити</button>
          </div>
        </div>
      `;
    }).join('');
  }

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartCountElement) cartCountElement.textContent = `[${totalQuantity}]`;
  if (totalItemsCountElement) totalItemsCountElement.textContent = totalQuantity;
  if (totalCartPriceElement) totalCartPriceElement.textContent = `${totalSum} ₴`;
}

if (cartContainer) {
  cartContainer.addEventListener('click', (event) => {
    const cartItemElement = event.target.closest('.cart-item');
    if (!cartItemElement) return;

    const index = Number(cartItemElement.dataset.index);

    if (event.target.classList.contains('plus')) {
      cart[index].quantity += 1;
      renderCart();
    }
    
    if (event.target.classList.contains('minus')) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        renderCart();
      }
    }
    
    if (event.target.classList.contains('cart-item-remove-btn')) {
      cart.splice(index, 1);
      renderCart();
    }
  });
}

function openProductModal(product) {
  const searchInput = document.getElementById('searchInput');
  const searchDropdown = document.getElementById('searchDropdown');

  if (searchInput && searchDropdown) {
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
        <span class="modal-brand-category">${product.brand || ''} ${product.category}</span>
        <h2 class="modal-title">${product.name}</h2>
        
        <div class="modal-price-box">
          <span class="modal-price">${product.price} ₴</span>
          ${modalOldPriceHTML}
        </div>
        
        <p class="modal-description">${product.description || ''}</p>
        
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
  let currentQty = 1;

  if (minusBtn && plusBtn && qtyValue) {
    minusBtn.addEventListener('click', () => {
      if (currentQty > 1) { currentQty--; qtyValue.textContent = currentQty; }
    });
    plusBtn.addEventListener('click', () => {
      currentQty++; qtyValue.textContent = currentQty;
    });
  }

  const sizeButtons = modalContainer.querySelectorAll('.size-btn');
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const submitBtn = modalContainer.querySelector('.modal-submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const activeSizeBtn = modalContainer.querySelector('.size-btn.active');
      const selectedSize = activeSizeBtn ? activeSizeBtn.textContent.trim() : 'N/A';

      const existingItem = cart.find(
        item => item.id === product.id && item.size === selectedSize
      );

      if (existingItem) {
        existingItem.quantity += currentQty;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          category: product.category,
          art: product.art,
          price: product.price,
          size: selectedSize,
          quantity: currentQty
        });
      }

      renderCart(); 
      modalContainer.classList.add('hidden'); 
    });
  }

  const closeBtn = modalContainer.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => modalContainer.classList.add('hidden'));
  }
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) modalContainer.classList.add('hidden');
  });
}

if (productsContainer) {
  productsContainer.addEventListener('click', (event) => {
    const card = event.target.closest('.product-card');
    if (!card) return;

    const productId = Number(card.dataset.id);
    const product = typeof PRODUCTS !== 'undefined' ? PRODUCTS.find(p => p.id === productId) : null;

    if (product) {
      openProductModal(product);
    }
  });
}

if (typeof PRODUCTS !== 'undefined') {
  renderProducts(PRODUCTS);
  renderCart();
}

