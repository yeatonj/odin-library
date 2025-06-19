const myLibrary = [];

function Book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = function() {
        const readString = read ? "not yet read" : "already read";
        return `${title} by ${author}, ${pageCount} pages, ${readString}.`;
    }
}

function addBookToLibrary(title, author, pageCount, read) {
    myLibrary.push(new Book(title, author, pageCount, read));
}



function removeBook(id) {

}