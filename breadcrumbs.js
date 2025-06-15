const baseTrail = [
    { name: "Dashboard", url: "studentDashboard.html" },
    { name: "Books", url: "browseCategories.html" },
    { name: "Browse Categories", url: "browseCategories.html" },
    { name: "Mathematics", url: "mathCategory.html" },
    { name: "Book Details", url: "book_details_page.html" }
];

// Call this on each page with the current page name
function updateBreadcrumbs(currentPageName, currentPageURL = "#") {
    let trail = JSON.parse(localStorage.getItem("breadcrumbs")) || [...baseTrail];
    console.log("updateBreadcrumbs called with:", currentPageName, currentPageURL);
    console.log("Final breadcrumb trail:", trail);


    // Check if current page already added (last one must not match)
    const last = trail[trail.length - 1];
    if (!last || last.name !== currentPageName) {
        trail.push({ name: currentPageName, url: currentPageURL });
        localStorage.setItem("breadcrumbs", JSON.stringify(trail));
    }

    renderBreadcrumbs(trail);
}

function renderBreadcrumbs(trail) {
    const nav = document.getElementById("breadcrumbs");
    nav.innerHTML = trail.map((item, index) => {
        const isLast = index === trail.length - 1;
        return isLast
            ? `<span class="text-gray-800 font-medium">${item.name}</span>`
            : `<a href="${item.url}" class="text-blue-600 hover:underline">${item.name}</a> <span class="mx-2">›</span>`;
    }).join('');
}


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