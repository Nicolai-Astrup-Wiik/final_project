// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  doc,
  getDoc,
  query,
  getDocs,
  addDoc,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { filterOrSortVideos } from "./sort";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnbgppAJujXk6RJMQ9DgCGYA3VmORN1BI",
  authDomain: "film-portfolio-fae54.firebaseapp.com",
  projectId: "film-portfolio-fae54",
  storageBucket: "film-portfolio-fae54.appspot.com",
  messagingSenderId: "261763430075",
  appId: "1:261763430075:web:d04117b69349619c555b9e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const filmRef = collection(db, "films");

//Initialize login constants

const loginPage = document.querySelector(".login-page");
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const loginSubmitButton = document.querySelector(".login-submit-button");
const logOutButton = document.querySelector(".logout-button");
const container = document.querySelector(".list-items-container");
const addFilmPage = document.querySelector(".add-film-page");
const bioPage = document.querySelector(".bio-page");
const addFilmForm = document.querySelector(".add-film-form");
const filmFormContainer = document.querySelector(".form-elements-container");
const filmTitle = document.getElementById("title");
const filmDate = document.getElementById("date");
const filmAgency = document.getElementById("agency");
const filmUrl = document.getElementById("url");
const filmSubmitButton = document.querySelector(".film-submit-button");
const logInButton = document.querySelector(".login-button");
const addFilmButton = document.querySelector(".add-film-button");
const filmPage = document.querySelector(".film-page");
let films = [];

//RETRIEVE FILMS FROM FIREBASE
export const getFilms = async () => {
  films = [];
  const snapshot = await getDocs(filmRef);
  snapshot.docs.forEach((film) => {
    const data = film.data();
    films.push(data);
  });
};

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

//export const addFilm = async (input) => {
//  await addDoc(filmRef, input);
//};

//HANDLE LOGIN TO FIREBASE
async function firebaseLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Login successful:", userCredential);
    return true;
  } catch (error) {
    console.error("Error during login:", error);
    if (error.code === "auth/user-not-found") {
      return false;
    } else {
      throw error;
    }
  }
}

//async function checkIfUserExists(email) {
//  try {
//    const signInMethods = await fetchSignInMethodsForEmail(auth, email);

//    if (signInMethods.length > 0) {
//      return true;
//    } else {
//      return false;
//    }
//  } catch (error) {
//    throw error;
//  }
//}

//SIGN OUT
const signOutUser = async () => {
  await signOut(auth);
};

//HANDLE AND VALIDATE LOGIN
loginSubmitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const userEmailInput = emailInput.value.trim();
  const userPasswordInput = passwordInput.value.trim();

  // Clear previous error messages
  const emailErrorElement = document.getElementById("emailError");
  const passwordErrorElement = document.getElementById("passwordError");
  const userErrorElement = document.getElementById("userError");
  emailErrorElement.textContent = "";
  passwordErrorElement.textContent = "";
  userErrorElement.textContent = "";

  let hasError = false;

  // Basic validation
  if (!userEmailInput) {
    emailErrorElement.textContent = "Email is required.";
    hasError = true;
  }

  if (!userPasswordInput) {
    passwordErrorElement.textContent = "Password is required.";
    hasError = true;
  }

  // Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (userEmailInput && !emailPattern.test(userEmailInput)) {
    emailErrorElement.textContent = "Please enter a valid email address.";
    hasError = true;
  }

  if (hasError) {
    resetErrorMessages([
      emailErrorElement,
      passwordErrorElement,
      userErrorElement,
    ]);
    return;
  }

  try {
    const userExists = await firebaseLogin(userEmailInput, userPasswordInput);
    if (!userExists) {
      userErrorElement.textContent = "User does not exist.";
      resetErrorMessages([
        emailErrorElement,
        passwordErrorElement,
        userErrorElement,
      ]);
    }
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      userErrorElement.textContent = "Invalid password. Please try again.";
    } else {
      userErrorElement.textContent =
        "User does not exist or incorrect password";
    }
    resetErrorMessages([
      emailErrorElement,
      passwordErrorElement,
      userErrorElement,
    ]);
  }
});

//HANDLE LOGOUT CLICK
logOutButton.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth);
  signOutUser();
});

let unsubscribeFromAuthState;

unsubscribeFromAuthState = onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginPage.close();
    logInButton.style.display = "none";
    logOutButton.style.display = "flex";
    addFilmButton.style.display = "flex";
  } else {
    logOutButton.style.display = "none";
    logInButton.style.display = "flex";
    addFilmButton.style.display = "none";
  }
});

function unsubscribeAuthStateListener() {
  if (unsubscribeFromAuthState) {
    unsubscribeFromAuthState();
  }
}

//HANDLE AND VALIDATE NEW FILM SUBMIT
filmSubmitButton.addEventListener("click", async (e) => {
  const titleErrorElement = document.getElementById("title-error-message");
  const dateErrorElement = document.getElementById("date-error-message");
  const urlErrorElement = document.getElementById("url-error-message");

  titleErrorElement.textContent = "";
  dateErrorElement.textContent = "";
  urlErrorElement.textContent = "";

  const userTtileinput = filmTitle.value.trim();
  const userFilmDateInput = filmDate.value.trim();
  const userAgencyInput = filmAgency.checked;
  const userUrlInput = filmUrl.value.trim();

  let hasError = false;
  if (!userTtileinput) {
    titleErrorElement.textContent = "Please enter a title";
    hasError = true;
  }
  if (!userFilmDateInput) {
    dateErrorElement.textContent = "Please enter a date";
    hasError = true;
  }

  if (!userUrlInput) {
    urlErrorElement.textContent = "Please enter a url";
    hasError = true;
  }
  if (hasError) {
    return;
  }

  await addFilm(
    userTtileinput,
    userFilmDateInput,
    userAgencyInput,
    userUrlInput
  );
  await getFilms();
  await renderFilms();
  addFilmPage.close();
});

//PUSH NEW FILM TO FIREBASE
export async function addFilm(title, date, agency, url) {
  await addDoc(collection(db, "films"), {
    agency: agency,
    date: date,
    name: title,
    url: url,
  });
}

//REMOVE RENDERED FILMS
export function removeVideos() {
  var iframes = document.getElementsByClassName("video-card");
  while (iframes[0]) {
    iframes[0].parentNode.removeChild(iframes[0]);
  }
}

function resetErrorMessages(errorElements) {
  setTimeout(() => {
    errorElements.forEach((element) => (element.textContent = ""));
  }, 5000);
}

document.addEventListener("DOMContentLoaded", async function () {
  await renderFilms();
});
