import { signOut } from "firebase/auth";
import { resetErrorMessages } from "./formValidationUtils";
import { firebaseLogin, signOutUser } from "./firebase";
import {
  closeLogInButton,
  emailInput,
  logInButton,
  logOutButton,
  loginPage,
  loginSubmitButton,
  passwordInput,
} from "./elements";

//OPEN AND CLOSE LOGIN MODAL
logInButton.addEventListener("click", (e) => {
  e.preventDefault();
  loginPage.showModal();
});

closeLogInButton.addEventListener("click", (e) => {
  e.preventDefault();
  loginPage.close();
});

//HANDLE AND VALIDATE LOGIN
loginSubmitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const userEmailInput = emailInput.value.trim();
  const userPasswordInput = passwordInput.value.trim();
  const emailErrorElement = document.getElementById("emailError");
  const passwordErrorElement = document.getElementById("passwordError");
  const userErrorElement = document.getElementById("userError");
  emailErrorElement.textContent = "";
  passwordErrorElement.textContent = "";
  userErrorElement.textContent = "";

  let hasError = false;

  // BASIC VALIDATION CONDITIONS
  if (!userEmailInput) {
    emailErrorElement.textContent = "Email is required.";
    hasError = true;
  }

  if (!userPasswordInput) {
    passwordErrorElement.textContent = "Password is required.";
    hasError = true;
  }

  // CHECK FOR EMAIL FORMAT
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

  //CHECK IF USER EXISTS IN FIREBASE
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
  signOutUser();
});
