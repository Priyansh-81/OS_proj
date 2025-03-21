document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("admin-login-form");
    const loginError = document.getElementById("login-error");

    if (!loginForm) {
        console.error("Login form not found. Check the form ID in HTML.");
        return;
    }

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Reset error message
        loginError.textContent = "";
        loginError.style.display = "none";

        if (!email || !password) {
            loginError.textContent = "Please fill in all fields.";
            loginError.style.display = "block";
            return;
        }

        // Simulated admin credentials (Replace with backend authentication)
        const adminEmail = "admin@example.com";
        const adminPassword = "admin123";

        if (email === adminEmail && password === adminPassword) {
            alert("Login successful!");
            window.location.href = "admin-dashboard.html"; // Redirect
        } else {
            loginError.textContent = "Invalid email or password. Please try again.";
            loginError.style.display = "block";
        }
    });
});