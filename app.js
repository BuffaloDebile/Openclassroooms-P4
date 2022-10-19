// Selectors and variables

const hamburgerMenu = document.querySelector('.nav-links');
const inscriptionBtns = document.querySelectorAll('.inscription-btns');
const hamburgerMenuArrow = document.getElementById('hamburger');
const modalForm = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');
const formContainer = document.querySelector('.modal-wrapper');

const errorMsg = document.querySelectorAll('.form-error-msg');
const inputFirstName = document.getElementById('first-name');
const inputlastName = document.getElementById('last-name');
const inputEmail = document.getElementById('email');
const inputBirthDate = document.getElementById('birthdate');
const inputGameQuantity = document.getElementById('quantity');
const inputRadio = document.querySelectorAll('input[type="radio"]');
const inputConditions = document.getElementById('checkbox1');
const submitFormButton = document.getElementById('submit');
const formRow = document.querySelectorAll('.form-row');
const rowSuccess = document.querySelector('.form-row-success');
const form = document.querySelector('form');

let isAnimating = false;

const dateBasse = new Date(1923, 1, 01);
const dateHaute = new Date(2004, 1, 01);
const dateNow = new Date(Date.now());

const inputsValidity = {
  firstName: false,
  lastName: false,
  email: false,
  birthDate: false,
  gameQuantity: false,
  inputRadio: false,
  conditions: false,
};

const regexEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Functions

function toggleHamburgerMenu() {
  hamburgerMenu.classList.toggle('opened');
  hamburgerMenuArrow.classList.toggle('hamburger-open');
}

function openModal() {
  formContainer.classList.add('open');
  modalForm.style.display = 'block';
}

function closeModal() {
  modalForm.style.display = 'none';
}

function resetForm() {
  window.location.reload();
}

function showValidation(inputName, index, valid, errorMessage) {
  if (valid) {
    errorMsg[index].textContent = '';
    errorMsg[index].style.display = 'none';
    inputName.classList.remove('input-error');
  } else {
    errorMsg[index].textContent = errorMessage;
    errorMsg[index].style.display = 'block';
    inputName.classList.add('input-error');
  }
}

function firstNameValidation() {
  if (inputFirstName.value.length >= 3) {
    showValidation(inputFirstName, 0, true, '');
    inputsValidity.firstName = true;
  } else {
    showValidation(
      inputFirstName,
      0,
      false,
      'Veuillez saisir au moins 3 caractères',
    );
    inputsValidity.firstName = false;
  }
}

function lastNameValidation() {
  if (inputlastName.value.length >= 3) {
    showValidation(inputlastName, 1, true, '');
    inputsValidity.lastName = true;
  } else {
    showValidation(
      inputlastName,
      1,
      false,
      'Veuillez saisir au moins 3 caractères',
    );
    inputsValidity.lastName = false;
  }
}

function emailValidation() {
  if (regexEmail.test(inputEmail.value)) {
    showValidation(inputEmail, 2, true, '');
    inputsValidity.email = true;
  } else {
    showValidation(
      inputEmail,
      2,
      false,
      'Veuillez saisir une adresse email valide',
    );
    inputsValidity.email = false;
  }
}

function birthdayValidation() {
  let anniversaire = new Date(inputBirthDate.value);
  if (anniversaire >= dateBasse && anniversaire <= dateHaute) {
    inputsValidity.birthDate = true;
    showValidation(inputBirthDate, 3, true, '');
  } else if (anniversaire < dateBasse) {
    inputsValidity.birthDate = false;
    showValidation(
      inputBirthDate,
      3,
      false,
      "Vous semblez être trop agé pour participer. Retournez a l'age de pierre",
    );
  } else if (anniversaire > dateNow) {
    inputsValidity.birthDate = false;
    showValidation(inputBirthDate, 3, false, 'Merci de rentrer un date valide');
  } else if (anniversaire > dateHaute && anniversaire <= dateNow) {
    inputsValidity.birthDate = false;
    showValidation(
      inputBirthDate,
      3,
      false,
      'Désolé, vous devez être majeur pour participer',
    );
  } else {
    inputsValidity.birthDate = false;
    showValidation(inputBirthDate, 3, false, 'Merci de rentrer un date valide');
  }
}

function gameQuantityValidation() {
  if (inputGameQuantity.value[0] != 0 && inputGameQuantity.value != '') {
    inputsValidity.gameQuantity = true;
    showValidation(inputGameQuantity, 4, true, '');
  } else {
    inputsValidity.gameQuantity = false;
    showValidation(
      inputGameQuantity,
      4,
      false,
      'Désolé, dois avoir au moins participé à au moins 1 tournoi',
    );
  }
}

function checkCitiesInputs() {
  var radios = document.querySelectorAll('input[type="radio"]:checked');
  if (radios.length > 0) {
    inputsValidity.inputRadio = true;
    errorMsg[5].textContent = '';
    errorMsg[5].style.display = 'none';
  } else {
    inputsValidity.inputRadio = false;
    errorMsg[5].textContent = 'Sélectionnez une ville';
    errorMsg[5].style.display = 'block';
  }
}

function checkConditionsAccepted() {
  if (inputConditions.checked) {
    inputsValidity.conditions = true;
    errorMsg[6].textContent = '';
    errorMsg[6].style.display = 'none';
  } else {
    inputsValidity.conditions = false;
    errorMsg[6].textContent = "Veuillez accepter les conditions d'utilisation";
    errorMsg[6].style.display = 'block';
  }
}

function handleForm(e) {
  e.preventDefault();

  const keys = Object.keys(inputsValidity);
  const failedInputs = keys.filter((key) => !inputsValidity[key]);

  if (failedInputs.length && !isAnimating) {
    formContainer.classList.remove('open');
    isAnimating = true;
    formContainer.classList.add('shake');

    firstNameValidation();
    lastNameValidation();
    emailValidation();
    birthdayValidation();
    gameQuantityValidation();
    checkCitiesInputs();
    checkConditionsAccepted();

    setTimeout(() => {
      formContainer.classList.remove('shake');
    }, 400);
    isAnimating = false;
  } else {
    formRow.forEach((row) => {
      row.style.display = 'none';
    });
    rowSuccess.style.display = 'block';
    submitFormButton.innerText = 'Fermer';
    submitFormButton.addEventListener('click', resetForm);
  }
}

// Event listeners
hamburgerMenuArrow.addEventListener('click', toggleHamburgerMenu);
modalClose.addEventListener('click', closeModal);
inscriptionBtns.forEach((btns) => btns.addEventListener('click', openModal));

inputFirstName.addEventListener('blur', firstNameValidation);
inputFirstName.addEventListener('input', firstNameValidation);
inputlastName.addEventListener('blur', lastNameValidation);
inputlastName.addEventListener('input', lastNameValidation);
inputEmail.addEventListener('blur', emailValidation);
inputEmail.addEventListener('input', emailValidation);
inputBirthDate.addEventListener('blur', birthdayValidation);
inputBirthDate.addEventListener('input', birthdayValidation);
inputGameQuantity.addEventListener('blur', gameQuantityValidation);
inputGameQuantity.addEventListener('input', gameQuantityValidation);
inputConditions.addEventListener('input', checkConditionsAccepted);
inputConditions.addEventListener('blur', checkConditionsAccepted);

inputRadio.forEach((radio) => {
  radio.addEventListener('blur', checkCitiesInputs);
  radio.addEventListener('input', checkCitiesInputs);
});

submitFormButton.addEventListener('click', handleForm);

// Close modal on click outside
window.onclick = (e) => {
  if (e.target == modalForm) {
    modalForm.style.display = 'none';
  }
};
