// Existing popup logic
const darkBg = document.querySelector('.dark-bg');
const popupImg = document.querySelector('.card img');
const thumbnails = document.querySelectorAll('.p1');
const cancel = document.querySelector('.cancel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function showPopup(index) {
    currentIndex = index;
    popupImg.src = thumbnails[currentIndex].dataset.full || thumbnails[currentIndex].src.replace('-thumbnail', '');
    darkBg.style.visibility = 'visible';
    darkBg.style.display = 'flex';
}

function hidePopup() {
    darkBg.style.visibility = 'hidden';
    darkBg.style.display = 'none';
}

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => showPopup(index));
});

cancel.addEventListener('click', hidePopup);
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    showPopup(currentIndex);
});
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    showPopup(currentIndex);
});
darkBg.addEventListener('click', (e) => {
    if (e.target === darkBg) {
        hidePopup();
    }
});

// ------------------ CART FUNCTIONALITY ------------------
const cartIcon = document.querySelector('.cart-icon');
const cartDropdown = document.querySelector('.cart-dropdown');
const addToCartBtn = document.querySelector('.Cart');
let cartContent = [];

cartIcon.addEventListener('click', () => {
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});

addToCartBtn.addEventListener('click', () => {
    const product = {
        name: 'Fall Limited Edition Sneakers',
        price: 125,
        quantity: 1,
        image: 'images/image-product-1-thumbnail.jpg'
    };

    cartContent = [product]; // Only one item for now
    renderCart();
});

function renderCart() {
    if (cartContent.length === 0) {
        cartDropdown.innerHTML = `<h3>Cart</h3><hr><p>Your cart is empty.</p>`;
        return;
    }

    const item = cartContent[0];
    cartDropdown.innerHTML = `
        <h3>Cart</h3>
        <hr>
        <div class="cart-item">
            <img src="${item.image}" alt="product">
            <div class="cart-item-details">
                <p>${item.name}</p>
                <p>$${item.price} x ${item.quantity} <strong>$${item.price * item.quantity}</strong></p>
            </div>
        </div>
        <button class="checkout-btn" style="color=black;">Checkout</button>
    `;
}
