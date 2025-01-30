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
  const entireTable = document.querySelector("table");
  const table = document.querySelector("tbody");
  const row = document.createElement("tr");

  const number = document.createElement("td");
  number.classList.add("order");
  number.position = i;
  number.textContent = `${i + 1}`;
  row.appendChild(number);

  const title = document.createElement("td");
  title.spellcheck = false;
  title.classList.add("title");
  title.focusNextCell = true;
  title.tabIndex = 0;
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

  // Prevent user from entering return escape characters
  title.addEventListener("keydown", (e) => {
    if (e.key === "Enter") e.preventDefault();
  });

  // Move focus to the next focusable cell in the row if the current cell isn't the one before the remove button
  function moveToNextCell(currentCell) {
    let focusNextCell = currentCell.focusNextCell;
    if (focusNextCell === true) {
      const rowChildren = Array.from(row.children);
      let index = rowChildren.indexOf(currentCell);
      let nextCell = rowChildren[index + 1];
      while (focusNextCell === true) {
        if (nextCell.tabIndex >= 0) {
          nextCell.focus();
          focusNextCell = false;
        }
        index++;
        currentCell = nextCell;
        nextCell = rowChildren[index + 1];
        }
    } else {
      currentCell.blur();
    }
  }

  function addNavigation(cell) {
    function addControlNavigation(e) {
      if (e.key === "Control" && e.repeat === false) {
        cell.removeEventListener("keyup", blurOnEnter);

        // *Button here is any other button pressed with control button
        function addControlButtonNavigation(e) { 
          switch (e.key) {
            case "Enter":
              moveToNextCell(cell);
              break;
          }
        }
        cell.addEventListener("keyup", addControlButtonNavigation);

        function removeControlButtonNavigation(e) {
          if (e.key === "Control") {
            cell.removeEventListener("keyup", addControlButtonNavigation);
            cell.addEventListener("keyup", blurOnEnter);
          }
        }
        document.addEventListener("keyup", removeControlButtonNavigation);
      }
    }
    function blurOnEnter(e) {
      if (e.key === "Enter") cell.blur();
    }
    cell.addEventListener("keyup", blurOnEnter);
    cell.addEventListener("keydown", addControlNavigation);
  }               

  addNavigation(title);
  
  row.appendChild(title);

  const author = document.createElement("td");
  author.spellcheck = false;
  author.classList.add("author");
  author.focusNextCell = true;
  author.tabIndex = 0;
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

  // Prevent user from entering return escape characters
  author.addEventListener("keydown", (e) => {
    if (e.key === "Enter") e.preventDefault();
  });

  // Move focus to the next focusable cell in the row if the current cell isn't the one before the remove button
  addNavigation(author);

  row.appendChild(author);

  const published = document.createElement("td");
  published.classList.add("published");
  published.focusNextCell = true;
  if (myLibrary[i].published) {
    published.textContent = `${myLibrary[i].published} ${myLibrary[i].era}`;  
  }
  row.appendChild(published);

  const language = document.createElement("td");
  language.classList.add("language");
  language.focusNextCell = true;
  language.tabIndex = 0;
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

  // Prevent user from entering return escape characters
  language.addEventListener("keydown", (e) => {
    if (e.key === "Enter") e.preventDefault();
  });

  // Move focus to the next focusable cell in the row if the current cell isn't the one before the remove button
  addNavigation(language);  


  row.appendChild(language);

  const genre = document.createElement("td");
  genre.classList.add("genre");
  genre.focusNextCell = true;
  genre.textContent = myLibrary[i].genre;
  row.appendChild(genre);

  const status = document.createElement("td");
  status.classList.add("status");
  status.focusNextCell = true;
  status.textContent = myLibrary[i].status;
  row.appendChild(status);

  const rating = document.createElement("td");
  rating.classList.add("rating");
  rating.focusNextCell = false;
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

function createDefaultRows() {
  createRowWithBtn(
    "Математический анализ I",
    "Vladimir Antonovich Zorich", 
    2004,
    "AD",
    "Russian", 
    "Science & Technology", 
    "Read", 
    10
  );
  createRowWithBtn(
    "Механика",
    "Dmitry Vasilievich Sivuhin", 
    2017,
    "AD",
    "Russian", 
    "Science & Technology", 
    "Read", 
    9
  );
  createRowWithBtn(
    "Лекции по аналитической геометрии", 
    "Pavel Sergeevich Alexandrov", 
    2020,
    "AD",
    "Russian",
    "Science & Technology", 
    "Read", 
    10
  );
  createRowWithBtn(
    "English Grammar in Use", 
    "Raymond Murphy", 
    1985,
    "AD",
    "English", 
    "Humanities & Social sciences", 
    "Read", 
    10
  );
  createRowWithBtn(
    "Enchiridion", 
    "Epictetus", 
    125,
    "AD",
    "English", 
    "Humanities & Social sciences", 
    "Read", 
    10
  );
  createRowWithBtn(
    "Братья Карамазовы", 
    "Fyodor Mikhailovich Dostoevsky", 
    1880,
    "AD",
    "Russian", 
    "Literary Fiction", 
    "Read", 
    10
  );
  createRowWithBtn(
    "JavaScript: The Definitive Guide", 
    "David Flanagan", 
    2020,
    "AD",
    "English", 
    "Science & Technology", 
    "To read", 
    0
  );
}

createDefaultRows();