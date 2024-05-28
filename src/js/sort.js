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

let filterOrSortState = "all";
const newest = "newest";
const oldest = "oldest";
const agency = "agency work";
const directWork = "direct work";
const all = "all";

newestButton.addEventListener("click", async (e) => {
  e.preventDefault();
  filterOrSortState = newest;
  await renderFilms();
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
  filmPage.style.display = "none";

  menuButtons.forEach((button) => {
    button.classList.remove("highlight");
  });
  bioButton.classList.add("highlight");
});

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

// Remove highlight from other buttons

menuButtons.forEach((button) => {
  button.classList.remove("highlight");
});

oldestButton.addEventListener("click", function () {
  oldestButton.classList.add("highlight");
  newestButton.classList.remove("highlight");
});
