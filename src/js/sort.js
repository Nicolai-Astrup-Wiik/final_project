import { removeVideos, renderFilms } from "./firebase";

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
const bioButton = document.getElementById("bio");
const bioPage = document.querySelector(".bio-page");
const contentPage = document.querySelector(".list-items-container");

const menuButtons = document.querySelectorAll(".menu_button");

newestButton.addEventListener("click", async (e) => {
  e.preventDefault();
  filterOrSortState = newest;
  await await renderFilms();
  menuButtons.forEach((button) => {
    button.classList.remove("highlight");
  });
  newestButton.classList.add("highlight");
});
oldestButton.addEventListener("click", async (e) => {
  e.preventDefault();
  filterOrSortState = oldest;
  await renderFilms();
  menuButtons.forEach((button) => {
    button.classList.remove("highlight");
  });
  oldestButton.classList.add("highlight");
});

agencyButton.addEventListener("click", async (e) => {
  e.preventDefault();
  filterOrSortState = agency;
  await renderFilms();
  menuButtons.forEach((button) => {
    button.classList.remove("highlight");
  });
  agencyButton.classList.add("highlight");
});
directButton.addEventListener("click", async (e) => {
  e.preventDefault();
  filterOrSortState = directWork;
  await renderFilms();
  menuButtons.forEach((button) => {
    button.classList.remove("highlight");
  });
  directButton.classList.add("highlight");
});
allButton.addEventListener("click", async (e) => {
  e.preventDefault();
  filterOrSortState = all;
  await renderFilms();
  menuButtons.forEach((button) => {
    button.classList.remove("highlight");
  });
  allButton.classList.add("highlight");
});

bioButton.addEventListener("click", (e) => {
  bioPage.style.display = "block";
  contentPage.style.display = "hidden";

  menuButtons.forEach((button) => {
    button.classList.remove("highlight");
  });
  bioButton.classList.add("highlight");
});

export function filterOrSortVideos(films) {
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

menuButtons.forEach((button) => {
  button.classList.remove("highlight");
});

oldestButton.addEventListener("click", function () {
  oldestButton.classList.add("highlight");
  newestButton.classList.remove("highlight");
});
