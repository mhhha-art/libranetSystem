

document.addEventListener("DOMContentLoaded", function () {
  const notificationToggle = document.getElementById("notification-toggle");
  const notificationToggleMobile = document.getElementById("notification-toggle-mobile");
  const notificationDropdown = document.getElementById("notification-dropdown");

  const categoriesBtn = document.getElementById("categories-btn");
  const categoriesDropdown = document.getElementById("categories-dropdown");

  const bookingRequests = document.getElementById("booking-requests");

  // Hamburger menu functionality for mobile sidebar
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  if (hamburger && sidebar) {
    hamburger.addEventListener("click", function () {
      sidebar.classList.toggle("hidden");
    });
  }

  // Notifications toggle for desktop
  if (notificationToggle && notificationDropdown) {
    notificationToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      // Only toggle dropdown if on desktop view
      if (window.innerWidth > 768) {
        notificationDropdown.classList.toggle("hidden");

        // Toggle highlight class (like hover fill)
        if (notificationDropdown.classList.contains("hidden")) {
          notificationToggle.classList.remove("bg-[#6D7F96]");
        } else {
          notificationToggle.classList.add("bg-[#6D7F96]");
        }

        // Close categories if open
        if (categoriesDropdown) {
          categoriesDropdown.classList.add("hidden");
        }
      }
    });
  }

  // Notifications redirection for mobile
  if (notificationToggleMobile) {
    notificationToggleMobile.addEventListener("click", function (e) {
      e.stopPropagation();
      // Redirect to notifications.html if on mobile view
      if (window.innerWidth <= 768) {
        window.location.href = "notifications.html";
      }
    });
  }

  // Categories toggle
  if (categoriesBtn && categoriesDropdown) {
    categoriesBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      categoriesDropdown.classList.toggle("hidden");

      // Close notifications if open
      if (notificationDropdown) {
        notificationDropdown.classList.add("hidden");
        if (notificationToggle) {
          notificationToggle.classList.remove("bg-[#6D7F96]");
        }
      }
    });
  }

  // Click outside to close both dropdowns (desktop only)
  document.addEventListener("click", function (e) {
    if (window.innerWidth > 768) { // Only apply for desktop
      if (notificationDropdown && notificationToggle && 
          !notificationDropdown.contains(e.target) &&
          !notificationToggle.contains(e.target)) {
        notificationDropdown.classList.add("hidden");
        if (notificationToggle) {
          notificationToggle.classList.remove("bg-[#6D7F96]");
        }
      }

      if (categoriesDropdown && categoriesBtn &&
          !categoriesDropdown.contains(e.target) &&
          !categoriesBtn.contains(e.target)) {
        categoriesDropdown.classList.add("hidden");
      }
    }
  });

  // Redirect to libranet3.html when "Booking Requests" is clicked
  if (bookingRequests) {
    bookingRequests.addEventListener("click", function () {
      window.location.href = "librarianBookingRequests_responsive.html";
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 768 && sidebar && hamburger &&
        !sidebar.contains(e.target) && 
        !hamburger.contains(e.target) &&
        !sidebar.classList.contains("hidden")) {
      sidebar.classList.add("hidden");
    }
  });

  // Handle window resize to show/hide sidebar appropriately
  window.addEventListener("resize", function () {
    if (sidebar) {
      if (window.innerWidth > 768) {
        sidebar.classList.remove("hidden");
      } else {
        sidebar.classList.add("hidden");
      }
    }
  });

  // PWA Install functionality
  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    document.querySelectorAll(".install-btn").forEach(btn => {
      btn.style.display = "inline-block";
      btn.disabled = false;
    });
  });

  document.querySelectorAll(".install-btn").forEach(button => {
    button.style.display = "none";
    button.disabled = true;

    button.addEventListener("click", async () => {
      if (!deferredPrompt) {
        alert("Install prompt not available yet. Please try again later.");
        return;
      }
      deferredPrompt.prompt();

      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }

      deferredPrompt = null;

      document.querySelectorAll(".install-btn").forEach(btn => {
        btn.style.display = "none";
        btn.disabled = true;
      });
    });
  });

  // Notifications page specific functionality
  const viewAllRequestsBtn = document.getElementById("view-all-requests");
  const moreNotifications = document.querySelectorAll(".more-notifications");

  if (viewAllRequestsBtn && moreNotifications.length > 0) {
    viewAllRequestsBtn.addEventListener("click", function() {
      moreNotifications.forEach(item => {
        item.classList.toggle("hidden");
      });

      if (viewAllRequestsBtn.textContent === "View All Requests") {
        viewAllRequestsBtn.textContent = "View Less Requests";
      } else {
        viewAllRequestsBtn.textContent = "View All Requests";
      }
    });
  }
});



if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then(registration => {
        console.log("Service Worker registered: ", registration);
      })
      .catch(error => {
        console.error("Service Worker registration failed: ", error);
      });
  });
}





