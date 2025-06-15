// Hamburger menu functionality for mobile sidebar
    document.addEventListener("DOMContentLoaded", function () {
      const hamburger = document.getElementById("hamburger");
      const sidebar = document.getElementById("sidebar");

      if (hamburger && sidebar) {
        hamburger.addEventListener("click", function () {
          sidebar.classList.toggle("hidden");
        });
      }
    });

    // Password toggle functionality
    document.addEventListener("DOMContentLoaded", function () {
      const togglePassword = document.getElementById("togglePassword");
      const passwordField = document.getElementById("password");

      if (togglePassword && passwordField) {
        togglePassword.addEventListener("click", function () {
          const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
          passwordField.setAttribute("type", type);

          const icon = togglePassword.querySelector("i");
          if (type === "password") {
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
          } else {
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
          }
        });
      }
    });

    // Form validation
    document.addEventListener("DOMContentLoaded", function () {
      const emailField = document.getElementById("email");
      const passwordField = document.getElementById("password");
      const loginBtn = document.getElementById("loginBtn");
      const emailError = document.getElementById("emailError");
      const passwordError = document.getElementById("passwordError");

      function validateForm() {
        const email = emailField.value.trim();
        const password = passwordField.value.trim();

        let isValid = true;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          emailError.classList.remove("hidden");
          isValid = false;
        } else {
          emailError.classList.add("hidden");
        }

        // Password validation
        if (!password || password.length < 8) {
          passwordError.classList.remove("hidden");
          isValid = false;
        } else {
          passwordError.classList.add("hidden");
        }

        // Update button state
        if (isValid && email && password) {
          loginBtn.disabled = false;
          loginBtn.className = "btn-enabled";
        } else {
          loginBtn.disabled = true;
          loginBtn.className = "btn-disabled";
        }
      }

      emailField.addEventListener("input", validateForm);
      passwordField.addEventListener("input", validateForm);
    });