const cartCard = document.getElementById('cartCard');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const cartCount = document.getElementById('cartCount');
const totalItems = document.getElementById('totalItems');
const totalPrice = document.getElementById('totalPrice');
const deleteItemBtn = document.getElementById('deleteItem');
const buyButton = document.querySelector('.modal-submit-btn');

if (buyButton) {
    buyButton.addEventListener('click', function() {
        cartCard.style.display = 'flex';
        emptyCartMessage.style.display = 'none';
        cartCount.textContent = '[1]';
        totalItems.textContent = '1';
        totalPrice.textContent = '4 798 ₴';
    })
}

if (deleteItemBtn) {
    deleteItemBtn.addEventListener('click', function() {
        cartCard.style.display = 'none';
        emptyCartMessage.style.display = 'flex';
        cartCount.textContent = '[0]';
        totalItems.textContent = '0';
        totalPrice.textContent = '0 ₴';
    });
}