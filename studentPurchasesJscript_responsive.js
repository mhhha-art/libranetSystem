// Enhanced LibraNet4 JavaScript with Search, Button, and Sorting Functionality

document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const tableBody = document.getElementById("purchases-table-body");
  const myBookingsBtn = document.getElementById("my-bookings-btn");
  const myPurchasesBtn = document.getElementById("my-purchases-btn");
  const sortButton = document.getElementById("sort-button");
  const sortMenu = document.getElementById("sort-menu");
  const sortLabel = document.getElementById("sort-label");
  const hamburgerBtn = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const categoriesBtn = document.getElementById('categories-btn');
  const categoriesDropdown = document.getElementById('categories-dropdown');
  const installBtn = document.querySelector('.install-btn');

  // Store original table data
  let allTableRows = [];
  let currentView = "purchases"; // 'purchases' or 'bookings'

  // Initialize table data
  function initializeTableData() {
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    allTableRows = rows.map((row) => {
      const cells = row.querySelectorAll("td");
      return {
        element: row,
        title: cells[0]?.querySelector(".book-title")?.textContent || "",
        author: cells[0]?.querySelector(".book-author")?.textContent || "",
        date: cells[1]?.textContent || "",
        price: cells[2]?.textContent || "",
        status: cells[3]?.querySelector("span:last-child")?.textContent?.trim() || "",
        action: cells[4]?.textContent || "",
      };
    });
  }

  // Search functionality
  function performSearch() {
    const searchQuery = searchInput.value.toLowerCase().trim();

    if (!searchQuery) {
      // Show all rows if search is empty
      allTableRows.forEach((row) => {
        row.element.style.display = "";
      });
      return;
    }

    // Filter rows based on search query
    allTableRows.forEach((row) => {
      const searchableText = [
        row.title,
        row.author,
        row.date,
        row.price,
        row.status,
        row.action,
      ].join(" ").toLowerCase();

      if (searchableText.includes(searchQuery)) {
        row.element.style.display = "";
      } else {
        row.element.style.display = "none";
      }
    });
  }

  // Button styling functionality
  function updateButtonStyles(activeButton) {
    // Remove active class from both buttons
    myBookingsBtn.classList.remove("active");
    myPurchasesBtn.classList.remove("active");

    // Reset both buttons to light purple
    myBookingsBtn.style.backgroundColor = "#b8a8d8";
    myPurchasesBtn.style.backgroundColor = "#b8a8d8";

    // Set active button to dark purple and add active class
    if (activeButton === "bookings") {
      myBookingsBtn.style.backgroundColor = "#6b5b95";
      myBookingsBtn.classList.add("active");
      currentView = "bookings";
    } else if (activeButton === "purchases") {
      myPurchasesBtn.style.backgroundColor = "#6b5b95";
      myPurchasesBtn.classList.add("active");
      currentView = "purchases";
    }
  }

  // Sample bookings data (for demonstration)
  const bookingsData = [
    {
      title: "Meeting Room A",
      subtitle: "(Conference Room)",
      date: "May 15",
      price: "$ 25.00",
      status: "Confirmed",
      statusClass: "bg-green-100 text-green-800",
      statusDot: "bg-green-400",
      action: "Details",
    },
    {
      title: "Computer Lab 1",
      subtitle: "(Programming Lab)",
      date: "May 12",
      price: "$ 15.00",
      status: "Pending",
      statusClass: "bg-yellow-100 text-yellow-800",
      statusDot: "bg-yellow-400",
      action: "Cancel",
    },
    {
      title: "Study Room B",
      subtitle: "(Quiet Study)",
      date: "May 8",
      price: "$ 10.00",
      status: "Completed",
      statusClass: "bg-blue-100 text-blue-800",
      statusDot: "bg-blue-400",
      action: "Rebook",
    },
  ];

  // Sample purchases data (current data)
  const purchasesData = [
    {
      title: "Calculus Transcendentals",
      subtitle: "(J.Stewart)",
      date: "May 10",
      price: "$ 32.99",
      status: "Ready for pick-up",
      statusClass: "bg-yellow-100 text-yellow-800",
      statusDot: "bg-yellow-400",
      action: "Receipt",
    },
    {
      title: "Digital Ethic",
      subtitle: "(J.Moor)",
      date: "May 16",
      price: "$ 19.00",
      status: "Delivered",
      statusClass: "bg-green-100 text-green-800",
      statusDot: "bg-green-400",
      action: "Receipt",
    },
    {
      title: "UX for Beginners",
      subtitle: "(J.Krug)",
      date: "May 5",
      price: "$ 24.99",
      status: "Delivered",
      statusClass: "bg-green-100 text-green-800",
      statusDot: "bg-green-400",
      action: "Receipt",
    },
    {
      title: "Clean Code",
      subtitle: "(R.Martin)",
      date: "May 2",
      price: "$ 28.00",
      status: "Cancelled",
      statusClass: "bg-red-100 text-red-800",
      statusDot: "bg-red-400",
      action: "Reorder",
    },
    {
      title: "Emotional Design",
      subtitle: "(D.Norman)",
      date: "May 1",
      price: "$ 22.00",
      status: "Cancelled",
      statusClass: "bg-red-100 text-red-800",
      statusDot: "bg-red-400",
      action: "Reorder",
    },
    {
      title: "Thinking Fast & Slow",
      subtitle: "(D. Kahneman)",
      date: "Apr 28",
      price: "$ 26.75",
      status: "Delivered",
      statusClass: "bg-green-100 text-green-800",
      statusDot: "bg-green-400",
      action: "Receipt",
    },
  ];

  // Function to populate table with data
  function populateTable(data, headerText) {
    // Update page title
    const pageTitle = document.querySelector("h1");
    if (pageTitle) {
      pageTitle.textContent = headerText;
    }

    // Clear existing table content
    tableBody.innerHTML = "";

    // Populate with new data
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>
                    <div class="book-inline">
                        <span class="book-title">${item.title}</span>
                        <span class="book-author">${item.subtitle}</span>
                    </div>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${item.date}</td>
                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${item.price}</td>
                <td class="px-4 py-2 whitespace-nowrap">
                    <span class="inline-flex items-center">
                        <span class="w-2 h-2 ${item.statusDot} rounded-full mr-1"></span>
                        <span class="text-sm">${item.status}</span>
                    </span>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm">
                    <a href="#" class="text-purple-800 hover:text-purple-900 underline">${item.action}</a>
                </td>
            `;
      tableBody.appendChild(row);
    });

    // Reinitialize table data for search
    initializeTableData();
  }

  // Sorting functionality
  function sortTable(criteria) {
    let sortedData = [...allTableRows]; // Use a copy for sorting

    switch (criteria) {
      case "newest":
        sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
    }

    // Clear and re-populate table with sorted data
    tableBody.innerHTML = "";
    sortedData.forEach((row) => {
      tableBody.appendChild(row.element);
    });
  }

  // Event listeners
  if (searchButton) {
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      performSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        performSearch();
      }
    });
  }

  if (myBookingsBtn) {
    myBookingsBtn.addEventListener("click", function () {
      updateButtonStyles("bookings");
      populateTable(bookingsData, "My Bookings");
    });
  }

  if (myPurchasesBtn) {
    myPurchasesBtn.addEventListener("click", function () {
      updateButtonStyles("purchases");
      populateTable(purchasesData, "Recent Purchases");
    });
  }

  if (sortButton) {
    sortButton.addEventListener("click", function () {
      sortMenu.classList.toggle("hidden");
    });
  }

  if (sortMenu) {
    sortMenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        const sortCriteria = e.target.dataset.sort;
        sortLabel.textContent = e.target.textContent; // Update button label
        sortTable(sortCriteria);
        sortMenu.classList.add("hidden"); // Hide menu after selection
      }
    });
  }

  // Hamburger menu functionality
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.toggle('hidden');
      sidebar.classList.toggle('active');
    });
  }

  // Categories dropdown functionality
  if (categoriesBtn) {
    categoriesBtn.addEventListener('click', () => {
      categoriesDropdown.classList.toggle('hidden');
    });
  }

  // Install button functionality
  if (installBtn) {
    installBtn.addEventListener('click', () => {
      alert('Install button clicked!'); // Placeholder for actual install logic
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (event) => {
    if (sortMenu && !sortButton.contains(event.target) && !sortMenu.contains(event.target)) {
      sortMenu.classList.add('hidden');
    }
    if (categoriesDropdown && !categoriesBtn.contains(event.target) && !categoriesDropdown.contains(event.target)) {
      categoriesDropdown.classList.add('hidden');
    }
  });

  // Initialize the page
  initializeTableData();
  updateButtonStyles("purchases"); // Start with purchases active
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

