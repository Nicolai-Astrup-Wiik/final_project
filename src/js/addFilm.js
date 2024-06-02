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

function extractIframeSrc(embedCode) {
  const srcMatch = embedCode.match(/<iframe[^>]*\s+src=["']([^"']+)["']/i);
  return srcMatch ? srcMatch[1] : null;
}

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

function clearInputFields() {
  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("agency").checked = false;
  document.getElementById("url").value = "";
}

// HANDLE AND VALIDATE NEW FILM SUBMIT
filmSubmitButton.addEventListener("click", async (e) => {
  const titleErrorElement = document.getElementById("title-error-message");
  const dateErrorElement = document.getElementById("date-error-message");
  const urlErrorElement = document.getElementById("url-error-message");

  titleErrorElement.textContent = "";
  dateErrorElement.textContent = "";
  urlErrorElement.textContent = "";

  const userTitleInput = filmTitle.value.trim();
  const userFilmDateInput = filmDate.value.trim();
  const userAgencyInput = filmAgency.checked;
  let userUrlInput = filmUrl.value.trim();

  let hasError = false;
  if (!userTitleInput) {
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
  } else {
    // Extract the src attribute from the embed code
    const extractedSrc = extractIframeSrc(userUrlInput);
    if (extractedSrc) {
      userUrlInput = extractedSrc;
    } else {
      urlErrorElement.textContent = "Invalid embed code. Please enter a valid iframe embed code.";
      hasError = true;
    }
  }

  if (hasError) {
    return;
  }

  await addFilm(
    userTitleInput,
    userFilmDateInput,
    userAgencyInput,
    userUrlInput
  );
  await getFilms();
  await renderFilms();
  addFilmDialog.close();
});

//CLEAR INPUTS UPON CLOSE
addFilmDialog.addEventListener("close", clearInputFields);
