// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, addDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  loginPage,
  logOutButton,
  logInButton,
  addFilmButton,
} from "./elements";

//Firebase configuration
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

export let films = [];

//RETRIEVE FILMS FROM FIREBASE
export const getFilms = async () => {
  films = [];
  const snapshot = await getDocs(filmRef);
  snapshot.docs.forEach((film) => {
    const data = film.data();
    films.push(data);
  });
};

//HANDLE LOGIN TO FIREBASE
export async function firebaseLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return true;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return false;
    } else {
      throw error;
    }
  }
}

//SIGN OUT
export const signOutUser = async () => {
  await signOut(auth);
};

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

//PUSH NEW FILM TO FIREBASE
export async function addFilm(title, date, agency, url) {
  await addDoc(collection(db, "films"), {
    agency: agency,
    date: date,
    name: title,
    url: url,
  });
}
