function sortAndDisplayVideos() {
	const videoCards = Array.from(document.querySelectorAll('.video-card'));
	const listItemsContainer = document.querySelector('.list-items-container');

	const selectedButton = document.querySelector('.sort_button.selected');
	const dataFilterBy = selectedButton.getAttribute('data-filter-by');

	let sortedVideos = [...videoCards]; // Make a copy of the array to avoid mutating the original

	if (dataFilterBy === 'oldest') {
		 sortedVideos.reverse();
	}

	const container = document.createElement('div');
	container.classList.add('list-item', 'visible');

	sortedVideos.forEach(video => {
		 container.appendChild(video.cloneNode(true));
	});

	// Remove existing list-items
	document.querySelectorAll('.list-item').forEach(item => {
		 listItemsContainer.removeChild(item);
	});

	// Append the new container with sorted video cards to the main list-items-container
	listItemsContainer.appendChild(container);
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
});
