import { doc } from "firebase/firestore";

// Selecting the hateButton
const hateButton = document.querySelector(".title-wrapper__hate-button");

//selecting elements
const addFilmButton = document.querySelector(".add-film-button");
const addFilmDialog = document.querySelector(".add-film-page");
const closeAddFilmButton = document.querySelector(".close-dialog-button");
const logInButton = document.querySelector(".login-button");
const loginPage = document.querySelector(".login-page");
const contentPage = document.querySelector(".list-items-container");
const bioPage = document.querySelector(".bio-page");
const closeLogInButton = document.querySelector(".close-login-button");

logInButton.addEventListener("click", (e) => {
  e.preventDefault();
  loginPage.showModal();
});

// Adding an event listener to the hateButton
hateButton.addEventListener("click", function () {
  const root = document.documentElement;
  const outlineColor = getComputedStyle(root)
    .getPropertyValue("--outline-color")
    .trim();

  //change color variables and update button text
  if (outlineColor === "white") {
    root.style.setProperty("--outline-color", "rgb(255, 0, 247)");
    root.style.setProperty("--highlight-color", "rgb(0, 191, 255)");
    root.style.setProperty("--emphasis-color", "yellow");
    hateButton.textContent = "I HATE colors!";
  } else {
    root.style.setProperty("--outline-color", "white");
    root.style.setProperty("--highlight-color", "white");
    root.style.setProperty("--emphasis-color", "gray");
    hateButton.textContent = "nevermind!";
  }
});

// Listens for click on hamburger menu
const checkbox = document.getElementById("menu-toggle");
const menu = document.querySelector(".menu");

checkbox.addEventListener("change", function () {
  //toggle css 'visible' for menu
  if (this.checked) {
    menu.classList.add("visible");
  } else {
    menu.classList.remove("visible");
  }
});

addFilmButton.addEventListener("click", (e) => {
  e.preventDefault();
  addFilmDialog.showModal();
});

closeAddFilmButton.addEventListener("click", (e) => {
  e.preventDefault();
  addFilmDialog.close();
});
closeLogInButton.addEventListener("click", (e) => {
  e.preventDefault();
  loginPage.close();
});

export { checkbox, menu, hateButton };
