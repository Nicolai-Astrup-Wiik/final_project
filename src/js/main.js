// Selecting the hateButton
const hateButton = document.querySelector(".title-wrapper__hate-button");

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
  console.log("the hamburger has been checked");

  //toggle css 'visible' for menu
  if (this.checked) {
    console.log("here is the menu");
    menu.classList.add("visible");
  } else {
    menu.classList.remove("visible");
    console.log("menu gone");
  }
});

export { checkbox, menu, hateButton };
