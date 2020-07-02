let myLibrary = [];

function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}

function addBookToLibrary() {
    title = prompt('Insert title:')
    author = prompt('Insert author:')
    year = prompt('Insert release year:')
}

b1 = new Book("Thrawn", "Timothy Zahn", 2014);
b2 = new Book("Thrawn: Alliances", "Timothy Zahn", 2015);
b3 = new Book("Thrawn: Treason", "Timothy Zahn", 2016);
myLibrary.push(b1,b2,b3)