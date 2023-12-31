const filterButtons = document.querySelectorAll('.menu_button');
const listItems = document.querySelectorAll('.list-item');
const listItemContainer = document.querySelectorAll('.list-items-container');

// Filter through buttons and listen for click 
filterButtons.forEach(filterButton => {
  // Define function to filter new list shallow copy
  const filterList = (event) => {
    const currentButton = event.currentTarget;
    const currentButtonFilterBy = currentButton.dataset.filterBy;

    // Loop through each list item and manipulate its class
    listItems.forEach(item => {
      item.classList.remove('visible');
    });

    // Remove earlier versions of sorted videos
    const sortedListItems = document.querySelectorAll('.list-item[data-type="sorted"]');
    sortedListItems.forEach(item => {
      item.parentNode.removeChild(item);
    });

    // Remove 'highlight' class from all menu buttons
    filterButtons.forEach(button => {
      button.classList.remove('highlight');
    });

    // Remove highlight from sort buttons
    const sortButtons = document.querySelectorAll('.sort_button');
    sortButtons.forEach(button => {
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
        console.log("show items");
      });

      currentButton.classList.add('highlight');
    }
  };

  // This is the event listener that looks for a click on each button
  filterButton.addEventListener('click', filterList);
});
