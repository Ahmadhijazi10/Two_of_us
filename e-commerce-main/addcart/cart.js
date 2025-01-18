let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage
let appliedDiscount = 0; // For applied coupon discount

// Display Cart Items
function displayCart() {
  const cartItems = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');
  const discountMessage = document.getElementById('discount-message');
  const couponCodeInput = document.getElementById('coupon-code');

  // Clear existing items in the UI
  cartItems.innerHTML = '';

  let total = 0;
  let delivery = 3;  
  
  // Display each cart item
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.style.marginBottom = '20px';

    // Add product image (placeholder for now)
    const img = document.createElement('img');
    img.src = `./image/${item.name}.png`; // Placeholder image
    img.alt = item.name;
    img.style.marginRight = '10px';

    img.onerror = () => {
      if(img.alt == "Iphone 16(1)"){
        img.src = `../products/image/iphone 16 pro max.png`
      } else {
        img.src = `../products/image/Charge Disc.png`
      }
    }
    
    // Add product details
    const details = document.createElement('span');
    details.innerHTML = `
      ${item.name} (Color: ${item.color})<br>
      Price: $${item.price} x ${item.quantity} = <b>$${(item.price * item.quantity).toFixed(2)}</b>
      `;

    // Add quantity adjustment buttons
    const quantityControls = document.createElement('div');
    quantityControls.style.marginTop = '10px';

    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.onclick = () => updateQuantity(index, 1);

    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.onclick = () => updateQuantity(index, -1);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => removeFromCart(index);

    quantityControls.appendChild(decreaseButton);
    quantityControls.appendChild(increaseButton);
    quantityControls.appendChild(removeButton);

    li.appendChild(img);
    li.appendChild(details);
    li.appendChild(quantityControls);
    cartItems.appendChild(li);
    
    total += item.price * item.quantity; // Calculate total price
    
  });

  total+= delivery;

  total -= total * appliedDiscount; // Apply discount
  totalElement.textContent = total.toFixed(2); // Update total price

  // Show discount message
  if (appliedDiscount > 0) {
    discountMessage.textContent = `Discount applied! You save ${(appliedDiscount * 100).toFixed(0)}%.`;
  } else {
    discountMessage.textContent = '';
  }
}

// Update quantity
function updateQuantity(index, delta) {
  const item = cart[index];

  if (delta === 1) {
    item.quantity += 1; // Increase quantity
  } else if (delta === -1 && item.quantity > 1) {
    item.quantity -= 1; // Decrease quantity if more than 1
  } else if (delta === -1 && item.quantity === 1) {
    cart.splice(index, 1); // Remove item if quantity reaches 0
  }

  // Save updated cart
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1); // Remove the item completely
  localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
  displayCart();
}

// Clear all items from the cart
document.getElementById('clear-cart').addEventListener('click', () => {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
});

// Handle checkout button
document.getElementById('checkout-button').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const paymentMethod = document.getElementById('payment-method').value;

    if (name && address && paymentMethod) {
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Thank you!');
      // Redirect to the home page
      window.location.href = '../home/index.html'; // Replace 'index.html' with your actual home page URL
    } else {
      alert('Please fill out all checkout fields.');
    }
  }
});


// Handle coupon application
function applyCoupon() {
  const validCoupons = { SAVE10: 0.1, SAVE20: 0.2 }; // Example coupons
  const code = document.getElementById('coupon-code').value.trim();
  const discount = validCoupons[code];

  if (discount) {
    appliedDiscount = discount;
    displayCart(); // Recalculate and display cart with new discount
    alert(`Coupon applied! You save ${(discount * 100).toFixed(0)}%.`);
  } else {
    appliedDiscount = 0;
    displayCart(); // Recalculate and display cart with no discount
    alert('Invalid coupon code.');
  }
}

// Handle coupon input
document.getElementById('apply-coupon').addEventListener('click', () => {
  applyCoupon();
});

// Return to homepage
function returnToHome() {
  window.location.href = '../home/index.html'; // Replace 'index.html' with your homepage file path
}

// Initialize cart page
displayCart();
