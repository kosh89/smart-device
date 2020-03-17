const htmlElement = document.querySelector('html');
const contactsButtonElement = document.querySelector('.contacts__button');

const modalElement = document.querySelector('.modal');
const modalCloseElement = modalElement.querySelector('.modal__close');
const modalFadeElement = modalElement.querySelector('.modal__wrapper');
const modalFormSubmitElement = modalElement.querySelector('.modal-form__submit');

const modalNameElement = document.querySelector('.modal-form__input--name');
const modalPhoneElement = document.querySelector('.modal-form__input--phone');
const modalQuestionElement = document.querySelector('.modal-form__input--question');

const modalFormElement = modalElement.querySelector('.modal-form');
const ESC_KEYCODE = 27;

let isStorageSupport = true;
let storageName = '';
let storagePhone = '';
let storageQuestion = '';

try {
  storageName = localStorage.getItem('name');
  storagePhone = localStorage.getItem('phone');
  storageQuestion = localStorage.getItem('question')
} catch (err) {
  isStorageSupport = false;
}

if (storageName) {
  modalNameElement.value = storageName;
}

if (storagePhone) {
  modalPhoneElement.value = storagePhone;
}

if (storageQuestion) {
  modalQuestionElement.value = storageQuestion;
}

const onModalEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeModal();
  }
};

const onModalCloseClick = function () {
  closeModal();
};

const onModalFadeClick = function (evt) {
  if (event.target.classList.contains('modal__wrapper')) {
    closeModal();
  }
}

const closeModal = function () {
  modalElement.classList.add('modal--closed');
  htmlElement.style.overflowY = 'auto';

  document.removeEventListener('keydown', onModalEscPress);
  modalCloseElement.removeEventListener('click', onModalCloseClick);
  modalFadeElement.removeEventListener('click', onModalFadeClick);
};

const onContactsButtonClick = function() {
  if (modalElement.classList.contains('modal--closed')) {
    modalElement.classList.remove('modal--closed');
    htmlElement.style.overflowY = 'hidden';
    modalNameElement.focus();

    document.addEventListener('keydown', onModalEscPress);
    modalCloseElement.addEventListener('click', onModalCloseClick);
    modalFadeElement.addEventListener('click', onModalFadeClick);
  }
}

contactsButtonElement.addEventListener('click', onContactsButtonClick);

modalFormElement.addEventListener('submit', function(e) {
  if (!modalNameElement.value || !modalPhoneElement.value || !modalQuestionElement.value) {
    e.preventDefault();
    alert('Заполните все поля');
  } else {
    localStorage.setItem('name', modalNameElement.value);
    localStorage.setItem('phone', modalPhoneElement.value);
    localStorage.setItem('question', modalQuestionElement.value);
  }
})