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
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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

export const getFilms = async () => {
  const container = document.querySelector(".list-items-container");
  const snapshot = await getDocs(filmRef);
  snapshot.docs.forEach((film) => {
    const data = film.data();
    const iframe = document.createElement("iframe");
    iframe.src = data.url;
    iframe.classList.add("video-card");
    container.appendChild(iframe);
  });
};

export const addFilm = async (input) => {
  await addDoc(filmRef, input);
};

export async function firebaseLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    return { type: "success", user };
  } catch (error) {
    const errorMessage = error.message;
    return { type: "error", message: errorMessage };
  }
}

getFilms();
