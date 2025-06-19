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

function addButtonPush() {
    addBookToLibrary("A great book", "It's a me!", 132, true);
}

function addBookToLibrary(title, author, pageCount, read) {
    myLibrary.push(new Book(title, author, pageCount, read));
    displayBooks();
}

function readToggle(id) {
    // Find the book and toggle it
    for (var i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === id) {
            myLibrary[i].read = !myLibrary[i].read;
            break;
        }
    }
    // find and toggle in html as well
    const searchStr = '[data-toggle-id=\"' + id +'\"]';
    console.log(searchStr);
    const button = document.querySelector(searchStr);
    console.log(button);
    if (button.textContent === "Read") {
        button.textContent = "Unread";
        button.classList.remove("read");
        button.classList.add("unread");
    } else {
        button.textContent = "Read";
        button.classList.remove("unread");
        button.classList.add("read");
    }
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
    readButton.dataset.toggleId = book.id;
    readButton.addEventListener("click", () => readToggle(readButton.dataset.toggleId));
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

function setupDialog() {
    // Add the add button functionality
    const addButton = document.querySelector(".add");
    addButton.addEventListener("click", addButtonPush);

    const dialog = document.querySelector("dialog");
    const closeButton = document.querySelector("dialog button");

    // Bind show and close buttons
    addButton.addEventListener("click", () => {
        dialog.showModal();
    });
    closeButton.addEventListener("click", () => {
        dialog.close();
    });
}

// Add a few dummy books and log them
for (var i = 0; i < 5; i++) {
    addBookToLibrary("test " + i, "author " + i, i*100, false);
}

setupDialog();

displayBooks();