import { bioPage, container, filmPage } from "./elements";
import { films, getFilms, auth, deleteFilm } from "./firebase";
import { filterOrSortVideos } from "./sort";

//TOGGLE DELETE BUTTONS VISIBLE OR NOT
function toggleDeleteButtons(user) {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach(button => {
    button.style.display = user ? "block" : "none";
  });
}

// RENDER AND SORT FILMS TO PAGE
export const renderFilms = async () => {
  if (films.length === 0) {
    await getFilms();
  }
  removeVideos();
  filmPage.style.display = "block";
  bioPage.style.display = "none";

  let sortedFilms = filterOrSortVideos(films);
  container.style.display = "flex";

  sortedFilms.forEach((film) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("video-card");

    const iframe = document.createElement("iframe");
    iframe.src = film.url;
    iframe.allow =
      "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

   
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    //ADD EVENT LISTENER TO BUTTON BEFORE RENDER
    deleteButton.addEventListener("click", async () => {
      await deleteFilm(film.id);  
      wrapper.remove();  
    });

    wrapper.appendChild(iframe);
    wrapper.appendChild(deleteButton);

    container.appendChild(wrapper);
  });

  
  toggleDeleteButtons(auth.currentUser);
};

// REMOVE RENDERED FILMS
export function removeVideos() {
  var iframes = document.getElementsByClassName("video-card");
  while (iframes[0]) {
    iframes[0].parentNode.removeChild(iframes[0]);
  }
}

// WAIT FOR DOM TO LOAD AND RENDER FILMS
document.addEventListener("DOMContentLoaded", async function () {
  await renderFilms();
});

//LISTEN FOR LOGIN STATUS AND TOGGLE VISIBILITY
window.addEventListener('authStateChanged', (event) => {
  toggleDeleteButtons(event.detail.user);
});
