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

function createRow(i) { 
  if (i === undefined) i = myLibrary.length - 1;
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

  // Adds user edit functionality
  title.contentEditable = "plaintext-only";
  let shouldFireChangeTitle = false;
  title.addEventListener("input", () => {
    shouldFireChangeTitle = true; // makes myLibrary change not every time the cell gets and loses focus but only when the content is edited
  });
  title.addEventListener("blur", () => {
    if (shouldFireChangeTitle === true) {
      shouldFireChangeTitle = false;
      myLibrary[number.position].title = title.textContent;
    }
  });

  title.addEventListener("keydown", (e) => {
    if (e.key === "Enter") e.preventDefault();
  })

  // Blur when Enter/Return key pressed
  title.addEventListener("keyup", (e) => {
    if (e.key === "Enter") title.blur();
  })
  

  row.appendChild(title);

  const author = document.createElement("td");
  author.classList.add("author");
  author.textContent = myLibrary[i].author;

  // Adds user edit functionality
  author.contentEditable = "plaintext-only";
  let shouldFireChangeAuthor = false;
  author.addEventListener("input", () => {
    shouldFireChangeAuthor = true; // makes myLibrary change not every time the cell gets and loses focus but only when the content is edited
  });
  author.addEventListener("blur", () => {
    if (shouldFireChangeAuthor === true) {
      shouldFireChangeAuthor = false;
      myLibrary[number.position].author = author.textContent;
    }
  });

  row.appendChild(author);

  const published = document.createElement("td");
  published.classList.add("published");
  if (myLibrary[i].published) {
    published.textContent = `${myLibrary[i].published} ${myLibrary[i].era}`;  
  }
  row.appendChild(published);

  const language = document.createElement("td");
  language.classList.add("language");
  language.textContent = myLibrary[i].language;

  // Adds user edit functionality
  language.contentEditable = "plaintext-only";
  let shouldFireChangeLanguage = false;
  language.addEventListener("input", () => {
    shouldFireChangeLanguage = true; // makes myLibrary change not every time the cell gets and loses focus but only when the content is edited
  });
  language.addEventListener("blur", () => {
    if (shouldFireChangeLanguage === true) {
      shouldFireChangeLanguage = false;
      myLibrary[number.position].language = language.textContent;
    }
  });

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
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    myLibrary.splice(number.position, 1);
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

function fillTable() {
  for (let i = 0; i < myLibrary.length; i++) {
    createRow(i);
  }
}

function createRowWithBtn(
  title,
  author,
  published,
  era,
  language,
  genre,
  status,
  rating
) {
  addBookToLibrary(
    title,
    author,
    published,
    era,
    language,
    genre,
    status,
    rating
  );
  createRow();
}


let newBookForm = document.querySelector("form.add");
newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = e.target.querySelector("#title").value;
  let author = e.target.querySelector("#author").value;
  let published = e.target.querySelector("#published").value;
  let era = e.target.querySelector("#era").value;
  let language = e.target.querySelector("#language").value;
  let genre = e.target.querySelector("#genre").value;
  let status = e.target.querySelector("#status").value;
  let rating = parseInt(e.target.querySelector("#rating").value);

  createRowWithBtn(
    title,
    author,
    published,
    era,
    language,
    genre,
    status,
    rating
  );

  const dataListTitle = e.target.querySelector("#for-title");
  let dataListTitleOptions = Array.from(dataListTitle.children).map((child) => {
    return child.value;
  });
  if (title && !(dataListTitleOptions.includes(title))) {
    const option = document.createElement("option");
    option.value = title; 
    dataListTitle.appendChild(option);
  } 
  
  const dataListAuthor = e.target.querySelector("#for-author");
  let dataListAuthorOptions = Array.from(dataListAuthor.children).map((child) => {
    return child.value;
  });
  if (author && !(dataListAuthorOptions.includes(author))) {
    const option = document.createElement("option");
    option.value = author; 
    dataListAuthor.appendChild(option);
  } 

  const dataListPublished = e.target.querySelector("#for-published");
  let dataListPublishedOptions = Array.from(dataListPublished.children).map((child) => {
    return child.value;
  });
  if (published && !(dataListPublishedOptions.includes(published))) {
    const option = document.createElement("option");
    option.value = published; 
    dataListPublished.appendChild(option);
  } 

  const dataListLanguage = e.target.querySelector("#for-language");
  let dataListLanguageOptions = Array.from(dataListLanguage.children).map((child) => {
    return child.value;
  });
  if (language && !(dataListLanguageOptions.includes(language))) {
    const option = document.createElement("option");
    option.value = language; 
    dataListLanguage.appendChild(option);
  }
});