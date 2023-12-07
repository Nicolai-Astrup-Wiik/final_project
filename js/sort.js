







function sortAndDisplayVideos(isNewest) {
	const videoCards = Array.from(document.querySelectorAll('.video-card'));

	const sortedVideos = videoCards.sort((a, b) => {
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

	const uniqueVideos = [];
	sortedVideos.forEach(video => {
		 const iframeSrc = video.querySelector('iframe').src;
		 if (!uniqueVideos.some(uniqueVideo => uniqueVideo.querySelector('iframe').src === iframeSrc)) {
			  uniqueVideos.push(video);
		 }
	});

	const container = document.createElement('div');
	container.classList.add('list-item', 'visible');

	uniqueVideos.forEach(video => {
		 container.appendChild(video.cloneNode(true));
	});

	const listItemsContainer = document.querySelector('.list-items-container');

	// Remove existing list-items
	document.querySelectorAll('.list-item').forEach(item => {
		 listItemsContainer.removeChild(item);
	});

	// Append the new container with sorted video cards to the main list-items-container
	listItemsContainer.appendChild(container);
}

document.addEventListener('DOMContentLoaded', function () {
	const newestButton = document.querySelector('.menu_button[data-filter-by="newest"]');
	const oldestButton = document.querySelector('.menu_button[data-filter-by="oldest"]');

	newestButton.addEventListener('click', function () {
		 sortAndDisplayVideos(true); 
	});

	oldestButton.addEventListener('click', function () {
		 sortAndDisplayVideos(false); 
	});
});
