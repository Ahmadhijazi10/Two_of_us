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
    // {
    //     id: 2,
    //     name: "Iphone 11 Pro",
    //     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //     price: 800.99,
    //     img: "./image/phone2.png",
    //     colors: ["black", "white", "silver", "blue"],
    //     rating: 4.5
    // },
    // {
    //     id: 2,
    //     name: "Iphone 11 Pro Max",
    //     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //     price: 800.99,
    //     img: "./image/phone2.png",
    //     colors: ["black", "white", "silver", "blue"],
    //     rating: 4.5
    // },
    {
        id: 3,
        name: "Iphone 12",
        description: " The iPhone 12 offers 5G connectivity, Ceramic Shield for durability, and a stunning OLED display, all powered by the A14 Bionic chip.",
        price: 400,
        img: "./image/iphone 12.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 3
    },
    // {
    //     id: 3,
    //     name: "Iphone 12 Pro",
    //     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //     price: 575.99,
    //     img: "./image/phone3.png",
    //     colors: ["black", "white", "silver", "blue"],
    //     rating: 4.0
    // },
    // {
    //     id: 3,
    //     name: "Iphone 12 Pro Max",
    //     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //     price: 575.99,
    //     img: "./image/phone3.png",
    //     colors: ["black", "white", "silver", "blue"],
    //     rating: 4.0
    // },
    {
        id: 4,
        name: "Iphone 13",
        description: "The iPhone 13 introduces improved battery life, a smaller notch, and enhanced camera features, while still offering exceptional performance with the A15 Bionic chip.",
        price: 450,
        img: "./image/iphone 13.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 3
    },
    // {
    //     id: 4,
    //     name: "Iphone 13 Pro",
    //     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //     price: 320.99,
    //     img: "./image/phone4.png",
    //     colors: ["black", "white", "silver", "blue"],
    //     rating: 4.0
    // },
    // {
    //     id: 4,
    //     name: "Iphone 13 Pro Max",
    //     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //     price: 320.99,
    //     img: "./image/phone4.png",
    //     colors: ["black", "white", "silver", "blue"],
    //     rating: 4.0
    // },
    {
        id: 5,
        name: "Iphone 14",
        description: "The iPhone 14 boasts advanced safety features like crash detection, a larger 48MP camera, and a refined design with the A15 Bionic chip.",
        price: 500,
        img: "./image/iphone 14.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 3.5
    },
    // {
    //     id: 5,
    //     name: "Iphone 14 Pro",
    //     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //     price: 320.99,
    //     img: "./image/phone4.png",
    //     colors: ["black", "white", "silver", "blue"],
    //     rating: 4.0
    // },
    // {
    //     id: 5,
    //     name: "Iphone 14 Pro Max",
    //     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //     price: 320.99,
    //     img: "./image/phone4.png",
    //     colors: ["black", "white", "silver", "blue"],
    //     rating: 4.0
    // },
    {
        id: 6,
        name: "Iphone 15",
        description: " The iPhone 15 offers faster performance with the A16 Bionic chip, an improved camera system, and the Dynamic Island for a more immersive experience.",
        price: 600,
        img: "./image/iphone 15.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 3.5
    },
    // {
    //     id: 6,
    //     name: "Iphone 15 Pro",
    //     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //     price: 320.99,
    //     img: "./image/phone4.png",
    //     colors: ["black", "white", "silver", "blue"],
    //     rating: 4.0
    // },
    // {
    //     id: 6,
    //     name: "Iphone 15 Pro Max",
    //     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //     price: 320.99,
    //     img: "./image/phone4.png",
    //     colors: ["black", "white", "silver", "blue"],
    //     rating: 4.0
    // },
    {
        id: 7,
        name: "Iphone 16",
        description: "The iPhone 16 features cutting-edge innovations, including a ProMotion display, new camera technology, and faster processing with the A17 Bionic chip for ultimate performance.",
        price: 900,
        img: "./image/iphone 16.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 4.5
    },
    // {
    //     id: 7,
    //     name: "Iphone 16 Pro",
    //     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //     price: 320.99,
    //     img: "./image/phone4.png",
    //     colors: ["black", "white", "silver", "blue"],
    //     rating: 4.0
    // },
    // {
    //     id: 7,
    //     name: "Iphone 16 Pro Max",
    //     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //     price: 320.99,
    //     img: "./image/phone4.png",
    //     colors: ["black", "white", "silver", "blue"],
    //     rating: 4.0
    // },
    {
        id: 8,
        name: "Cover X",
        description: "Cover iphone X iPhone covers shield the phone, add style, and may include extra functions like stands or cardholders.",
        price: 40,
        img: "./image/cover x.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 4.0
    },
    {
        id: 8,
        name: "Cover 11",
        description: "Cover iphone 11 iPhone covers shield the phone, add style, and may include extra functions like stands or cardholders.",
        price: 40,
        img: "./image/cover 11.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 4.0
    },
    {
        id: 8,
        name: "Cover 12",
        description: "Cover iphone 12 iPhone covers shield the phone, add style, and may include extra functions like stands or cardholders.",
        price: 40,
        img: "./image/cover 12.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 4.0
    },
    {
        id: 8,
        name: "Cover 13",
        description: "Cover iphone 13 iPhone covers shield the phone, add style, and may include extra functions like stands or cardholders.",
        price: 40,
        img: "./image/cover 13.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 4.0
    },
    {
        id: 8,
        name: "Cover 14",
        description: "Cover iphone 14 iPhone covers shield the phone, add style, and may include extra functions like stands or cardholders.",
        price: 40,
        img: "./image/cover 14.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 4.0
    },
    {
        id: 8,
        name: "Cover 15",
        description: "Cover iphone 15 iPhone covers shield the phone, add style, and may include extra functions like stands or cardholders.",
        price: 40,
        img: "./image/cover 15.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 4.0
    },
    {
        id: 8,
        name: "Cover 16",
        description: "Cover iphone 16 iPhone covers shield the phone, add style, and may include extra functions like stands or cardholders.",
        price: 40,
        img: "./image/cover 16.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 4.0
    },
    {
        id: 9,
        name: "Airphods",
        description: " AirPods deliver high-quality sound, seamless integration with Apple devices, and a comfortable, wireless listening experience with the convenience of automatic pairing and long battery life.",
        price: 150,
        img: "./image/airphods.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 4.0
    },
    {
        id: 10,
        name: "Disc Charger ",
        description: "The disc charger offers a sleek, compact design to wirelessly charge your devices with fast charging capabilities and a stylish, minimalist look.",
        price: 20,
        img: "./image/Charge Disc.png",
        colors: ["black", "white", "silver", "blue"],
        rating: 4.0
    },
    // Add more products as needed...
];

