// give all buttons a constant in js with querySelector
const filterButtons = document.querySelectorAll('.menu-button');
// give all of the listed items a constant as well
const listItems = document.querySelectorAll('.list-item');
// fetch the parent div of all the listed items and give it a constant
const listItemContainer = document.querySelector('.portfolio_content');

// filter through buttons and listen for click - last line
filterButtons.forEach(filterButton => {
  // define function to filter new list shallow copy
  const filterList = (event) => {
    // create constant current button and assign the current target which is more reliable
    const currentButton = event.currentTarget;

    // assign the dataset id for the clicked button to a constant
    const currentButtonFilterBy = currentButton.dataset.filterBy;

    // Loop through each list item and manipulate its class
    listItems.forEach(item => {
      item.classList.remove('visible'); // Hide all items initially
    });

    // Remove 'highlight' class from all buttons
    filterButtons.forEach(button => {
      button.classList.remove('highlight');
    });

    if (currentButtonFilterBy === 'clear') {
      return; // Do nothing for 'Clear' button
    } else if (currentButtonFilterBy === 'all') {
      listItems.forEach(item => {
        item.classList.add('visible'); // Show all items for 'All' button
      });
      currentButton.classList.add('highlight');
    } else {
      // Filter items based on the clicked button dataset id
      const filteredItems = [...listItems].filter(item => {
        return item.dataset.type === currentButtonFilterBy;
      });

      filteredItems.forEach(item => {
        item.classList.add('visible'); // Show filtered items
      });

      currentButton.classList.add('highlight');
    }
  };

  // this is the event listener that looks for a click on each button
  filterButton.addEventListener('click', filterList);
});
