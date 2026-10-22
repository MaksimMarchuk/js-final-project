let cart = [];

const cartItemsContainer = document.getElementById('cartItemsContainer');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const cartCountSpan = document.getElementById('cartCount');
const totalItemsCount = document.getElementById('totalItemsCount');
const totalCartPrice = document.getElementById('totalCartPrice');
const cartModalBackdrop = document.querySelector('[data-modal]');
const closeCartBtn = document.querySelector('[data-close-modal]');

function renderCart() {
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '';
    if (emptyCartMessage) emptyCartMessage.style.display = 'block';
    if (cartCountSpan) cartCountSpan.textContent = '[0]';
    if (totalItemsCount) totalItemsCount.textContent = '0';
    if (totalCartPrice) totalCartPrice.textContent = '0 ₴';
    return;
  }

  if (emptyCartMessage) emptyCartMessage.style.display = 'none';

  let totalProductsCount = 0;
  let totalPriceSum = 0;

  const cartHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalProductsCount += item.quantity;
    totalPriceSum += itemTotal;

    return `
      <div class="cardModal" data-index="${index}">
          <img src="${item.art}" alt="${item.name}">
          <div class="cardModal__textbox">
              <h2 class="cardModal__title">${item.name}</h2>
              <h3 class="cardModal__subtitle">${item.category} • розмір ${item.size}</h3>
              <div class="counter">
                  <button class="cart-minus" data-index="${index}">-</button>
                  <p id="itemCount">${item.quantity}</p>
                  <button class="cart-plus" data-index="${index}">+</button>
              </div>
              <p class="cardModal__delete" data-index="${index}">Видалити</p>
          </div>
          <p class="cardModal__price">${itemTotal} ₴</p>
      </div>
    `;
  }).join('');

  cartItemsContainer.innerHTML = cartHTML;

  if (cartCountSpan) cartCountSpan.textContent = `[${totalProductsCount}]`;
  if (totalItemsCount) totalItemsCount.textContent = totalProductsCount;
  if (totalCartPrice) totalCartPrice.textContent = `${totalPriceSum} ₴`;
}

if (cartItemsContainer) {
  cartItemsContainer.addEventListener('click', (event) => {
    const index = Number(event.target.dataset.index);
    if (isNaN(index)) return;

    if (event.target.classList.contains('cart-plus')) {
      cart[index].quantity++;
    } else if (event.target.classList.contains('cart-minus')) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      }
    } else if (event.target.classList.contains('cardModal__delete')) {
      cart.splice(index, 1);
    }

    
    function renderCart() {
  if (!cartItemsContainer) return;

  // Повністю очищуємо контейнер перед рендерингом
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    if (emptyCartMessage) emptyCartMessage.style.display = 'block';
    if (cartCountSpan) cartCountSpan.textContent = '[0]';
    if (totalItemsCount) totalItemsCount.textContent = '0';
    if (totalCartPrice) totalCartPrice.textContent = '0 ₴';
    return;
  }

  if (emptyCartMessage) emptyCartMessage.style.display = 'none';

  let totalProductsCount = 0;
  let totalPriceSum = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalProductsCount += item.quantity;
    totalPriceSum += itemTotal;

    // Головний блок картки
    const cardDiv = document.createElement('div');
    cardDiv.className = 'cardModal';
    cardDiv.dataset.index = index;

    // Зображення товару
    const img = document.createElement('img');
    img.src = item.art;
    img.alt = item.name;

    // Текстовий блок
    const textBox = document.createElement('div');
    textBox.className = 'cardModal__textbox';

    const title = document.createElement('h2');
    title.className = 'cardModal__title';
    title.textContent = item.name;

    const subtitle = document.createElement('h3');
    subtitle.className = 'cardModal__subtitle';
    subtitle.textContent = `${item.category} • розмір ${item.size}`;

    // Блок лічильника
    const counterDiv = document.createElement('div');
    counterDiv.className = 'counter';

    const minusBtn = document.createElement('button');
    minusBtn.className = 'cart-minus';
    minusBtn.dataset.index = index;
    minusBtn.textContent = '-';

    const countP = document.createElement('p');
    countP.className = 'itemCount'; // Використовуємо клас замість ID, щоб уникнути дублів
    countP.textContent = item.quantity;

    const plusBtn = document.createElement('button');
    plusBtn.className = 'cart-plus';
    plusBtn.dataset.index = index;
    plusBtn.textContent = '+';

    counterDiv.append(minusBtn, countP, plusBtn);

    // Кнопка видалення
    const deleteBtn = document.createElement('p');
    deleteBtn.className = 'cardModal__delete';
    deleteBtn.dataset.index = index;
    deleteBtn.textContent = 'Видалити';

    textBox.append(title, subtitle, counterDiv, deleteBtn);

    // Ціна товару
    const priceP = document.createElement('p');
    priceP.className = 'cardModal__price';
    priceP.textContent = `${itemTotal} ₴`;

    // Збираємо картку doh купи
    cardDiv.append(img, textBox, priceP);
    cartItemsContainer.appendChild(cardDiv);
  });

  // Оновлюємо підсумки
  if (cartCountSpan) cartCountSpan.textContent = `[${totalProductsCount}]`;
  if (totalItemsCount) totalItemsCount.textContent = totalProductsCount;
  if (totalCartPrice) totalCartPrice.textContent = `${totalPriceSum} ₴`;
}
}
