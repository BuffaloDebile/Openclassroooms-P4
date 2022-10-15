// Selectors

const hamburgerMenu = document.querySelector('.nav-links');
const inscriptionBtns = document.querySelectorAll('.inscription-btns');
const hamburgerMenuArrow = document.getElementById('hamburger');
const modalForm = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');

// Functions

function toggleHamburgerMenu() {
  hamburgerMenu.classList.toggle('opened');
  hamburgerMenuArrow.classList.toggle('hamburger-open');
}

function openModal() {
  modalForm.style.display = 'block';
}

function closeModal() {
  modalForm.style.display = 'none';
}

// Refresh on window resize
window.onresize = function () {
  hamburgerMenu.classList.remove('opened');
  hamburgerMenuArrow.classList.remove('hamburger-open');
};

// Event listeners
hamburgerMenuArrow.addEventListener('click', toggleHamburgerMenu);
modalClose.addEventListener('click', closeModal);
inscriptionBtns.forEach((btns) => btns.addEventListener('click', openModal));

window.onclick = (e) => {
  if (e.target == modalForm) {
    modalForm.style.display = 'none';
  }
};
