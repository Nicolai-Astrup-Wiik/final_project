




function sortAndDisplayVideos(isNewest) {
	const videoCards = Array.from(document.querySelectorAll('.video-card'));
	const videoCardsCopy = videoCards.map(card => card.cloneNode(true));

	const sortedVideos = videoCardsCopy.sort((a, b) => {
		 const yearA = parseInt(a.getAttribute('data-year'));
		 const monthA = parseInt(a.getAttribute('data-month'));
		 const iframeA = a.querySelector('iframe').src;
		 const yearB = parseInt(b.getAttribute('data-year'));
		 const monthB = parseInt(b.getAttribute('data-month'));
		 const iframeB = b.querySelector('iframe').src;

		 if (yearA !== yearB) {
			  return isNewest ? yearB - yearA : yearA - yearB;
		 } else if (monthA !== monthB) {
			  return isNewest ? monthB - monthA : monthA - monthB;
		 } else {
			  return isNewest ? iframeB.localeCompare(iframeA) : iframeA.localeCompare(iframeB);
		 }
	});


	//make constant for uniq e videos 
	const uniqueVideos = [];
	sortedVideos.forEach(video => {
		 const iframeSrc = video.querySelector('iframe').src;
		 //compare the iframes to remove duplicates 
		 if (!uniqueVideos.some(uniqueVideo => uniqueVideo.querySelector('iframe').src === iframeSrc)) {
			//push unique videos to hte array uniquevideos
			  uniqueVideos.push(video);
		 }
	});

	const listItemsContainer = document.querySelector('.list-items-container');

	// Remove existing list-items by hiding them
	document.querySelectorAll('.list-item').forEach(item => {
		 item.classList.remove('visible');
	});

	 //remove earlier versions of sorted videos
    const sortedListItems = document.querySelectorAll('.list-item[data-type="sorted"]');
    sortedListItems.forEach(item => {
    item.parentNode.removeChild(item);
    });

	// Create a new list-item container
	const newListItemContainer = document.createElement('div');
	newListItemContainer.classList.add('list-item', 'visible');
	newListItemContainer.setAttribute('data-type', 'sorted');

	//remove highlight from other buttons
	const menuButtons = document.querySelectorAll('.menu_button');
	menuButtons.forEach(button => {
   button.classList.remove('highlight');
	});

	uniqueVideos.forEach(video => {
		// video.classList.add('visible');
		 newListItemContainer.appendChild(video);
	});

	// Append the new container with sorted video cards to the main list-items-container
	listItemsContainer.appendChild(newListItemContainer);
}

document.addEventListener('DOMContentLoaded', function () {
	const newestButton = document.querySelector('.sort_button[data-filter-by="newest"]');
	const oldestButton = document.querySelector('.sort_button[data-filter-by="oldest"]');
	const otherButtons = document.querySelectorAll('.menu_button');

	newestButton.addEventListener('click', function () {
		
		newestButton.classList.add('highlight');
		oldestButton.classList.remove('highlight');
		 sortAndDisplayVideos(true);
	});

	oldestButton.addEventListener('click', function () {
		oldestButton.classList.add('highlight');
		newestButton.classList.remove('highlight');
		 sortAndDisplayVideos(false);
	});
});
