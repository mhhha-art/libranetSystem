document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('addLibrarianForm');
  const submitBtn = document.getElementById('submitBtn');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const sidebar = document.querySelector('.sidebar');

  const errorMessages = {
    firstName: "Minimum 2 letters (no numbers/special chars)",
    lastName: "Minimum 2 letters (no numbers/special chars)",
    email: "Must be a valid Gmail address",
    librarianId: "Must be 'LIB' followed by 4 digits",
    phone: "Must be +971 followed by 9 digits",
    password: "8+ chars with uppercase, lowercase and number",
    confirmPassword: "Passwords must match",
    profilePhoto: "Please select an image (max 2MB)"
  };

  // Password visibility toggle
  document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function () {
      const input = this.previousElementSibling;
      input.type = input.type === 'password' ? 'text' : 'password';
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });
  });

  // Validate password match
  function validatePasswordMatch() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const errorElement = document.getElementById('confirmPasswordError');

    if (confirmPassword.value && password.value !== confirmPassword.value) {
      errorElement.textContent = errorMessages.confirmPassword;
      return false;
    }
    errorElement.textContent = '';
    return true;
  }

  // Validate individual fields
  function validateField(field) {
    const errorElement = document.getElementById(`${field.id}Error`);
    if (!field.required && !field.value) {
      errorElement.textContent = '';
      return true;
    }
    if (field.validity.valid) {
      errorElement.textContent = '';
      return true;
    }
    errorElement.textContent = errorMessages[field.id] || field.validationMessage;
    return false;
  }

  // Profile photo validation and preview
  document.getElementById('profilePhoto').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const errorElement = document.getElementById('profilePhotoError');
    const preview = document.getElementById('previewImage');

    if (file) {
      if (!file.type.match('image.*') || file.size > 2 * 1024 * 1024) {
        errorElement.textContent = errorMessages.profilePhoto;
        this.value = '';
        preview.src = 'assets/placeholder.jpg';
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    errorElement.textContent = '';
  });

  // Live input validation
  form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function () {
      if (this.id === 'confirmPassword') {
        validatePasswordMatch();
      } else {
        validateField(this);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;
    form.querySelectorAll('input[required]').forEach(input => {
      if (!validateField(input)) isValid = false;
    });

    if (!validatePasswordMatch()) isValid = false;

    if (isValid) {
      const confirmAdd = confirm("Are you sure you want to add this librarian?");
      if (confirmAdd) {
        alert("Librarian added successfully!");
        form.reset();
        document.getElementById('previewImage').src = 'assets/placeholder.jpg';
      } else {
        alert("Operation cancelled.");
      }
    } else {
      submitBtn.classList.add('shake');
      setTimeout(() => submitBtn.classList.remove('shake'), 500);
    }
  });

  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('mobile-visible');
    mobileMenuToggle.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 768 && 
        !e.target.closest('.sidebar') && 
        !e.target.closest('.mobile-menu-toggle')) {
      sidebar.classList.remove('mobile-visible');
      mobileMenuToggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

  // Submenu toggle functionality
  document.querySelectorAll('.submenu-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      const submenu = this.nextElementSibling;
      if (submenu && submenu.classList.contains('submenu')) {
        submenu.classList.toggle('show');
      }
    });
  });

  // Close submenu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.submenu-toggle') && !e.target.closest('.submenu')) {
      document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.classList.remove('show');
      });
      document.querySelectorAll('.submenu-toggle').forEach(toggle => {
        toggle.classList.remove('active');
      });
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      sidebar.classList.remove('mobile-visible');
      mobileMenuToggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
});

// Service Worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}