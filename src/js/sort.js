import { documentId } from "firebase/firestore";
import {
  bioPage,
  filmPage,
  newestButton,
  oldestButton,
  agencyButton,
  directButton,
  allButton,
  bioButton,
  menuButtons,
} from "./elements";
import { renderFilms } from "./renderFilms";

//DEFAULT SORTING TO NEWEST
let filterOrSortState = "newest";
const newest = "newest";
const oldest = "oldest";
const agency = "agency work";
const directWork = "direct work";
const all = "all";

//SORT BY NEWEST
newestButton.addEventListener("click", async (e) => {
  e.preventDefault();
  filterOrSortState = newest;
  await renderFilms();
  menuButtons.forEach((button) => {
    button.classList.remove("highlight");
  });
  newestButton.classList.add("highlight");
});

//SORT BY OLDEST
oldestButton.addEventListener("click", async (e) => {
  e.preventDefault();
  filterOrSortState = oldest;
  await renderFilms();
  menuButtons.forEach((button) => {
    button.classList.remove("highlight");
  });
  oldestButton.classList.add("highlight");
});

//FILTER FOR AGENCY
agencyButton.addEventListener("click", async (e) => {
  e.preventDefault();
  filterOrSortState = agency;
  await renderFilms();
  menuButtons.forEach((button) => {
    button.classList.remove("highlight");
  });
  agencyButton.classList.add("highlight");
});

//FILTER FOR DIRECT FROM CLIENT WORK
directButton.addEventListener("click", async (e) => {
  e.preventDefault();
  filterOrSortState = directWork;
  await renderFilms();
  menuButtons.forEach((button) => {
    button.classList.remove("highlight");
  });
  directButton.classList.add("highlight");
});

//DISPLAY ALL
allButton.addEventListener("click", async (e) => {
  e.preventDefault();
  filterOrSortState = all;
  await renderFilms();
  menuButtons.forEach((button) => {
    button.classList.remove("highlight");
  });
  allButton.classList.add("highlight");
});

//DISPLAY BIO
bioButton.addEventListener("click", (e) => {
  bioPage.style.display = "block";
  filmPage.style.display = "none";

  menuButtons.forEach((button) => {
    button.classList.remove("highlight");
  });
  bioButton.classList.add("highlight");
});

//SORT BY DATE ASCENDING/DESCENDING
export function filterOrSortVideos(films) {
  if (filterOrSortState === newest) {
    return films.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }
  if (filterOrSortState === oldest) {
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


menuButtons.forEach((button) => {
  button.classList.remove("highlight");
});

