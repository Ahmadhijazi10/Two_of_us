const productsContainer = document.getElementById("products_container");
const products = [
    {
        id: 1,
        name: "Iphone X",
        description: "The iPhone X features an edge-to-edge OLED display and Face ID, offering a premium design and performance with the A11 Bionic chip.",
        price: 300,
        img: "./image/iphone x.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 3
    },
    {
        id: 2,
        name: "Iphone 11",
        description: "The iPhone 11 comes with a dual-camera system, Night Mode, and the powerful A13 Bionic chip, making it perfect for photography enthusiasts.",
        price: 350,
        img: "./image/iphone 11.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 3
    },
    {
        id: 3,
        name: "Iphone 12",
        description: " The iPhone 12 offers 5G connectivity, Ceramic Shield for durability, and a stunning OLED display, all powered by the A14 Bionic chip.",
        price: 400,
        img: "./image/iphone 12.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 3
    },
    {
        id: 4,
        name: "Iphone 13",
        description: "The iPhone 13 introduces improved battery life, a smaller notch, and enhanced camera features, while still offering exceptional performance with the A15 Bionic chip.",
        price: 450,
        img: "./image/iphone 13.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 3
    },
    // Add more products as needed...
];

// Function to dynamically generate product cards
function displayProducts(productsList) {
    const productsHTML = productsList.map((product) => {
        const colorOptions = product.colors.map((color) => `
            <label>
                <input type="radio" name="color-${product.id}" value="${color}">
                <span class="color-circle" style="background-color: ${color};" title="${color.charAt(0).toUpperCase() + color.slice(1)}"></span>
            </label>
        `).join("");

        // Calculate the star rating
        const fullStars = Math.floor(product.rating);
        const halfStar = product.rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        const starIcons = [
            ...Array(fullStars).fill('<i class="fa-solid fa-star"></i>'),
            ...Array(halfStar).fill('<i class="fa-solid fa-star-half-stroke"></i>'),
            ...Array(emptyStars).fill('<i class="fa-solid fa-star" style="color: #ddd;"></i>')
        ].join("");

        return `
            <div class="card">
                <div class="small_card">
                    <i class="fa-solid fa-heart" id="heart-btn" onclick="addToWishlist('${product.name}', getSelectedColor('color-${product.id}'))"></i>
                    
                </div>
                <div class="image">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <div class="products_text">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <div class="color-dir">
                        ${colorOptions}
                    </div>
                    <h3>$${product.price.toFixed(2)}</h3>
                    <div class="products_star">
                        ${starIcons}
                    </div>
                    <button class="btn vise-btn"  onclick="addToCart('${product.name}', ${product.price}, getSelectedColor('color-${product.id}'))">Add to Cart</button>
                </div>
            </div>
        `;
    }).join("");

    productsContainer.innerHTML = productsHTML;
}

window.addEventListener('load', () => {
    // Retrieve login status and username from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username') || ''; // Get the username, default to empty if not set

    const heartButtons = document.querySelectorAll('#heart-btn');;
    const viseButtons = document.querySelectorAll('.vise-btn'); // Select all buttons with class "vise-btn"
    const restrictedButtons = document.querySelectorAll(".res"); // Select all restricted buttons
    const usernameDisplay = document.getElementById('usernameDisplay'); // Select the element where the username will be shown
    const usernameSpan = document.getElementById('username'); // The span where the username will be injected

    // Display the username if logged in
    if (isLoggedIn && usernameDisplay && usernameSpan) {
        usernameSpan.textContent = username; // Set the username
        usernameDisplay.style.display = 'block'; // Show the username display
    } else {
        usernameDisplay.style.display = 'none'; // Hide the username display if not logged in
    }

    heartButtons.forEach((heartButton) => {
        if (!isLoggedIn) {
            heartButton.classList.add('disabled'); // Add a 'disabled' class
            heartButton.style.pointerEvents = 'none'; // Disable click events
        } else {
            heartButton.classList.remove('disabled'); // Remove the 'disabled' class
            heartButton.style.pointerEvents = 'auto'; // Enable click events
        }
    });
    
    viseButtons.forEach(button => {
        button.disabled = !isLoggedIn; // Disable if not logged in
    });

    restrictedButtons.forEach(button => {
        button.disabled = !isLoggedIn; // Disable if not logged in
    });

    document.getElementById('logoutButton')?.addEventListener('click', () => {
        localStorage.setItem('isLoggedIn', 'false'); 
        heartButtons.forEach((heartButton) => {
            heartButton.classList.add('disabled');
            heartButton.style.pointerEvents = 'none'; // Disable click events
        });
        viseButtons.forEach(button => button.disabled = true);
        restrictedButtons.forEach(button => button.disabled = true);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');e

        if (usernameDisplay) {
            usernameDisplay.style.display = 'none'; // Hide the username
        }

        location.reload(); // Refresh the page
    });
});

// Call the function on page load
window.addEventListener("DOMContentLoaded", () => {
    displayProducts(products);
});
