document.addEventListener("DOMContentLoaded", function () {
    // Redirect to dashboard if user is already logged in
    if (localStorage.getItem("loggedInUser")) {
        window.location.href = "index.html";
    }

    // Toggle between login and signup forms
    window.toggleForms = function () {
        document.getElementById("login-section").classList.toggle("hidden");
        document.getElementById("signup-section").classList.toggle("hidden");
    };

    // Login functionality
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let username = document.getElementById("login-username").value;
            let password = document.getElementById("login-password").value;
            let errorMessage = document.getElementById("login-error");

            // Retrieve stored user credentials
            let storedUser = JSON.parse(localStorage.getItem(username));

            if (storedUser && storedUser.password === password) {
                localStorage.setItem("loggedInUser", username);
                window.location.href = "index.html"; // Redirect to dashboard
            } else {
                errorMessage.textContent = "Invalid username or password!";
            }
        });
    }

    // Sign-up functionality
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let newUsername = document.getElementById("signup-username").value;
            let email = document.getElementById("signup-email").value;
            let newPassword = document.getElementById("signup-password").value;
            let errorMessage = document.getElementById("signup-error");

            // Check if user already exists
            if (localStorage.getItem(newUsername)) {
                errorMessage.textContent = "Username already exists!";
                return;
            }

            // Store user details
            let newUser = { username: newUsername, email: email, password: newPassword };
            localStorage.setItem(newUsername, JSON.stringify(newUser));
            localStorage.setItem("loggedInUser", newUsername);

            window.location.href = "index.html"; // Redirect to dashboard
        });
    }
});
