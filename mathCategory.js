// Hamburger menu functionality for mobile sidebar
    document.addEventListener("DOMContentLoaded", function () {
      const hamburger = document.getElementById("hamburger");
      const sidebar = document.getElementById("sidebar");

      if (hamburger && sidebar) {
        hamburger.addEventListener("click", function () {
          sidebar.classList.toggle("hidden");
        });
      }


      



      document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      // Remove "selected" from all
      document.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
      // Add "selected" to the clicked one
      this.classList.add('selected');
    });
  });

      // Filter dropdown functionality
      const filterBtn = document.getElementById("filter-btn");
      const filterDropdown = document.getElementById("filter-dropdown");

      if (filterBtn && filterDropdown) {
        filterBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          filterDropdown.classList.toggle("hidden");
        });

        document.addEventListener("click", function (event) {
          if (!filterBtn.contains(event.target) && !filterDropdown.contains(event.target)) {
            filterDropdown.classList.add("hidden");
          }
        });

        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape") {
            filterDropdown.classList.add("hidden");
          }
        });
      }
    });



 document.addEventListener("DOMContentLoaded", function () {
      const categoriesBtn = document.getElementById("categories-btn");
      const categoriesDropdown = document.getElementById("categories-dropdown");

      if (categoriesBtn && categoriesDropdown) {
        categoriesBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          categoriesDropdown.classList.toggle("hidden");
        });

        document.addEventListener("click", function (event) {
          if (
            !categoriesBtn.contains(event.target) &&
            !categoriesDropdown.contains(event.target)
          ) {
            categoriesDropdown.classList.add("hidden");
          }
        });

        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape") {
            categoriesDropdown.classList.add("hidden");
          }
        });
      }

    });













      function sortBooksBy(type) {
    const container = document.getElementById("book-list");
    const books = Array.from(container.getElementsByClassName("book-card"));

    let sorted = books.sort((a, b) => {
      if (type === "latest") {
        return new Date(b.dataset.date) - new Date(a.dataset.date);
      } else if (type === "earliest") {
        return new Date(a.dataset.date) - new Date(b.dataset.date);
      } else {
        return b.dataset[type] - a.dataset[type]; // popularity or usage
      }
    });

    sorted.forEach(book => container.appendChild(book)); // reinsert in sorted order
  }

  // Optional: link buttons or dropdown items
  document.querySelectorAll("[data-sort]").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sortType = this.dataset.sort;
      sortBooksBy(sortType);
    });
  });




  let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Save the event for later use
  deferredPrompt = e;

  // Show all install buttons (in case they were hidden)
  document.querySelectorAll('.install-btn').forEach(btn => {
    btn.style.display = 'inline-block'; // or 'flex' depending on your button styling
    btn.disabled = false; // enable button if disabled
  });
});

document.querySelectorAll('.install-btn').forEach(button => {
  // Initially hide or disable install buttons until prompt is available
  button.style.display = 'none';
  button.disabled = true;

  button.addEventListener('click', async () => {
    if (!deferredPrompt) {
      alert('Install prompt not available yet. Please try again later.');
      return;
    }
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's choice
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the saved prompt since it can only be used once
    deferredPrompt = null;

    // Hide install buttons after prompt
    document.querySelectorAll('.install-btn').forEach(btn => {
      btn.style.display = 'none';
      btn.disabled = true;
    });
  });
});




    // Service Worker registration (from index.html)
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("service-worker.js")
          .then((reg) => {
            console.log("Service Worker registered!", reg);
          })
          .catch((err) => {
            console.log("Service Worker registration failed: ", err);
          });
      });
    }