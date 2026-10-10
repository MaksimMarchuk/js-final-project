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