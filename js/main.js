// Selecting the hateButton
const hateButton = document.querySelector(".hate-button");

// Adding an event listener to the hateButton
hateButton.addEventListener('click', function() {
  const root = document.documentElement;
  const outlineColor = getComputedStyle(root).getPropertyValue('--outline-color').trim();

  console.log("Hate button clicked!");

  if (outlineColor === 'white') {
    root.style.setProperty('--outline-color', 'rgb(255, 0, 247)');
    root.style.setProperty('--highlight-color', 'rgb(0, 191, 255)');
	 hateButton.textContent = 'I HATE colors!'

  } else {
    root.style.setProperty('--outline-color', 'white');
    root.style.setProperty('--highlight-color', 'white');
	 hateButton.textContent = 'nevermind!'
  }
});

//listens for click on hamburger menu

const checkbox = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');

checkbox.addEventListener('change', function() {
  console.log('the hamburger has been checked')
  if (this.checked) {
    console.log("here is the menu")
    menu.classList.add('visible');
  } else {
    menu.classList.remove('visible');
    console.log("menu gone")
  }
});