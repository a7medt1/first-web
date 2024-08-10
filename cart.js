document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        displayCartItems(cart);
        updateTotalPrice(cart);
    }

    function displayCartItems(cart) {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price} دولار</p>
                    <button class="remove-from-cart" data-index="${index}">إزالة</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    function removeFromCart(event) {
        const index = event.target.getAttribute('data-index');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
    }

    function updateTotalPrice(cart) {
        const totalPrice = cart.reduce((total, item) => total + item.price, 0);
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
    }

    checkoutButton.addEventListener('click', () => {
        alert('تم إتمام الشراء بنجاح!');
        localStorage.removeItem('cart');
        loadCart();
        updateCartCount();
    });

    loadCart();
});
