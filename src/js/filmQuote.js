//FETCH FINAL SPACE QUOTES AND SELECT RANDOM
export const fetchQuote = async () => {
  let randomIndex = Math.floor(Math.random() * 50);
  if (randomIndex === 0) {
    randomIndex = 1;
  }
  const result = await fetch("https://finalspaceapi.com/api/v0/quote/");
  const data = await result.json();

  const randomQuote = data[randomIndex];
  return randomQuote;
};

//RENDER QUOTE AND BY
export const renderQuote = async () => {
  const bioPage = document.querySelector(".bio-page");
  const bioText = document.querySelector(".bio-text");
  const quoteContainer = document.createElement("div");
  const quoteH3 = document.createElement("h3");
  const quoteP = document.createElement("p");
  const quote = await fetchQuote();

  if (quote) {
    quoteH3.textContent = quote.quote;
    quoteP.textContent = "- " + quote.by;

    quoteContainer.appendChild(quoteH3);
    quoteContainer.appendChild(quoteP);
    bioPage.insertBefore(quoteContainer, bioText);
    quoteContainer.style.marginBottom = "2rem";
  } else {
    console.log("cannot fetch quote");
  }
};
document.addEventListener("DOMContentLoaded", renderQuote);
