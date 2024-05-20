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
} from "firebase/auth";
import { listItemContainer } from "./menu";

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
const loginButton = document.querySelector(".login-button");
const logOutButton = document.querySelector(".logout-button");
const container = document.querySelector(".list-items-container");
const addFilmPage = document.querySelector(".add-film-page");
const addFilmForm = document.querySelector(".add-film-form");
const filmFormContainer = document.querySelector(".form-elements-container");
const filmTitle = document.getElementById("title");
const filmDate = document.getElementById("date");
const filmAgency = document.getElementById("agency");
const filmUrl = document.getElementById("url");
const filmSubmitButton = document.querySelector(".film-submit-button");

export const getFilms = async () => {
  const snapshot = await getDocs(filmRef);
  snapshot.docs.forEach((film) => {
    const data = film.data();
    const iframe = document.createElement("iframe");
    iframe.src = data.url;
    iframe.classList.add("video-card");
    container.appendChild(iframe);
  });
};

//export const addFilm = async (input) => {
//  await addDoc(filmRef, input);
//};

export async function firebaseLogin(email, password) {
  console.log(email, password);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in

    //getFilms();
  } catch (error) {
    console.log("macmac", error);

    const errorMessage = error.message;
  }
}

//getFilms();

const signOutUser = async () => {
  await signOut(auth);
  container.style.display = "none";
  loginPage.style.display = "flex";
};

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const userEmailInput = emailInput.value.trim();
  const userPasswordInput = passwordInput.value.trim();
  firebaseLogin(userEmailInput, userPasswordInput);
});

logOutButton.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth);
  signOutUser();
});

let unsubscribeFromAuthState;

unsubscribeFromAuthState = onAuthStateChanged(auth, (user) => {
  if (user) {
    removeVideos();
    container.style.display = "flex";
    loginPage.style.display = "none";
    console.log("macmac");

    getFilms();
  } else {
    removeVideos();

    container.style.display = "none";
    loginPage.classList.add("visible");
  }
});

function unsubscribeAuthStateListener() {
  if (unsubscribeFromAuthState) {
    unsubscribeFromAuthState();
  }
}

filmSubmitButton.addEventListener("click", async (e) => {
  console.log("YOYOYOYOYY");

  const userTtileinput = filmTitle.value.trim();
  const userFilmDateInput = filmDate.value.trim();
  const userAgencyInput = filmAgency.checked;
  const userUrlInput = filmUrl.value.trim();

  await addFilm(
    userTtileinput,
    userFilmDateInput,
    userAgencyInput,
    userUrlInput
  );
});

async function addFilm(title, date, agency, url) {
  await addDoc(collection(db, "films"), {
    agency: agency,
    date: date,
    name: title,
    url: url,
  });
}

function removeVideos() {
  var iframes = document.getElementsByClassName("video-card");
  while (iframes[0]) {
    iframes[0].parentNode.removeChild(iframes[0]);
  }
}
