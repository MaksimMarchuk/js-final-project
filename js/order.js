const checkbox = document.getElementById('agree-checkbox');
const submitBtn = document.getElementById('submit-btn');

const nameInput = document.getElementById('name-input');
const surnameInput = document.getElementById('surname-input');
const emailInput = document.getElementById('email-input');
const phoneInput = document.getElementById('phone-input');
const addressInput = document.getElementById('address-input');

const textInputs = [nameInput, surnameInput, emailInput, phoneInput, addressInput];

function isFieldValid(input) {
  const value = input.value.trim();
  if (value === '') return false;

  if (input === emailInput) {
    return value.includes('@') && value.includes('.');
  }

  if (input === phoneInput) {
    return value.length >= 6;
  }

  return true;
}

function checkForm() {
  let formIsValid = true;

  textInputs.forEach(input => {
    if (isFieldValid(input)) {
      input.classList.remove('error');
    } else {
      input.classList.add('error');
      formIsValid = false;
    }
  });

  submitBtn.disabled = !(formIsValid && checkbox.checked);
}

textInputs.forEach(input => {
  input.addEventListener('input', checkForm);
});

checkbox.addEventListener('change', checkForm);

checkForm();

submitBtn.addEventListener('click', function(event) {
  event.preventDefault();
  alert('Замовлення успішно оформлено!');
  window.location.href = './index.html';
});