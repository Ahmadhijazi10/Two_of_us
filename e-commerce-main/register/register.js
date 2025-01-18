document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Input validation
        if (!username || !email || !password || !confirmPassword) {
            alert("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!validateEmail(email)) {
            alert("Invalid email address!");
            return;
        }

        // Get existing users or initialize an empty object
        const users = JSON.parse(localStorage.getItem("users")) || {};

        // Check if username or email already exists
        for (let user in users) {
            if (users[user].email === email) {
                alert("Email is already registered!");
                return;
            }
            if (user === username) {
                alert("Username already exists!");
                return;
            }
        }

        // Save the new user
        users[username] = { username:username, email: email, password: password };
        localStorage.setItem("users", JSON.stringify(users));

        console.log("Users in localStorage after registration:", users); // Debugging

        alert("Registration successful!");
        location.href = "../login/login.html"; // Redirect after registration
    });

    // Utility function to validate email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});
