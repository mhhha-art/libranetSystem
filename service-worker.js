const cacheName = "libranet-cache-v3";
const filesToCache = [
  "./",

  "./loginRole.html",
  "./login.css",
  "./login.js",

  "./loginAdmin.html",
 
  "./loginLibrarian.html",
 
   "./loginStudent.html",


  "./book_details_page.html",
  "./book_details_page.css",
  "./book_details_page.js",

  "./buy_page_2.html",
  "./buy_page_2.css",
  "./buy_page_2.js",

  "./confirmed_page_2.html",
  "./confirmed_page_2.css",
  "./confirmed_page_2.js",


  "./studentDashboard.html",
  "./studentDashboard.css",
  "./studentDashboard.js",



  "./studentDashboard.html",
  "./studentDashboard.css",
  "./studentDashboard.js",
  "./browseCategories.html",
  "./browseCategories.css",
  "./browseCategories.js",
  "./mathCategory.html",
  "./mathCategory.css",
  "./mathCategory.js",
  "./manifest.json",
  "./book-192.png",
  "./book-512.png",
  "./Sale.png",

  '/notifications.html',
		'/loginhtml.html',
		'/librarianBookingRequests_responsive.html',
        '/overallCSS_responsive.css',
		'/logincss.css',
		'/overallCSS_responsive2.css',
        '/librarianDashboardJscript_responsive.js',
		'/loginScript.js',
		'/librarianBookingRequestsJscript_responsive.js',


    "./index.html",
  "./add-librarian.html",
  "./css/styles.css",
  "./js/dashboard.js",
  "./js/add-librarian-js.js",




];

self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Caching files...");
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => {
        // Fallback to studentDashboard if navigating offline
        if (event.request.mode === "navigate") {
          return caches.match("./studentDashboard.html");
        }
      });
    })
  );
});

