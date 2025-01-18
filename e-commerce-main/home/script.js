// for login or register
const userIcon = document.getElementById('icon');
const buttonContainer = document.getElementById('buttonContainer');

// Function to update button container position
function updateButtonContainerPosition() {
    const rect = userIcon.getBoundingClientRect(); // Get position relative to viewport
    const containerWidth = buttonContainer.offsetWidth; // Get the width of the container
    const windowWidth = window.innerWidth; // Get the window width

    // Calculate the position dynamically
    if (rect.right + containerWidth > windowWidth) {
        // Open on the left if there's not enough space on the right
        buttonContainer.style.left = `${rect.left - containerWidth}px`;
    } else {
        // Default behavior, open on the right
        buttonContainer.style.left = `${rect.right}px`;
    }

    buttonContainer.style.top = `${rect.bottom}px`; // Set top position relative to the viewport
}

// Toggle visibility and update position dynamically on click
userIcon.addEventListener('click', () => {
    // Set the sessionStorage flag when the icon is clicked
    sessionStorage.setItem('restored', 'true');
    updateButtonContainerPosition(); // Update position
    buttonContainer.classList.toggle('visible'); // Toggle visibility
});

// Close the button container if clicked outside
document.addEventListener('click', (e) => {
    if (!userIcon.contains(e.target) && !buttonContainer.contains(e.target)) {
        buttonContainer.classList.remove('visible');
    }
});

// Recalculate button container position when the window is resized
window.addEventListener('resize', () => {
    if (buttonContainer.classList.contains('visible')) {
        updateButtonContainerPosition();
    }
});

// Check if the page has been restored after reload
// window.addEventListener('load', () => {
//     if (sessionStorage.getItem('restored') === 'true') {
//         // Ensure button container is visible and positioned correctly after reload
//         buttonContainer.classList.add('visible');
//         updateButtonContainerPosition();

//         // Remove the 'restored' flag from sessionStorage to avoid it triggering again
//         sessionStorage.removeItem('restored');
//     }
// });

// for shopping
const cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage

// Function to get the selected color from radio buttons
function getSelectedColor(colorGroupId) {
  const selectedColor = document.querySelector(`input[name="${colorGroupId}"]:checked`);
  return selectedColor ? selectedColor.value : null;
}

// Add to Cart Function
function addToCart(productName, price, color) {
  if (!color) {
    alert('Please select a color.');
    return;
  }

  // Check if the product already exists in the cart with the same name and color
  const existingItem = cart.find(item => item.name === productName && item.color === color);

  if (existingItem) {
    // If the product with the same name and color exists, increase the quantity by 1
    existingItem.quantity += 1;
  } else {
    // Otherwise, add the new product to the cart with quantity 1
    cart.push({ name: productName, price: price, color: color, quantity: 1 });
  }

  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  alert(`${productName} (${color}) added to cart!`);
}

// Navigate to Cart Page
function navigateToCart() {
  window.location.href = '../addcart/cart.html'; // Redirect to cart page
}
// Adding wishlist functionality
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function addToWishlist(name, color) {
  if (!color) {
    alert('Please select a color to add to the wishlist.');
    return;
  }
  const existingItem = wishlist.find((item) => item.name === name && item.color === color);

  if (!existingItem) {
    wishlist.push({ name, color });
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert(`${name} (${color}) added to your wishlist!`);
  } else {
    alert(`${name} (${color}) is already in your wishlist.`);
  }
}
// Function to toggle the visibility of the share menu
function toggleShareMenu() {
    const shareMenu = document.getElementById('share-menu');
    shareMenu.style.display = shareMenu.style.display === 'none' || shareMenu.style.display === '' ? 'block' : 'none';
}

// Function to handle sharing on different platforms
function shareOn(platform) {
    const productName = 'Product Name Here';  // You can dynamically pass product name here
    const productUrl = encodeURIComponent(window.location.href);  // The current page URL
    const text = encodeURIComponent(`Check out this product: ${productName}`);  // Text to share

    let shareUrl = '';

    // Prepare the share URL for different platforms
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${productUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${productUrl}&text=${text}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${productUrl}`;
            break;
        default:
            console.log('Unsupported platform');
            return;
    }

    // Open a new window with the platform's share URL
    window.open(shareUrl, '_blank', 'width=600,height=400');

    // Close the share menu after sharing
    document.getElementById('share-menu').style.display = 'none';
}

// Manage Login/Logout Buttons Visibility
window.addEventListener('load', () => {
  const logoutButton = document.getElementById('logoutButton');
  const loginButton = document.getElementById('loginButton');
  const registerButton = document.getElementById('registerButton');
  const restrictedButtons = document.querySelectorAll(".res");
  const addToCartButton = document.getElementById('dis');
  const offer_link = document.getElementById('offer_dis');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check login status
  const usernameDisplay = document.getElementById('usernameDisplay');
  const usernameSpan = document.getElementById('username');
  const username = localStorage.getItem('username');

  if (isLoggedIn) {
      // Show Logout button, hide Login/Register buttons
      logoutButton.style.display = 'block';
      loginButton.style.display = 'none';
      registerButton.style.display = 'none';
      addToCartButton.disabled  = false; // Disable the button
      offer_link.style.pointerEvents = 'auto'; // Enable the link
      offer_link.style.opacity = '1'; // Set opacity to 100% (default)
      // vise_link.disabled = false;
      restrictedButtons.forEach(button => {
        button.disabled = false; // Enable button
      });

      if (username) {
        usernameSpan.textContent = username; // Set the username text
        usernameDisplay.style.display = 'inline-block'; // Show the username display
      }
  } else {
      // Show Login/Register buttons, hide Logout button
      logoutButton.style.display = 'none';
      loginButton.style.display = 'block';
      registerButton.style.display = 'block';
      usernameDisplay.style.display = 'none'; // Hide the username display
      addToCartButton.disabled  = true; // Enable the button
      offer_link.style.pointerEvents = 'none'; // Disable the link
      offer_link.style.opacity = '0.5'; // Reduce the opacity to 50%
      // vise_link.disabled = true;
      restrictedButtons.forEach(button => {
        button.disabled = true; // Disable button
    });
  }
});

// Handle Logout Functionality
document.getElementById('logoutButton').addEventListener('click', () => {
  localStorage.removeItem('isLoggedIn'); // Clear login status
  localStorage.removeItem('username'); // Clear username
  alert('You have been logged out successfully.');
  location.reload(); // Refresh the page to update UI
});




