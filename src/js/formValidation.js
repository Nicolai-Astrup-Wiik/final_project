export function resetErrorMessages(errorElements) {
  setTimeout(() => {
    errorElements.forEach((element) => (element.textContent = ""));
  }, 5000);
}
