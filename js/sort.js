function sortAndDisplayVideos() {
	const videoCards = Array.from(document.querySelectorAll('.video-card'));
	const listItemsContainer = document.querySelector('.list-items-container');
	const selectedButton = document.querySelector('.sort_button.selected');
	const dataFilterBy = selectedButton.getAttribute('data-filter-by');

	const sortedVideos = videoCards.slice(); // Make a copy of the array

	sortedVideos.sort((a, b) => {
		 const yearA = Number(a.getAttribute('data-year'));
		 const monthA = Number(a.getAttribute('data-month'));
		 const yearB = Number(b.getAttribute('data-year'));
		 const monthB = Number(b.getAttribute('data-month'));

		 if (dataFilterBy === 'oldest') {
			  if (yearA !== yearB) {
					return yearA - yearB;
			  } else {
					return monthA - monthB;
			  }
		 } else if (dataFilterBy === 'newest') {
			  if (yearA !== yearB) {
					return yearB - yearA;
			  } else {
					return monthB - monthA;
			  }
		 }
	});

	listItemsContainer.innerHTML = ''; // Clear the container

	sortedVideos.forEach(video => {
		 const container = document.createElement('div');
		 container.classList.add('list-item', 'visible');
		 container.appendChild(video.cloneNode(true));
		 listItemsContainer.appendChild(container);
	});
}

document.addEventListener('DOMContentLoaded', function () {
	const sortButtons = document.querySelectorAll('.sort_button');

	sortButtons.forEach(button => {
		 button.addEventListener('click', function () {
			  // Remove 'selected' class from all buttons
			  sortButtons.forEach(btn => btn.classList.remove('selected'));

			  // Add 'selected' class to the clicked button
			  button.classList.add('selected');

			  sortAndDisplayVideos();
		 });
	});

	sortAndDisplayVideos(); // Initially sort and display videos
});
