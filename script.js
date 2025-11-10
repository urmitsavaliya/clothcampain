document.addEventListener('DOMContentLoaded', function() {
    const toolsList = document.getElementById('tools-list');
    const addToolForm = document.getElementById('add-tool-form');
    const toolNameInput = document.getElementById('tool-name');
    const toolLinkInput = document.getElementById('tool-link');
    const cartCount = document.getElementById('cart-count');

    let tools = JSON.parse(localStorage.getItem('generativeTools')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayTools() {
        if (toolsList) {
            toolsList.innerHTML = '';
            tools.forEach((tool, index) => {
                const toolItem = document.createElement('div');
                toolItem.className = 'tool-item';
                toolItem.innerHTML = `
                    <a href="${tool.link}" target="_blank">${tool.name}</a>
                    <button class="add-to-cart" data-index="${index}">Add to Cart</button>
                `;
                toolsList.appendChild(toolItem);
            });
        }
    }

    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = `Cart: ${cart.length} items`;
        }
    }

    function displayCart() {
        const cartList = document.getElementById('cart-list');
        const totalPrice = document.getElementById('total-price');
        if (cartList) {
            cartList.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <p>${item.name} - $${item.price}</p>
                    <button class="remove-from-cart" data-index="${index}">Remove</button>
                `;
                cartList.appendChild(cartItem);
                total += item.price;
            });
            if (totalPrice) {
                totalPrice.textContent = total.toFixed(2);
            }
        }
    }

    function displayCheckout() {
        const checkoutList = document.getElementById('checkout-list');
        const checkoutTotalPrice = document.getElementById('checkout-total-price');
        if (checkoutList) {
            checkoutList.innerHTML = '';
            let total = 0;
            cart.forEach((item) => {
                const checkoutItem = document.createElement('div');
                checkoutItem.className = 'checkout-item';
                checkoutItem.innerHTML = `<p>${item.name} - $${item.price}</p>`;
                checkoutList.appendChild(checkoutItem);
                total += item.price;
            });
            if (checkoutTotalPrice) {
                checkoutTotalPrice.textContent = total.toFixed(2);
            }
        }
    }

    if (addToolForm) {
        addToolForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = toolNameInput.value.trim();
            const link = toolLinkInput.value.trim();
            if (name && link) {
                tools.push({ name, link, price: Math.floor(Math.random() * 100) + 10 }); // Random price for demo
                localStorage.setItem('generativeTools', JSON.stringify(tools));
                displayTools();
                toolNameInput.value = '';
                toolLinkInput.value = '';
            }
        });
    }

    if (toolsList) {
        toolsList.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                const index = e.target.dataset.index;
                const tool = tools[index];
                cart.push({ name: tool.name, price: tool.price });
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                alert('Added to cart!');
            }
        });
    }

    const cartList = document.getElementById('cart-list');
    if (cartList) {
        cartList.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-from-cart')) {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCart();
                updateCartCount();
            }
        });
    }

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Purchase completed!');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'index.html';
        });
    }

    displayTools();
    updateCartCount();
    displayCart();
    displayCheckout();
});