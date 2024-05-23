import { renderFilms } from "./firebase";

let filterOrSortState = "all";

const newest = "newest";
const oldest = "oldest";
const agency = "agency work";
const directWork = "direct work";
const all = "all";
const newestButton = document.getElementById("newest");
const oldestButton = document.getElementById("oldest");
const agencyButton = document.getElementById("agency-work");
const directButton = document.getElementById("direct-work");
const allButton = document.getElementById("all");

newestButton.addEventListener("click", (e) => {
  e.preventDefault();
  filterOrSortState = newest;
  renderFilms();
  newestButton.classList.add("highlight");
  oldestButton.classList.remove("highlight");
});
oldestButton.addEventListener("click", (e) => {
  e.preventDefault();
  filterOrSortState = oldest;
  renderFilms();
  newestButton.classList.add("highlight");
  oldestButton.classList.remove("highlight");
});

agencyButton.addEventListener("click", (e) => {
  e.preventDefault();
  filterOrSortState = agency;
  renderFilms();
  newestButton.classList.add("highlight");
  oldestButton.classList.remove("highlight");
});
directButton.addEventListener("click", (e) => {
  e.preventDefault();
  filterOrSortState = directWork;
  renderFilms();
  newestButton.classList.add("highlight");
  oldestButton.classList.remove("highlight");
});
allButton.addEventListener("click", (e) => {
  e.preventDefault();
  filterOrSortState = all;
  renderFilms();
  newestButton.classList.add("highlight");
  oldestButton.classList.remove("highlight");
});

export function filterOrSortVideos(films) {
  console.log("callcall");
  if (filterOrSortState === oldest) {
    return films.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }
  if (filterOrSortState === newest) {
    return films.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  if (filterOrSortState === agency) {
    return films.filter((film) => film.agency);
  }
  if (filterOrSortState === directWork) {
    return films.filter((film) => !film.agency);
  }

  return films;
}

// Remove highlight from other buttons
const menuButtons = document.querySelectorAll(".menu_button");
menuButtons.forEach((button) => {
  button.classList.remove("highlight");
});

oldestButton.addEventListener("click", function () {
  oldestButton.classList.add("highlight");
  newestButton.classList.remove("highlight");
});
