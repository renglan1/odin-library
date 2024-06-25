const library = [];

class Book {
  constructor(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
  }

  setTitle(title) {
    this.title = title;
  }

  setAuthor(author){
    this.author = author;
  }

  setNumPages(numPages) {
    this.numPages = numPages;
  }

  setRead(read) {
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, numPages, read) {
  const book = new Book(title, author, numPages, read);
  library.push(book);
  displayBooks();
}

function removeBookFromLibrary(index) {
  library.splice(index, 1);
  displayBooks();
}

function displayBooks() {
  const libraryNode = document.querySelector('.library');
  libraryNode.innerHTML = '';

  let index = 0;
  library.forEach((book) => {
    let bookNode = document.createElement('div');
    bookNode.setAttribute('data', index++);

    const closeButton = document.createElement('span');
    closeButton.classList.add('material-symbols-outlined', 'close-button');
    closeButton.textContent = ' close ';
    closeButton.addEventListener('click', () => removeBookFromLibrary(bookNode.getAttribute('data')));
    bookNode.appendChild(closeButton);

    for(const property in book) {
      let propertyNode = document.createElement('div');
      propertyNode.textContent = book[property];
      bookNode.appendChild(propertyNode);
    }

    const readButton = document.createElement('button');
    readButton.textContent = book.read ? 'Read' : 'Not Read';
    readButton.addEventListener('click', () => {
      book.toggleRead();
      readButton.textContent = book.read ? 'Not Read' : 'Read';
      
      const readNode = document.querySelector('.library div div:nth-child(5)');
      readNode.textContent = book.read ? 'true' : 'false';
    });
    bookNode.appendChild(readButton);

    libraryNode.appendChild(bookNode);
  })
}

const dialog = document.querySelector('dialog');
const newBookButton = document.querySelector('#new-book');
newBookButton.addEventListener('click', () => {
  dialog.showModal();
});

const form = document.querySelector('form');
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form).entries());
  addBookToLibrary(formData['book_title'], formData['book_author'], formData['book_numpages'], formData['book_read']);

  form.reset();
  dialog.close();
})

