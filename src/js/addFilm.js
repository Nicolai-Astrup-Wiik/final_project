import {
  addFilmButton,
  addFilmDialog,
  closeAddFilmButton,
  filmAgency,
  filmDate,
  filmSubmitButton,
  filmTitle,
  filmUrl,
} from "./elements";
import { addFilm, getFilms } from "./firebase";
import { renderFilms } from "./renderFilms";

//ADD FILM OPEN MODAL
addFilmButton.addEventListener("click", (e) => {
  e.preventDefault();
  addFilmDialog.showModal();
});
//ADD FILM CLOSE MODAL
closeAddFilmButton.addEventListener("click", (e) => {
  e.preventDefault();
  addFilmDialog.close();
});

// HANDLE AND VALIDATE NEW FILM SUBMIT
filmSubmitButton.addEventListener("click", async (e) => {
  const titleErrorElement = document.getElementById("title-error-message");
  const dateErrorElement = document.getElementById("date-error-message");
  const urlErrorElement = document.getElementById("url-error-message");

  titleErrorElement.textContent = "";
  dateErrorElement.textContent = "";
  urlErrorElement.textContent = "";

  const userTtileinput = filmTitle.value.trim();
  const userFilmDateInput = filmDate.value.trim();
  const userAgencyInput = filmAgency.checked;
  const userUrlInput = filmUrl.value.trim();

  let hasError = false;
  if (!userTtileinput) {
    titleErrorElement.textContent = "Please enter a title";
    hasError = true;
  }
  if (!userFilmDateInput) {
    dateErrorElement.textContent = "Please enter a date";
    hasError = true;
  }

  if (!userUrlInput) {
    urlErrorElement.textContent = "Please enter a url";
    hasError = true;
  }
  if (hasError) {
    return;
  }

  await addFilm(
    userTtileinput,
    userFilmDateInput,
    userAgencyInput,
    userUrlInput
  );
  await getFilms();
  await renderFilms();
  addFilmDialog.close();
});
