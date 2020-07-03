let myLibrary = [];

const submitBookButton = document.querySelector('#submitBookButton');
submitBookButton.addEventListener('click', addBookToLibrary);
document.getElementById('addBookForm').onsubmit = addBookToLibrary;

function Book(title, author, year, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
}

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('releaseYear').value;
    const read = document.querySelector('input[name="readRadio"]:checked').value;
    const book = new Book(title, author, year, read);

    myLibrary.push(book);
    renderBooks();
    return false;
}

function renderBooks() {
    const container = document.querySelector('.container');
    const cardDeck = document.querySelector('.card-deck');
    
    // Clear beforehand
    while(cardDeck.firstChild) {
        cardDeck.removeChild(cardDeck.lastChild);
    }

    myLibrary.forEach(book => {
        cardDeck.appendChild(generateBookCard(book));
    });
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
    cardTitle.textContent = book.title;
    // Create card small for book year
    const cardYearSmall = document.createElement('small');
    cardYearSmall.textContent = book.year;
    // Create card text for book author
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = book.author;
    //Append title and text to card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardYearSmall);
    cardBody.appendChild(cardText);

    // Create card footer
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');
    // Create small read status text
    const cardReadSmall = document.createElement('small');
    cardReadSmall.classList.add('text-muted');
    if(book.read) {
        cardReadSmall.textContent = 'Read.'    
    }
    else {
        cardReadSmall.textContent = 'Not read yet.'
    }
    // Append small to card footer
    cardFooter.appendChild(cardReadSmall);

    //Append body and footer to parent card
    bookCard.appendChild(bookImg);
    bookCard.appendChild(cardBody);
    bookCard.appendChild(cardFooter);
    
    return bookCard;
}

// Add some initial books
b1 = new Book("Thrawn", "Timothy Zahn", 2014, 1);
b2 = new Book("Thrawn: Alliances", "Timothy Zahn", 2015, 0);
b3 = new Book("Thrawn: Treason", "Timothy Zahn", 2016, 0);
b4 = new Book("Thrawn: Treason", "Timothy Zahn", 2016, 0);
b5 = new Book("Thrawn: Treason", "Timothy Zahn", 2016, 0);
b6 = new Book("Thrawn: Treason", "Timothy Zahn", 2016, 0);
b7 = new Book("Thrawn: Treason", "Timothy Zahn", 2016, 0);
b8 = new Book("Thrawn: Treason", "Timothy Zahn", 2016, 0);
b9 = new Book("Thrawn: Treason", "Timothy Zahn", 2016, 0);
b10 = new Book("Thrawn: Treason", "Timothy Zahn", 2016, 0);
myLibrary.push(b1,b2,b3,b4,b5,b6,b7,b8,b9,b10);
renderBooks();