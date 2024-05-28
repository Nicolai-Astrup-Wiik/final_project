import { bioPage, container, filmPage } from "./elements";
import { films, getFilms } from "./firebase";
import { filterOrSortVideos } from "./sort";

//RENDER FILMS TO PAGE
export const renderFilms = async () => {
  if (films.length === 0) {
    await getFilms();
  }
  removeVideos();
  filmPage.style.display = "block";

  bioPage.style.display = "none";
  let sortedFilms = filterOrSortVideos(films);
  container.style.display = "flex";
  const button = document.querySelector(".add-film-button");

  sortedFilms.forEach((film) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("video-card");

    const iframe = document.createElement("iframe");
    iframe.src = film.url;
    iframe.allow =
      "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    wrapper.appendChild(iframe);

    container.appendChild(wrapper);
  });
};

//REMOVE RENDERED FILMS
export function removeVideos() {
  var iframes = document.getElementsByClassName("video-card");
  while (iframes[0]) {
    iframes[0].parentNode.removeChild(iframes[0]);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  await renderFilms();
});