// Function to dynamically generate product cards
function displayProducts(productsList) {
    const productsHTML = productsList.map((product) => {
            const colorOptions = product.colors.map((color) => `
                <label>
                    <input type="radio" name="color-${product.id}" value="${color}">
                    <span class="color-circle" style="background-color: ${color}; " title="${color.charAt(0).toUpperCase() + color.slice(1)}"></span>
                </label>
            `).join("");

        // Calculate the star rating based on the product's rating
        const fullStars = Math.floor(product.rating);
        const halfStar = product.rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        const starIcons = [
            ...Array(fullStars).fill('<i class="fa-solid fa-star"></i>'),
            ...Array(halfStar).fill('<i class="fa-solid fa-star-half-stroke"></i>'),
            ...Array(emptyStars).fill('<i class="fa-solid fa-star" style="color: #ddd;"></i>')  // Empty stars are grey
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
                    <button class="btn vise-btn" onclick="addToCart('${product.name}', ${product.price}, getSelectedColor('color-${product.id}'))">Add to Cart</button>
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

// Function to sort the products
function sortProducts(criteria, order) {
    let sortedProducts;

    if (criteria === 'price') {
        sortedProducts = [...products].sort((a, b) => {
            return order === 'asc' ? a.price - b.price : b.price - a.price;
        });
    } else if (criteria === 'rating') {
        sortedProducts = [...products].sort((a, b) => {
            return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        });
    }

    displayProducts(sortedProducts); // Call the function to display sorted products
}

// Call the function on page load
window.addEventListener("DOMContentLoaded", () => {
    displayProducts(products);
});

// Helper function to get the selected color
function getSelectedColor(groupName) {
    const selectedColor = document.querySelector(`input[name="${groupName}"]:checked`);
    return selectedColor ? selectedColor.value : "No color selected";
}
// Function to filter and display products based on the search input
function searchProducts() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchInput)
    );
    displayProducts(filteredProducts); // Reuse the displayProducts function
}

// Attach the search functionality to the search button
document.getElementById("search-button").addEventListener("click", searchProducts);

// Optional: Enable searching by pressing Enter
document.getElementById("search-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchProducts();
    }
});

// window.addEventListener('load', () => {
//     const logoutButton = document.getElementById('logoutButton');
//     const loginButton = document.getElementById('loginButton');
//     const registerButton = document.getElementById('registerButton');
//     const restrictedButtons = document.querySelectorAll(".res");
//     const addToCartButton = document.getElementById('dis');
//     const usernameDisplay = document.getElementById('usernameDisplay');
//     const usernameSpan = document.getElementById('username');   
//     // Get user login status and username from localStorage
//     const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check login status
//     const username = localStorage.getItem('username'); // Retrieve the username

//     if (isLoggedIn) {
//         // If logged in, show username and enable certain buttons
//         if (username && usernameSpan) {
//             usernameSpan.textContent = username; // Set the username text
//             usernameDisplay.style.display = 'inline-block'; // Show the username display
//         }
//         logoutButton.style.display = 'block'; // Show logout button
//         loginButton.style.display = 'none'; // Hide login button
//         registerButton.style.display = 'none'; // Hide register button
//         addToCartButton.disabled = false; // Enable add to cart button

//         // Enable restricted buttons
//         restrictedButtons.forEach(button => {
//             button.disabled = false; // Enable button
//         });
//     } else {
//         // If not logged in, hide username and disable buttons
//         usernameDisplay.style.display = 'none'; // Hide username display
//         logoutButton.style.display = 'none'; // Hide logout button
//         loginButton.style.display = 'block'; // Show login button
//         registerButton.style.display = 'block'; // Show register button
//         addToCartButton.disabled = true; // Disable add to cart button

//         // Disable restricted buttons
//         restrictedButtons.forEach(button => {
//             button.disabled = true; // Disable button
//         });
//     }
// });

document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    localStorage.removeItem('username');  // Clear the username
    location.reload(); // Refresh the page
});