let myLibrary = [];

function Book(title, author, year, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
}

function addBookToLibrary() {
    title = prompt('Insert title:')
    author = prompt('Insert author:')
    year = prompt('Insert release year:')
}

b1 = new Book("Thrawn", "Timothy Zahn", 2014, 1);
b2 = new Book("Thrawn: Alliances", "Timothy Zahn", 2015, 0);
b3 = new Book("Thrawn: Treason", "Timothy Zahn", 2016, 0);
myLibrary.push(b1,b2,b3)

function renderBooks() {
    const container = document.querySelector('.container');
    const cardDeck = document.createElement('div');
    cardDeck.classList.add('card-deck');
    container.appendChild(cardDeck);

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
    // Create card text for book author
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = book.author;
    //Append title and text to card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    // Create card footer
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');
    // Create small read status text
    const cardSmall = document.createElement('small');
    cardSmall.classList.add('text-muted');
    cardSmall.textContent = 'Not read yet.'
    // Append small to card footer
    cardFooter.appendChild(cardSmall);

    //Append body and footer to parent card
    bookCard.appendChild(cardBody);
    bookCard.appendChild(cardFooter);
    
    return bookCard;
}

renderBooks();