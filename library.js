let myLibrary = [];

// Add book listener
const submitBookButton = document.querySelector('#submitBookButton');
document.getElementById('addBookForm').onsubmit = function() {
    addBookToLibrary();
    renderBooks();
    $('#addBookModal').modal('hide');
    document.getElementById("addBookForm").reset();
    return false;
};

// Book constructor
function Book(title, author, year, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
}

// Read status toggler prototype function
Book.prototype.readStatusToggle = function() {
    this.read = !this.read;
};

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('releaseYear').value;
    const read = document.querySelector('input[name="readRadio"]:checked').value;
    const book = new Book(title, author, year, read);

    myLibrary.push(book);
    return false;
}


function removeBookFromLibrary(book) {
    const idx = myLibrary.indexOf(book);
    myLibrary.splice(idx,1);
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
    if(book.read) {
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
        removeBookFromLibrary(book);
        renderBooks();
    });
    readToggle.addEventListener('click', () => {
        book.readStatusToggle();
        renderBooks();
    });

    //Append everything to parent card
    bookCard.setAttribute('book-idx', myLibrary.indexOf(book));
    bookCard.appendChild(bookImg);
    bookCard.appendChild(cardBody);
    bookCard.appendChild(cardFooter);
    bookCard.appendChild(deleteButton);
    
    return bookCard;
}

// Add some initial books
b1 = new Book("Thrawn", "Timothy Zahn", 2017, true);
b2 = new Book("Thrawn: Alliances", "Timothy Zahn", 2018, false);
b3 = new Book("Thrawn: Treason", "Timothy Zahn", 2019, false);
myLibrary.push(b1,b2,b3);

renderBooks();