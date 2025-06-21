class Book {
    constructor(title, author, pageCount, read) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    info() {
        const readString = this.read ? "not yet read" : "already read";
        return `${this.title} by ${this.author}, ${this.pageCount} pages, ${readString}, id: ${this.id}.`;
    }
}

class Library {
    #myLibrary = []
    constructor() {
    }

    addBookToLibrary(title, author, pageCount, read) {
        this.#myLibrary.push(new Book(title, author, pageCount, read));
        this.displayBooks();
    }

    readToggle(id) {
        // Find the book and toggle it
        for (var i = 0; i < this.#myLibrary.length; i++) {
            if (this.#myLibrary[i].id === id) {
                this.#myLibrary[i].read = !this.#myLibrary[i].read;
                break;
            }
        }
        // find and toggle in html as well
        const searchStr = '[data-toggle-id=\"' + id +'\"]';
        const button = document.querySelector(searchStr);
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

    displayBooks() {
        const bookContainer = document.querySelector(".container-books");
        // Remove all current books
        while(bookContainer.firstChild){
            bookContainer.removeChild(bookContainer.firstChild);
        }
        for (const book of this.#myLibrary) {
            this.displayBook(bookContainer, book);
        }
    }

    displayBook(container, book) {
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
        readButton.addEventListener("click", () => this.readToggle(readButton.dataset.toggleId));
        const remButton = document.createElement("button")
        remButton.classList.add("remove");
        remButton.textContent = "\u00D7";
        remButton.dataset.id = book.id;
        remButton.addEventListener("click", () => this.removeBook(remButton.dataset.id));
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


    removeBook(id) {
        for (var i = 0; i < this.#myLibrary.length; i++) {
            if (this.#myLibrary[i].id === id) {
                this.#myLibrary.splice(i, 1);
                break;
            }
        }
        this.displayBooks();
    }

    setupDialog() {
        // Add the add button functionality
        const addButton = document.querySelector(".add");

        const titleInput = document.querySelector(".title-input");
        const authorInput = document.querySelector(".author-input");
        const pagesInput = document.querySelector(".pages-input");
        const readInput = document.querySelector(".read-input");

        const dialog = document.querySelector("dialog");
        const cancel = document.querySelector("#cancelBtn");

        // Bind add button buttons
        addButton.addEventListener("click", () => {
            titleInput.value = "";
            authorInput.value = "";
            pagesInput.value = 0;
            dialog.showModal();
        });

        // Add confirm button behavior
        cancel.addEventListener("click", (event) => {
            event.preventDefault();
            dialog.requestClose(); // Have to send the select box value here.
            
        });

        // And add final behavior
        dialog.addEventListener("close", (e) => {
            if (dialog.returnValue === "confirm") {
                this.addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
                console.log(this.#myLibrary)
            }
        });


    }
}

const library = new Library();

library.setupDialog();

library.displayBooks();