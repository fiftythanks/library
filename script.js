const myLibrary = [];

function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
}

function addBookToLibrary(title, author, year) {
  let newBook = new Book(title, author, year);
  myLibrary.push(newBook);
}

function fillTable() {
  for (let i = 0; i < myLibrary.length; i++) {
    const table = document.querySelector("tbody");
    const row = document.createElement("tr");

    const number = document.createElement("td");
    number.textContent = `${i + 1}`;
    row.appendChild(number);

    const title = document.createElement("td");
    title.classList.add("title");
    title.textContent = myLibrary[i].title;
    row.appendChild(title);

    const author = document.createElement("td");
    author.textContent = myLibrary[i].author;
    row.appendChild(author);

    const year = document.createElement("td");
    year.textContent = myLibrary[i].year.toString();
    row.appendChild(year);

    table.appendChild(row); 
  }
}