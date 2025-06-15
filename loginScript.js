// Toggle password visibility
document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordField = document.getElementById("password");
  const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  this.querySelector("i").classList.toggle("fa-eye");
  this.querySelector("i").classList.toggle("fa-eye-slash");
});

// Enable login button only if email and password meet basic validation
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

function validateInputs() {
  const emailValid = emailInput.value.includes("@");
  const passwordValid = passwordInput.value.length >= 8;

  document.getElementById("emailError").classList.toggle("hidden", emailValid);
  document.getElementById("passwordError").classList.toggle("hidden", passwordValid);
  loginBtn.disabled = !(emailValid && passwordValid);
  loginBtn.className = loginBtn.disabled ? "btn-disabled" : "btn-enabled";
}

emailInput.addEventListener("input", validateInputs);
passwordInput.addEventListener("input", validateInputs);

// Login action
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Optional: add final validation check here again if needed

  // Show success alert
  alert("✅ You are now logged in!");

  // Redirect to dashboard after short delay
  setTimeout(() => {
    window.location.href = "librarianDashboard_responsive.html"; // <-- change this to your dashboard file
  }, 500); // 0.5 second delay
});


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker2.js")
      .then(registration => {
        console.log("Service Worker registered: ", registration);
      })
      .catch(error => {
        console.error("Service Worker registration failed: ", error);
      });
  });
}
