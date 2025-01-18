// Load offerCart from localStorage (initially empty if not set)
let offerCart = JSON.parse(localStorage.getItem('offerCart')) || [];

// Predefined offer products
const offerProducts = [
  { name: 'Iphone X', price: 250, color: 'red', quantity: 1, },  
  { name: 'Iphone 11', price: 300, color: 'blue', quantity: 1, },
  { name: 'Iphone 12', price: 350, color: 'green', quantity: 1, }
];

// Initialize offerCart with the offer products if it's empty
if (offerCart.length === 0) {
  offerCart = offerProducts;
  localStorage.setItem('offerCart', JSON.stringify(offerCart)); // Save to localStorage
}

// Display Offer Cart Items
function displayOfferCart() {
  const offerCartItems = document.getElementById('offer-cart-items');
  const offerTotalElement = document.getElementById('offer-total');

  // Clear existing items in the UI
  offerCartItems.innerHTML = '';

  let total = 0;
  let delivery = 3;

  // Display each offer item
  offerCart.forEach((item) => {
    const li = document.createElement('li');

    // Add product image (use item.image for local image or URL if online)
    const img = document.createElement('img');
    img.src = `./image/${item.name}.png`; // Assuming images are stored in "images" folder
    img.alt = item.name;

    // Add product details (no buttons for quantity change or removal)
    const details = document.createElement('span');
    details.innerHTML = `
      ${item.name} (Color: ${item.color})<br>
      Price: $${item.price} x ${item.quantity} = <b>$${(item.price * item.quantity).toFixed(2)}</b>
    `;

    li.appendChild(img);
    li.appendChild(details);
    offerCartItems.appendChild(li);

    total += item.price * item.quantity; // Calculate total price
  });
  total += delivery;

  offerTotalElement.textContent = total.toFixed(2); // Update total price
}

// Checkout functionality
document.getElementById('checkout-button').addEventListener('click', () => {
  if (offerCart.length === 0) {
    alert('Your offer cart is empty!');
  } else {
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const paymentMethod = document.getElementById('payment-method').value;

    if (name && address && paymentMethod) {
      alert('Thank you for your order!');
      // Redirect to home page or confirmation page
      window.location.href = '../home/index.html'; // Replace with your homepage URL
    } else {
      alert('Please fill out all checkout fields.');
    }
  }
});

// Initialize offer cart page
displayOfferCart();
