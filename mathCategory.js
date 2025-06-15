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