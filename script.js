document.getElementById("whatsapp-button").addEventListener("click", function() {
    document.getElementById("whatsapp-modal").style.display = "block";
});

document.getElementById("close-whatsapp-modal").addEventListener("click", function() {
    document.getElementById("whatsapp-modal").style.display = "none";
});

// Cerrar modal si se hace clic fuera de la caja de contenido
window.onclick = function(event) {
    let modal = document.getElementById("whatsapp-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
// Cart functionality
let cart = [];
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeCartModal = document.getElementById('close-cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');

// Toggle cart modal
cartButton.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeCartModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Update cart display
function updateCart() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update items list
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotalPrice.textContent = '$0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}">
                    <button class="increase-quantity" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Add event listeners to quantity controls
    document.querySelectorAll('.decrease-quantity').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                updateCart();
            }
        });
    });
    
    document.querySelectorAll('.increase-quantity').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            cart[index].quantity++;
            updateCart();
        });
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = e.target.getAttribute('data-index');
            const newQuantity = parseInt(e.target.value);
            if (newQuantity >= 1) {
                cart[index].quantity = newQuantity;
                updateCart();
            }
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        });
    });
    
    cartTotalPrice.textContent = `$${totalPrice.toLocaleString()}`;
}

// Image gallery functionality
function changeImage(src, element) {
    document.getElementById('main-image').src = src;
    
    // Remove active class from all thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Add active class to clicked thumbnail
    element.classList.add('active');
}

// Quantity selector functionality
const minusBtn = document.querySelector('.quantity-btn.minus');
const plusBtn = document.querySelector('.quantity-btn.plus');
const quantityInput = document.querySelector('.quantity-value');

minusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let value = parseInt(quantityInput.value);
    if (value > 1) {
        quantityInput.value = value - 1;
    }
});

plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let value = parseInt(quantityInput.value);
    if (value < 10) {
        quantityInput.value = value + 1;
    }
});

// Add to cart functionality
const addToCartBtn = document.getElementById('add-to-cart');

addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    const price = 2499;
    
    // Check if item already in cart
    const existingItemIndex = cart.findIndex(item => item.name === 'Nexus X7 Extreme Edition');
    
    if (existingItemIndex >= 0) {
        // Update quantity if already in cart
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            name: 'Nexus X7 Extreme Edition',
            price: price,
            quantity: quantity,
            image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
        });
    }
    
    // Update cart display
    updateCart();
    
    // Show cart modal
    cartModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

// Modal functionality
const buyNowBtn = document.getElementById('buy-now');
const paymentModal = document.getElementById('payment-modal');
const closeModal = document.querySelector('.close-modal');

buyNowBtn.addEventListener('click', () => {
    paymentModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    paymentModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Simple form validation
const paymentForm = document.getElementById('payment-form');

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would normally process the payment
    alert('Payment processed successfully! Your Nexus X7 will ship within 2 business days.');
    paymentModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});
