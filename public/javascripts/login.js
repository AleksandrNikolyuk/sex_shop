document.addEventListener('DOMContentLoaded', () => {
  const formElement = document.querySelector('form');
  const emailField = document.querySelector('input[name=email]');
  const userEmail = localStorage.getItem('userEmail');

  if (userEmail !== null) {
    emailField.value = userEmail;
  }
  formElement.addEventListener('submit', () => {
    localStorage.setItem('userEmail', emailField.value);
  });
});
