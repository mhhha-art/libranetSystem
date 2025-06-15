
 // --- OPEN DATABASE WITH TWO OBJECT STORES ---
async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('LibraNetDB', 2);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('trendingBooks')) {
        db.createObjectStore('trendingBooks', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('mathematicsBooks')) {
        db.createObjectStore('mathematicsBooks', { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// --- FETCH IMAGE BLOB ---
async function fetchAndConvertImageToBlob(url) {
  const response = await fetch(url);
  return await response.blob();
}

// --- SAVE TO ANY OBJECT STORE ---
async function saveBooksToStore(storeName, books) {
  const db = await openDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);

  for (const book of books) {
    const imageBlob = await fetchAndConvertImageToBlob(book.imageUrl || book.image); // image or imageUrl fallback
    store.put({
      id: book.id,
      title: book.title,
      author: book.author,
      imageBlob: imageBlob,
    });
  }

  tx.oncomplete = () => db.close();
  tx.onerror = (e) => console.error('Transaction failed:', e.target.error);
}


// --- GET FROM ANY OBJECT STORE ---
async function getBooksFromStore(storeName) {
  const db = await openDB();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);

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

// --- RENDER BOOKS TO GIVEN CONTAINER ---
function renderBooks(books, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  books.forEach(book => {
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

// --- HARDCODED TRENDING BOOKS DATA ---
const trendingBooks = [
  { id: '1', title: 'Atomic Habits', author: 'James Clear', imageUrl: 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg' },
  { id: '2', title: 'The Power of Habit', author: 'Charles Duhigg', imageUrl: 'https://media.s-bol.com/3G5BnolANZnA/AyN5n9/550x837.jpg' },
  { id: '3', title: 'The Age of AI', author: 'Henry A. Kissinger', imageUrl: 'https://media.thegospelcoalition.org/wp-content/uploads/2023/08/30115001/ai-future-of-human.jpg' },
  { id: '4', title: 'How AI Ate the World', author: 'Chris Stokel-Walker', imageUrl: 'https://mustreadbooks.co.za/wp-content/uploads/2024/02/AI-ATE-THE-WORLD-670x1024.jpg' },
  { id: '5', title: 'Clean Code', author: 'Robert C. Martin', imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg' },
  { id: '6', title: 'The Silent Patient', author: 'Alex Michaelides', imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668782119i/40097951.jpg' },
  { id: '7', title: 'Cirque du Freak', author: 'Darren O Shaughnessy', imageUrl: 'https://m.media-amazon.com/images/I/51u6SBMB0IL._AC_UF1000,1000_QL80_.jpg' },
  { id: '8', title: 'Hide and Don’t Seek', author: 'Anica Mrose Rissi', imageUrl: 'https://m.media-amazon.com/images/I/91bonuqSrzL.jpg' },
  { id: '9', title: 'Normal People', author: 'Sally Rooney', imageUrl: 'https://m.media-amazon.com/images/I/71fnqwR0eSL._AC_UF1000,1000_QL80_.jpg' },
  { id: '10', title: 'Project Hail Mary', author: 'Andy Weir', imageUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRDn3z4odm8RHwp_qzo0SCP_bpBTsG98QEp85hQZufkXTwQEydc' }
];

// --- HARDCODED MATH BOOKS DATA ---
const mathematicsBooks = [
 
  {
    id: 1,
    title: "Calculus: Early Transcendentals (5th Edition)",
    author: "James Stewart",
    rating: 4,
    description: "Reading a calculus textbook is different from reading a story or a news article. Don't be discouraged if you have to read a passage more than once...",
    image: "https://m.media-amazon.com/images/I/51JBTZRn1xL._AC_UF1000,1000_QL80_.jpg",
    popularity: 90,
    usage: 100,
    date: 2002
  },
  {
    id: 2,
    title: "Calculus: An Intuitive and Physical Approach",
    author: "Morris Kline",
    rating: 3,
    description: "The basic features of the first edition have been retained, such as the intuitive approach and real applications. The last chapter introduces a rigorous treatment...",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1416873321i/450366.jpg",
    popularity: 70,
    usage: 90,
    date: 1967
  },
  {
    id: 3,
    title: "Linear Algebra Done Right",
    author: "Sheldon Axler",
    rating: 3,
    description: "Linear algebra is the study of linear maps on finite-dimensional vector spaces. This book starts with vector spaces and builds toward deeper theorems...",
    image: "https://m.media-amazon.com/images/I/61AR-EJ28gL._AC_UF1000,1000_QL80_.jpg",
    popularity: 60,
    usage: 80,
    date: 1995
  },
  {
    id: 4,
    title: "Introduction to Geometry",
    author: "Richard Rusczyk",
    rating: 4,
    description: "Learn the basics of geometry from Olympiad winner Richard Rusczyk. Topics include quadratics, graphing, inequalities, functions, and much more...",
    image: "https://m.media-amazon.com/images/I/51ICC0U4cCL._SL500_.jpg",
    popularity: 80,
    usage: 70,
    date: 2006
  },
  {
    id: 5,
    title: "Algebra the Beautiful",
    author: "G. Arnell Williams",
    rating: 4,
    description: "Elementary algebra holds two powerful ideas — 'Let x equal' and 'For any a and b'. This book explores how these ideas shaped mathematics...",
    image: "https://m.media-amazon.com/images/I/51A0mOWAEJL._AC_UF1000,1000_QL80_.jpg",
    popularity: 80,
    usage: 60,
    date: 2022
  },
  {
    id: 6,
    title: "Calculus: Single Variable Calculus (9th Edition)",
    author: "James Stewart",
    rating: 5,
    description: "This edition of Calculus is the first to use real student usage data to revise the exercises. Designed for deeper learning and understanding...",
    image: "https://www.cengage.com/covers/imageServlet?image_type=LRGFC&catalog=cengage&productISBN13=9781133374329",
    popularity: 100,
    usage: 50,
    date: 2009
  }


];

// --- MAIN FLOW ---
saveBooksToStore('trendingBooks', trendingBooks).then(() => {
  return getBooksFromStore('trendingBooks');
}).then(books => {
  renderBooks(books, 'carousel');
}).catch(console.error);

saveBooksToStore('mathematicsBooks', mathematicsBooks).then(() => {
  return getBooksFromStore('mathematicsBooks');
}).then(books => {
  renderBooks(books, 'math-section');
}).catch(console.error);
