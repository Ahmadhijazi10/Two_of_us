// Get wishlist data from localStorage
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Function to display wishlist items
function displayWishlist() {
    const container = document.getElementById('wishlist-container');
    
    if (wishlist.length === 0) {
        container.innerHTML = '<p>Your wishlist is empty.</p>';
        return;
    }

    const wishlistHTML = wishlist.map(item => {
        // Create an image element for each wishlist item
        return `
            <div class="wishlist-item">
                <img src="./image/${item.name}.png" alt="${item.name}" 
                    onerror="this.onerror=null; this.src='../products/image/Charge Disc.png';" 
                    style="margin-right: 10px; width: 100px; height: auto;" /> 
                <h3>${item.name}</h3>
                <p>Color: ${item.color}</p>
                <button onclick="removeFromWishlist('${item.name}', '${item.color}')">Remove</button>
            </div>
        `;
    }).join('');
    
    container.innerHTML = wishlistHTML;
}

// Function to add item to wishlist
function addToWishlist(name, color) {
    // Check if the item already exists in the wishlist
    const existingItem = wishlist.find(item => item.name === name && item.color === color);
    
    if (existingItem) {
        // If item exists, alert the user and return
        alert('This product is already in your wishlist.');
        return;
    }

    // Add the new item to the wishlist if it doesn't exist already
    const newItem = { name, color };
    wishlist.push(newItem);
    localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Save updated wishlist to localStorage
    displayWishlist(); // Re-render the wishlist
}

// Function to remove an item from wishlist
function removeFromWishlist(name, color) {
    wishlist = wishlist.filter(item => !(item.name === name && item.color === color));
    localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Save updated wishlist to localStorage
    displayWishlist(); // Re-render the wishlist after removal
}

// Function to empty the entire wishlist
function emptyWishlist() {
    wishlist = []; // Clear the wishlist array
    localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Save empty wishlist to localStorage
    displayWishlist(); // Re-render the wishlist (it will show the "empty" message)
}

// Function to handle the "Back" button
function goBack() {
    window.history.back(); // Go back to the previous page in history
}

// Attach event listener for the "Back" button
document.addEventListener('DOMContentLoaded', () => {
    const emptyButton = document.getElementById('empty-wishlist');
    if (emptyButton) {
        emptyButton.addEventListener('click', emptyWishlist); // Add event listener for the "Empty Wishlist" button
    }

    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', goBack); // Add event listener for the "Back" button
    }

    // Call the function to display wishlist when the page loads (for wishlist.html)
    if (window.location.pathname.includes("wishlist.html")) {
        displayWishlist();
    }
});
