document.addEventListener("DOMContentLoaded", function () {
    // Check for session token (example)
    if (localStorage.getItem("token")) {
        // Send token to server for validation
        fetch('/api/validateToken', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                window.location.href = 'https://acunetix2.github.io/Acunetix-Security-inc/';
            } else {
                localStorage.removeItem('token'); // Remove invalid token
            }
        })
        .catch(error => {
            console.error("Token validation error:", error);
            localStorage.removeItem('token'); // Remove token on error
        });
    }

    // ... (toggleForms, loginForm, signupForm logic with server-side API calls) ...

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            // ... get username/password ...
            fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('token', data.token); // Store token
                    window.location.href = 'https://acunetix2.github.io/Acunetix-Security-inc/';
                } else {
                    // ... error handling ...
                }
            });
        });
    }

    // ... (similar server-side API calls for signup) ...
});
