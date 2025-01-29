const myLibrary = [];

function Book(
              title = "",
              author = "",
              published = 0,
              era = "",
              language = "",
              genre = "",
              status = "",
              rating = 0
            ) {
  this.title = title;
  this.author = author;
  this.published = published;
  this.era = era;
  this.language = language;
  this.genre = genre;
  this.status = status;
  this.rating = rating;
}

function addBookToLibrary(
                          title,
                          author,
                          published,
                          era,
                          language,
                          genre,
                          status,
                          rating
                        ) {
  let newBook = new Book(
                         title,
                         author,
                         published,
                         era, 
                         language,
                         genre,
                         status,
                         rating
                        );
  myLibrary.push(newBook);
}

function fillTable() {
  for (let i = 0; i < myLibrary.length; i++) {
    const table = document.querySelector("tbody");
    const row = document.createElement("tr");

    const number = document.createElement("td");
    number.classList.add("order");
    number.position = i;
    number.textContent = `${i + 1}`;
    row.appendChild(number);

    const title = document.createElement("td");
    title.classList.add("title");
    title.textContent = myLibrary[i].title;
    row.appendChild(title);

    const author = document.createElement("td");
    author.classList.add("author");
    author.textContent = myLibrary[i].author;
    row.appendChild(author);

    const published = document.createElement("td");
    published.classList.add("published");
    if (myLibrary[i].published !== 0) {
      published.textContent = `${myLibrary[i].published} ${myLibrary[i].era}`;  
    }
    row.appendChild(published);

    const language = document.createElement("td");
    language.classList.add("language");
    language.textContent = myLibrary[i].language;
    row.appendChild(language);

    const genre = document.createElement("td");
    genre.classList.add("genre");
    genre.textContent = myLibrary[i].genre;
    row.appendChild(genre);

    const status = document.createElement("td");
    status.classList.add("status");
    status.textContent = myLibrary[i].status;
    row.appendChild(status);

    const rating = document.createElement("td");
    rating.classList.add("rating");
    if (myLibrary[i].rating !== 0) {
      rating.textContent = `${myLibrary[i].rating}/10`;   
    }

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "remove";
    removeBtn.addEventListener("click", () => {
      myLibrary.splice(number.position - 1, 1);
      let position = number.position;
      row.remove();
      for (let i = position; i < myLibrary.length; i++) {
        table.children[i].querySelector(".order").textContent = `${i + 1}`;
        table.children[i].querySelector(".order").position--;
      }
    });
    rating.appendChild(removeBtn);

    row.appendChild(rating);

    table.appendChild(row);
  }
}

function addBookWithBtn() {
  
}