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

// Elements
const cartIcon = document.querySelector('.cart-icon');
const cartDropdown = document.querySelector('.cart-dropdown');
const addToCartBtn = document.querySelector('.Cart');

let cartContent = [];

// Toggle cart dropdown visibility
cartIcon.addEventListener('click', () => {
  cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});

// Add product to cart (for demo, always same product)
addToCartBtn.addEventListener('click', () => {
  const product = {
    name: 'Fall Limited Edition Sneakers',
    price: 125,
    quantity: 1,
    image: 'images/image-product-1-thumbnail.jpg'
  };

  // Check if product already in cart, update quantity if yes
  const existingIndex = cartContent.findIndex(item => item.name === product.name);
  if (existingIndex !== -1) {
    cartContent[existingIndex].quantity += 1;
  } else {
    cartContent.push(product);
  }

  renderCart();
});

// Render cart items and total price
function renderCart() {
  if (cartContent.length === 0) {
    cartDropdown.innerHTML = `<h3>Cart</h3><hr><p>Your cart is empty.</p>`;
    return;
  }

  let total = 0;
  const itemsHtml = cartContent.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    return `
      <div class="cart-item" data-index="${index}">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <p>${item.name}</p>
          <p>$${item.price} x ${item.quantity} <strong>$${itemTotal}</strong></p>
          <div>
            <button class="qty-btn" data-action="decrease" data-index="${index}">-</button>
            <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  cartDropdown.innerHTML = `
    <h3>Cart</h3>
    <hr>
    ${itemsHtml}
    <hr>
    <p><strong>Total: $${total}</strong></p>
    <button class="checkout-btn" style="color: black;">Checkout</button>
  `;

  // Add quantity button handlers
  const qtyButtons = cartDropdown.querySelectorAll('.qty-btn');
  qtyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const idx = Number(btn.dataset.index);

      if (action === 'increase') {
        cartContent[idx].quantity += 1;
      } else if (action === 'decrease') {
        cartContent[idx].quantity -= 1;
        if (cartContent[idx].quantity <= 0) {
          cartContent.splice(idx, 1); // Remove item if quantity 0
        }
      }
      renderCart();
    });
  });

  // Checkout button redirect
  const checkoutBtn = cartDropdown.querySelector('.checkout-btn');
  checkoutBtn.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });
}
