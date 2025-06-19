const myLibrary = [];

function Book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = function() {
        const readString = this.read ? "not yet read" : "already read";
        return `${this.title} by ${this.author}, ${this.pageCount} pages, ${readString}, id: ${this.id}.`;
    }
}

function addBookToLibrary(title, author, pageCount, read) {
    myLibrary.push(new Book(title, author, pageCount, read));
}

function displayBooks() {
    const bookContainer = document.querySelector(".container-books");
    // Remove all current books
    while(bookContainer.firstChild){
        bookContainer.removeChild(bookContainer.firstChild);
    }
    for (const book of myLibrary) {
        console.log(book.info());
        displayBook(bookContainer, book);
    }
}

function displayBook(container, book) {
    // toggles
    const readButton = document.createElement("button");
    if (book.read) {
        readButton.classList.add("read");
        readButton.textContent = "Read";
    } else {
        readButton.classList.add("unread");
        readButton.textContent = "Unread"
    }
    const remButton = document.createElement("button")
    remButton.classList.add("remove");
    remButton.textContent = "\u00D7";
    remButton.dataset.id = book.id;
    remButton.addEventListener("click", () => removeBook(remButton.dataset.id));
    const toggles = document.createElement("div");
    toggles.classList.add("toggles");
    toggles.appendChild(readButton);
    toggles.appendChild(remButton);

    // title
    const title = document.createElement("h2");
    title.textContent = book.title;
    title.classList.add("title");

    // author
    const author = document.createElement("h4");
    author.textContent = book.author;
    author.classList.add("author");

    //page count
    const pages = document.createElement("p");
    pages.textContent = "Pages: " + book.pageCount;
    pages.classList.add("page-count");

    // final
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(toggles);

    container.appendChild(bookCard);
}


function removeBook(id) {
    for (var i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === id) {
            myLibrary.splice(i, 1);
            break;
        }
    }
    displayBooks();
}

// Add a few dummy books and log them
for (var i = 0; i < 5; i++) {
    addBookToLibrary("test " + i, "author " + i, i*100, false);
}

displayBooks();