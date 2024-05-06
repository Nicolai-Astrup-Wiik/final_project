//function to sort and display videos based off year and month
function sortAndDisplayVideos(isNewest) {
  const videoCards = Array.from(document.querySelectorAll(".video-card"));

  //create copy of array so function is non-destructive on page HTML
  const videoCardsCopy = videoCards.map((card) => card.cloneNode(true));

  //function that compares attributes and sorts according to order specified in boolean isNewest
  const sortedVideos = videoCardsCopy.sort((a, b) => {
    const yearA = parseInt(a.getAttribute("data-year"));
    const monthA = parseInt(a.getAttribute("data-month"));
    const iframeA = a.querySelector("iframe").src;
    const yearB = parseInt(b.getAttribute("data-year"));
    const monthB = parseInt(b.getAttribute("data-month"));
    const iframeB = b.querySelector("iframe").src;

    //if years are different use boolean isnewest to decide order true for newest->oldest, false for oldest->newest
    if (yearA !== yearB) {
      return isNewest ? yearB - yearA : yearA - yearB;
    } else if (monthA !== monthB) {
      return isNewest ? monthB - monthA : monthA - monthB;
    } else {
      return isNewest
        ? iframeB.localeCompare(iframeA)
        : iframeA.localeCompare(iframeB);
    }
  });

  // Make constant for unique videos chech if string value of iframe is already in array, if not push video to uniqueVideos
  const uniqueVideos = [];
  sortedVideos.forEach((video) => {
    const iframeSrc = video.querySelector("iframe").src;
    // Compare the iframes to remove duplicates
    if (
      !uniqueVideos.some(
        (uniqueVideo) => uniqueVideo.querySelector("iframe").src === iframeSrc
      )
    ) {
      // Push unique videos to the array uniquevideos
      uniqueVideos.push(video);
    }
  });

  const listItemsContainer = document.querySelector(".list-items-container");

  // Remove existing list-items by hiding them
  document.querySelectorAll(".list-item").forEach((item) => {
    item.classList.remove("visible");
  });

  // Remove earlier versions of sorted videos
  const sortedListItems = document.querySelectorAll(
    '.list-item[data-type="sorted"]'
  );
  sortedListItems.forEach((item) => {
    item.parentNode.removeChild(item);
  });

  // Create a new list-item container assign data type sorted
  const newListItemContainer = document.createElement("div");
  newListItemContainer.classList.add("list-item", "visible");
  newListItemContainer.setAttribute("data-type", "sorted");

  // Remove highlight from other buttons
  const menuButtons = document.querySelectorAll(".menu_button");
  menuButtons.forEach((button) => {
    button.classList.remove("highlight");
  });

  //append child element to new list element for each video in uniqueVideos
  uniqueVideos.forEach((video) => {
    newListItemContainer.appendChild(video);
  });

  // Append the new container with sorted video cards to the main list-items-container
  listItemsContainer.appendChild(newListItemContainer);
}

// listener function that returns true/false as input deciding sorting order for function sortAndDisplayVideos
document.addEventListener("DOMContentLoaded", function () {
  const newestButton = document.querySelector(
    '.sort_button[data-filter-by="newest"]'
  );
  const oldestButton = document.querySelector(
    '.sort_button[data-filter-by="oldest"]'
  );
  const otherButtons = document.querySelectorAll(".menu_button");

  //add event listener, assign boolean, update buttons
  newestButton.addEventListener("click", function () {
    newestButton.classList.add("highlight");
    oldestButton.classList.remove("highlight");
    sortAndDisplayVideos(true);
  });

  oldestButton.addEventListener("click", function () {
    oldestButton.classList.add("highlight");
    newestButton.classList.remove("highlight");
    sortAndDisplayVideos(false);
  });
});

export default sortAndDisplayVideos;
