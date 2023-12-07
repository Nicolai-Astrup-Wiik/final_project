

const videoCards = [...document.querySelectorAll('.video-card')];
	const listItemsContainer = document.querySelector('.list-items-container');

	const selectedButton = document.querySelector('.sort_button.selected');
	const dataFilterBy = selectedButton.getAttribute('data-filter-by');

function sortAndDisplayVideos() {
	

	let sortedVideos = [...videoCards]; // remember make copy array
	if (dataFilterBy === 'oldest') {
		 sortedVideos.reverse();
	}

	//create new div with class list-item 
	const container = document.createElement('div');
	container.classList.add('list-item');

	//appnd a child for each 
	sortedVideos.forEach(video => {
		 container.appendChild(video.cloneNode(true));
	});

	// remove visible form all existing items 
	document.querySelectorAll('.list-item').forEach(item => {
		listItemsContainer.removeChild(item);
	});



	// Append the new container with sorted video cards to the main list-items-container
	listItemsContainer.appendChild(container);
}




	sortButtons.forEach(button => {
		 button.addEventListener('click', function () {
			  // Remove 'selected' class from all buttons
			  sortButtons.forEach(btn => btn.classList.remove('selected'));

			  // Add 'selected' class to the clicked button
			  button.classList.add('selected');

			  sortAndDisplayVideos(); });
	});
