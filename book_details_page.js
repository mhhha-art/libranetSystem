let deferredPrompt;

document.addEventListener("DOMContentLoaded", function () {
    // PWA Install setup
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

    // Carousel
    window.scrollCarousel = function (direction) {
        const carousel = document.getElementById("carousel");
        if (carousel) {
            const scrollAmount = 200;
            carousel.scrollLeft += direction * scrollAmount;
        }
    };

    // Categories Dropdown
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

    // Sidebar
    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");

    if (hamburger && sidebar) {
        hamburger.addEventListener("click", function () {
            sidebar.classList.toggle("hidden");
        });
    }

    // Menu Highlighting
    const items = document.querySelectorAll(".menu-item");

    items.forEach(item => {
        item.addEventListener("click", () => {
            items.forEach(i => {
                i.querySelector(".arrow")?.classList.add("hidden");
                i.classList.remove("bg-[#a6947e]");
            });

            item.querySelector(".arrow")?.classList.remove("hidden");
            item.classList.add("bg-[#a6947e]");
        });
    });

    // TOC Toggle — THIS is now inside DOMContentLoaded
    const toggleBtn = document.getElementById("toggle-toc");
    const moreItems = document.querySelectorAll(".more");

    if (toggleBtn && moreItems.length > 0) {
        toggleBtn.addEventListener("click", () => {
            const isHidden = moreItems[0].classList.contains("hidden");
            moreItems.forEach(item => item.classList.toggle("hidden"));
            toggleBtn.textContent = isHidden ? "Show Less" : "Show More";
        });
    }

    // Buy Button
    const buyBtn = document.getElementById("buy-button");
    if (buyBtn) {
        buyBtn.addEventListener("click", function () {
            window.open("buy_page_2.html", "_blank");
        });
    }
});

// This part should remain outside because it listens for a system event
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installButtons = document.querySelectorAll('.install-btn');
    installButtons.forEach(btn => {
        btn.style.display = 'inline-block';
        btn.disabled = false;
    });
});