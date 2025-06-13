

async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('LibraNetDB', 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('trendingBooks')) {
        db.createObjectStore('trendingBooks', { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Convert image URL to blob for storage
async function fetchAndConvertImageToBlob(url) {
  const response = await fetch(url);
  return await response.blob();
}

// Save books to IndexedDB
async function saveTrendingBooks(books) {
  const db = await openDB();
  const tx = db.transaction('trendingBooks', 'readwrite');
  const store = tx.objectStore('trendingBooks');

  for (const book of books) {
    const imageBlob = await fetchAndConvertImageToBlob(book.imageUrl);
    await store.put({
      id: book.id,
      title: book.title,
      author: book.author,
      imageBlob: imageBlob,
    });
  }

  await tx.complete;
  db.close();
}

// Load saved books from IndexedDB
async function getSavedBooks() {
  const db = await openDB();
  const tx = db.transaction('trendingBooks', 'readonly');
  const store = tx.objectStore('trendingBooks');

  const allBooks = [];
  return new Promise((resolve, reject) => {
    const request = store.openCursor();
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        allBooks.push(cursor.value);
        cursor.continue();
      } else {
        resolve(allBooks);
        db.close();
      }
    };
    request.onerror = () => reject(request.error);
  });
}

// Render books into the page
function renderBooks(books) {
  const container = document.getElementById('carousel');
  container.innerHTML = '';
  books.forEach(book => {
    // Create a URL for the blob image to show
    const imageURL = URL.createObjectURL(book.imageBlob);

    const bookDiv = document.createElement('div');
    bookDiv.style.marginBottom = '20px';
    bookDiv.innerHTML = `
      <img src="${imageURL}" alt="${book.title}" style="width:100px; height:auto;">
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
    `;
    container.appendChild(bookDiv);
  });
}

// Example hardcoded trending books data
const trendingBooks = [
  {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    imageUrl: 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg',
  },
  {
    id: '2',
    title: 'The Power of Habit',
    author: 'Charles Duhigg',
    imageUrl: 'https://media.s-bol.com/3G5BnolANZnA/AyN5n9/550x837.jpg',
  },
  {
    id: '3',
    title: 'The Age of AI',
    author: 'Henry A. Kissinger',
    imageUrl: 'https://media.thegospelcoalition.org/wp-content/uploads/2023/08/30115001/ai-future-of-human.jpg',
  },
  {
    id: '4',
    title: 'How AI Ate the World',
    author: 'Chris Stokel-Walker',
    imageUrl: 'https://mustreadbooks.co.za/wp-content/uploads/2024/02/AI-ATE-THE-WORLD-670x1024.jpg',
  },
  {
    id: '5',
    title: 'Clean Code',
    author: 'Robert Cecil Martin',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg',
  },
  {
    id: '6',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668782119i/40097951.jpg',
  },
  {
    id: '7',
    title: 'Cirque du Freak',
    author: 'Darren O Shaughnessy',
    imageUrl: 'https://m.media-amazon.com/images/I/51u6SBMB0IL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: '8',
    title: 'Hide and Dont Seek',
    author: 'Anica Mrose Rissi',
    imageUrl: 'https://m.media-amazon.com/images/I/91bonuqSrzL.jpg',
  },
  {
    id: '9',
    title: 'Normal People',
    author: 'Sally Rooney',
    imageUrl: 'https://m.media-amazon.com/images/I/71fnqwR0eSL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: '10',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    imageUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRDn3z4odm8RHwp_qzo0SCP_bpBTsG98QEp85hQZufkXTwQEydc',
  }
];

// Main flow:
// 1) Save books to IndexedDB (only needed once or on updates)
saveTrendingBooks(trendingBooks).then(() => {
  console.log('Trending books saved');
  // 2) Load from DB and render
  return getSavedBooks();
}).then(savedBooks => {
  renderBooks(savedBooks);
}).catch(console.error);
