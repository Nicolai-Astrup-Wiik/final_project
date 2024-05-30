import { hateButton } from "./elements";

// CHANGE THEME COLORS WITH HATE BUTTON
hateButton.addEventListener("click", function () {
  const root = document.documentElement;
  const outlineColor = getComputedStyle(root)
    .getPropertyValue("--outline-color")
    .trim();

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

//TOGGLE HAMBURGER MENU 
const checkbox = document.getElementById("menu-toggle");
const menu = document.querySelector(".menu");

checkbox.addEventListener("change", function () {
  
  if (this.checked) {
    menu.classList.add("visible");
  } else {
    menu.classList.remove("visible");
  }
});

export { checkbox, menu, hateButton };
