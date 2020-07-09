let myLibrary = [];
// Firebase config
var firebaseConfig = {
    apiKey: "AIzaSyAVlmsbjj2BTZxm6g11qkhw0vd3-JIUTCw",
    authDomain: "js-library-4a1c2.firebaseapp.com",
    databaseURL: "https://js-library-4a1c2.firebaseio.com",
    projectId: "js-library-4a1c2",
    storageBucket: "js-library-4a1c2.appspot.com",
    messagingSenderId: "467361743764",
    appId: "1:467361743764:web:56568f29f2b71c268a0581",
    measurementId: "G-60VM4SXVNW"
};
// Firebase init  
firebase.initializeApp(firebaseConfig);

// Init realtime database
var db = firebase.database();

// Listen for changes to refresh book cards
db.ref('books/').on('value', () => {
    renderBooks();
});

// Write books to db
function writeBook(book) {
    db.ref('books/').push({
      title: book.title,
      author: book.author,
      year: book.year,
      read: book.read
    });
}

// Generate card deck and fill with books from realtime db
function renderBooks() {
    db.ref('books/').once('value').then((snap) => {
        const cardDeck = document.querySelector('.card-deck');
        // Clear beforehand
        while(cardDeck.firstChild) {
            cardDeck.removeChild(cardDeck.lastChild);
        }
        snap.forEach(book => {
            const bookCard = generateBookCard(book);
            cardDeck.appendChild(bookCard);
        });
    });
}

// Add book listener
const submitBookButton = document.querySelector('#submitBookButton');
document.getElementById('addBookForm').onsubmit = function() {
    addBookFromForm();
    $('#addBookModal').modal('hide');
    document.getElementById("addBookForm").reset();
    return false;
};

function addBookFromForm() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('releaseYear').value;
    const read = document.querySelector('input[name="readRadio"]:checked').value;
    const book = {title: title, author: author, year: year, read: read};
    writeBook(book);

}

function generateBookCard(book) {
    // Create parent card
    const bookCard = document.createElement('div');
    bookCard.classList.add('card', 'book-card');

    // Create cover img
    const bookImg = document.createElement('img');
    bookImg.classList.add('card-img-top');
    bookImg.src = "images/cover_placeholder.jpg";
    bookImg.alt = "Book cover";

    // Create card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Create card title for book title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = book.val().title;
    // Create card small for book year
    const cardYearSmall = document.createElement('small');
    cardYearSmall.textContent = book.val().year;
    // Create card text for book author
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = book.val().author;
    //Append title and text to card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardYearSmall);
    cardBody.appendChild(cardText);

    // Create card footer
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');
    // Create read status toggle
    const readToggle = document.createElement('button');
    readToggle.classList.add('readToggle');
    const readIcon = document.createElement('i');
    readIcon.classList.add('fas');
    readIcon.classList.add('fa-book');
    readToggle.appendChild(readIcon);
    // Create small read status text
    const cardReadSmall = document.createElement('small');
    cardReadSmall.classList.add('text-muted');
    if(book.val().read) {
        cardReadSmall.textContent = 'Read.'    
    }
    else {
        cardReadSmall.textContent = 'Not read yet.'
    }
    // Append small and toggle to card footer
    cardFooter.appendChild(cardReadSmall);
    cardFooter.appendChild(readToggle);

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteBtn');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas');
    deleteIcon.classList.add('fa-minus-circle');
    deleteButton.appendChild(deleteIcon);

    // Add listeners
    deleteButton.addEventListener('click', () => {
        db.ref("books/" + book.key).set(null);
    });
    readToggle.addEventListener('click', () => {
        db.ref("books/" + book.key + "/read").set(!book.val().read);
    });

    //Append everything to parent card
    bookCard.setAttribute('book-idx', myLibrary.indexOf(book));
    bookCard.appendChild(bookImg);
    bookCard.appendChild(cardBody);
    bookCard.appendChild(cardFooter);
    bookCard.appendChild(deleteButton);
    
    return bookCard;
}

renderBooks();