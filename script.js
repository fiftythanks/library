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
const entireTable = document.querySelector("table");
const table = document.querySelector("tbody");
function createRow(i) { 
  if (i === undefined) i = myLibrary.length - 1;
  const row = document.createElement("tr");

  const number = document.createElement("td");
  number.classList.add("order");
  number.position = i;
  number.textContent = `${i + 1}`;
  row.appendChild(number);

  const title = document.createElement("td");
  title.spellcheck = false;
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

  row.appendChild(title);

  const author = document.createElement("td");
  author.spellcheck = false;
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
  const publishedWrapper = document.createElement("div");
  publishedWrapper.classList.add("published-wrapper");
  const publishedYear = document.createElement("input");
  publishedYear.classList.add("published");
  publishedYear.type = "number";
  publishedYear.min = "1";
  publishedYear.max = "9999";
  const publishedEra = document.createElement("select");
  publishedEra.classList.add("published"  );
  const publishedEraCurrent = document.createElement("option");
  publishedEraCurrent.classList.add("published");
  publishedEraCurrent.value = "AD";
  publishedEraCurrent.textContent = "AD";
  const publishedEraBeforeChrist = document.createElement("option");
  publishedEraBeforeChrist.classList.add("published");
  publishedEraBeforeChrist.value = "BC";
  publishedEraBeforeChrist.textContent = "BC";
  publishedEra.appendChild(publishedEraCurrent);
  publishedEra.appendChild(publishedEraBeforeChrist);

  publishedYear.value = myLibrary[i].published.toString();
  publishedYear.addEventListener("change", (e) => {
    if (!publishedYear.validity.valid) {
      publishedYear.value = myLibrary[i].published.toString();
    } else {
      myLibrary[i].published = Number.parseInt(publishedYear.value);
    }
  });
  
  publishedEra.value = myLibrary[i].era;

  publishedWrapper.appendChild(publishedYear);
  publishedWrapper.appendChild(publishedEra);

  published.appendChild(publishedWrapper);

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
  const genreList = document.createElement("select");
  genreList.classList.add("genre");
  const fiction = document.createElement("optgroup");
  fiction.label = "Fiction";
  let fictionGenres = [
    "Fantasy",
    "Science Fiction",
    "Dystopian",
    "Action & Adventure",
    "Mystery",
    "Horror",
    "Thriller & Suspense",
    "Historical",
    "Romance",
    "Women‘s Fiction",
    "LGBTQ+",
    "Contemporary Fiction",
    "Literary Fiction",
    "Magical Realism",
    "Graphic Novel",
    "Short Story",
    "Young Adult",
    "New Adult",
    "Children‘s"
  ];
  const fantasy = document.createElement("option");
  const scifi = document.createElement("option");
  const dystopian = document.createElement("option");
  const actionAdventure = document.createElement("option");
  const mystery = document.createElement("option");
  const horror = document.createElement("option");
  const thrillerSuspense = document.createElement("option");
  const hifi = document.createElement("option");
  const romance = document.createElement("option");
  const women = document.createElement("option");
  const lgbt = document.createElement("option");
  const contfi = document.createElement("option");
  const litfi = document.createElement("option");
  const magReal = document.createElement("option");
  const graphNov = document.createElement("option");
  const shortStory = document.createElement("option");
  const young = document.createElement("option");
  const newAdult = document.createElement("option");
  const children = document.createElement("option");

  let fictionGenreVars = [
    fantasy,
    scifi,
    dystopian,
    actionAdventure,
    mystery,
    horror,
    thrillerSuspense,
    hifi,
    romance,
    women,
    lgbt,
    contfi,
    litfi,
    magReal,
    graphNov,
    shortStory,
    young,
    newAdult,
    children
  ];
  for (let i = 0; i < fictionGenres.length; i++) {
    fictionGenreVars[i].value = fictionGenres[i];
    fictionGenreVars[i].textContent = fictionGenres[i];
    fiction.appendChild(fictionGenreVars[i]);
  }
  genreList.appendChild(fiction);

  const nonfiction = document.createElement("optgroup");
  nonfiction.label = "Non-fiction";
  let nonfictionGenres = [
    "Memoir & Autobiography",
    "Biography",
    "Food & Drink",
    "Art & Photography",
    "Self-help",
    "History",
    "Travel",
    "True Crime",
    "Humor",
    "Essays",
    "Guide/How-to",
    "Religion & Spirituality",
    "Humanities & Social sciences",
    "Parenting & Families",
    "Science & Technology",
    "Children‘s"
  ];
  const memo = document.createElement("option");
  const bio = document.createElement("option");
  const food = document.createElement("option");
  const art = document.createElement("option");
  const sHelp = document.createElement("option");
  const hist = document.createElement("option");
  const trav = document.createElement("option");
  const crime = document.createElement("option");
  const hum = document.createElement("option");
  const ess = document.createElement("option");
  const guide = document.createElement("option");
  const rel = document.createElement("option");
  const humSoc = document.createElement("option");
  const parent = document.createElement("option");
  const sciTech = document.createElement("option");
  const childs = document.createElement("option");
  
  let nonfictionGenreVars = [
    memo,
    bio,
    food,
    art,
    sHelp,
    hist,
    trav,
    crime,
    hum,
    ess,
    guide,
    rel,
    humSoc,
    parent,
    sciTech,
    childs
  ];
  for (let i = 0; i < nonfictionGenres.length; i++) {
    nonfictionGenreVars[i].value = nonfictionGenres[i];
    nonfictionGenreVars[i].textContent = nonfictionGenres[i];
    nonfiction.appendChild(nonfictionGenreVars[i]);
  }
  genreList.appendChild(nonfiction);
  genreList.value = myLibrary[i].genre;
  genreList.addEventListener("change", () => {
    myLibrary[i].genre = genreList.value;
  });

  genre.appendChild(genreList);
  row.appendChild(genre);

  const status = document.createElement("td");
  status.classList.add("status");
  
  const statuses = document.createElement("select");
  statuses.classList.add("status");
  
  const read = document.createElement("option");
  read.value = "Read";
  read.textContent = "Read";
  statuses.appendChild(read);

  const reading = document.createElement("option");
  reading.value = "Reading";
  reading.textContent = "Reading";
  statuses.appendChild(reading);

  const toRead = document.createElement("option");
  toRead.value = "To read";
  toRead.textContent = "To read";
  statuses.appendChild(toRead);

  statuses.value = myLibrary[i].status;
  statuses.addEventListener("change", () => {
    myLibrary[i].status = statuses.value;
  });

  status.appendChild(statuses);

  row.appendChild(status);

  const rating = document.createElement("td");
  rating.classList.add("rating"); 
  const rate = document.createElement("select");
  rate.name = "rating";
  const noStar = document.createElement("option");
  noStar.value = "0";
  noStar.textContent = "★";
  const oneStar = document.createElement("option");
  oneStar.value = "1";
  oneStar.textContent = "1★";
  const twoStars = document.createElement("option");
  twoStars.value = "2";
  twoStars.textContent = "2★";
  const threeStars = document.createElement("option");
  threeStars.value = "3";
  threeStars.textContent = "3★";
  const fourStars = document.createElement("option");
  fourStars.value = "4";
  fourStars.textContent = "4★";
  const fiveStars = document.createElement("option");
  fiveStars.value = "5";
  fiveStars.textContent = "5★";
  const sixStars = document.createElement("option");
  sixStars.value = "6";
  sixStars.textContent = "6★";
  const sevenStars = document.createElement("option");
  sevenStars.value = "7";
  sevenStars.textContent = "7★";
  const eightStars = document.createElement("option");
  eightStars.value = "8";
  eightStars.textContent = "8★";
  const nineStars = document.createElement("option");
  nineStars.value = "9";
  nineStars.textContent = "9★";
  const tenStars = document.createElement("option");
  tenStars.value = "10";
  tenStars.textContent = "10★";    

  rate.appendChild(noStar);
  rate.appendChild(oneStar);
  rate.appendChild(twoStars);
  rate.appendChild(threeStars);
  rate.appendChild(fourStars);
  rate.appendChild(fiveStars);
  rate.appendChild(sixStars);
  rate.appendChild(sevenStars);
  rate.appendChild(eightStars);
  rate.appendChild(nineStars);
  rate.appendChild(tenStars);

  rate.value = myLibrary[i].rating.toString();
  rate.addEventListener("change", () => {
    myLibrary[number.position].rating = Number.parseInt(rate.value);
  });

  rating.appendChild(rate); 
  row.appendChild(rating);

  const removeCell = document.createElement("td");
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "×";
  removeBtn.addEventListener("click", () => {
    myLibrary.splice(number.position, 1);
    let position = number.position;
    row.remove();
    for (let i = position; i < myLibrary.length; i++) {
      table.children[i].querySelector(".order").textContent = `${i + 1}`;
      table.children[i].querySelector(".order").position--;
    }
  });

  removeCell.appendChild(removeBtn);
  row.appendChild(removeCell);

  // No return escape characters in cell edits
  function preventEnterDefault(cell) {
    cell.addEventListener("keydown", (e) => {
      if (e.key === "Enter") e.preventDefault();
    });
  }
  for (let cell of Array.from(row.children)) {
    if (cell.isContentEditable) preventEnterDefault(cell);
  }

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

const removeAllBtn = document.querySelector(".remove-all");
removeAllBtn.addEventListener("click", () => {
  myLibrary.splice(0, myLibrary.length);
  const tbody = Array.from(table.children);
  for (let i = 0; i < tbody.length; i++) tbody[i].remove();
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

function createBlankRow() {
  createRowWithBtn(
    "",
    "",
    "",
    "AD",
    "",
    "Science & Technology",
    "Read",
    0
  );
  table.lastElementChild.querySelector(".title").focus();
}

function createBlankRowOnEnter(e) {
  if (e.code === "Enter") {
    createBlankRow();
  } 
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Control" && e.repeat === false) {
    document.addEventListener("keyup", createBlankRowOnEnter); 
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key === "Control") {
    document.removeEventListener("keyup", createBlankRowOnEnter);
  }
});