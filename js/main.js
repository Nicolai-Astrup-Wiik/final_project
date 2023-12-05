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
	 hateButton.textContent = 'I changed my mind!'
  }
});
