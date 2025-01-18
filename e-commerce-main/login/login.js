document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("users")) || {};

        console.log("Users in localStorage during login:", users);

        if (users[username] && users[username].password === password) {
            // Successful login
            alert(`Welcome, ${username}!`);
            localStorage.setItem('isLoggedIn', 'true'); // Update login status
            localStorage.setItem('username', username);
            location.href = "../home/index.html"; // Redirect to home page
        } else {
            alert("Invalid username or password!");
        }
    });
});
    