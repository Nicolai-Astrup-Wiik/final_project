
//MAKE ERRORS DISAPPEAR AFTER 5 SECONDS
export function resetErrorMessages(errorElements) {
  setTimeout(() => {
    errorElements.forEach((element) => (element.textContent = ""));
  }, 5000);
}
