const htmlElement = document.querySelector('html');
const contactsButtonElement = document.querySelector('.contacts__button');

const modalElement = document.querySelector('.modal');
const modalCloseElement = modalElement.querySelector('.modal__close');
const modalFadeElement = modalElement.querySelector('.modal__wrapper');

const modalFormElement = modalElement.querySelector('.modal-form');
const modalNameElement = modalFormElement.querySelector('.modal-form__input--name');
const modalPhoneElement = modalFormElement.querySelector('.modal-form__input--phone');
const modalQuestionElement = modalFormElement.querySelector('.modal-form__input--question');

const questionsFormElement = document.querySelector('.questions-form');
const questionNameElement = questionsFormElement.querySelector('.questions-form__input--name');
const questionPhoneElement = questionsFormElement.querySelector('.questions-form__input--phone');
const questionTextareaElement = questionsFormElement.querySelector('.questions-form__input--question');

const ESC_KEYCODE = 27;

let isStorageSupport = true;
let storageName = '';
let storagePhone = '';
let storageQuestion = '';
let storageQuestionName = '';
let storageQuestionPhone = '';
let storageQuestionTextarea = '';

try {
  storageName = localStorage.getItem('name');
  storagePhone = localStorage.getItem('phone');
  storageQuestion = localStorage.getItem('question')
  storageQuestionName = localStorage.getItem('questionName');
  storageQuestionPhone = localStorage.getItem('questionPhone');
  storageQuestionTextarea = localStorage.getItem('questionTextarea')
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

if (storageQuestionName) {
  questionNameElement.value = storageQuestionName;
}

if (storageQuestionPhone) {
  questionPhoneElement.value = storageQuestionPhone;
}

if (storageQuestionTextarea) {
  questionTextareaElement.value = storageQuestionTextarea;
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

const onContactsButtonClick = function () {
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

modalFormElement.addEventListener('submit', function (e) {
  if (!modalNameElement.value || !modalPhoneElement.value || !modalQuestionElement.value) {
    e.preventDefault();
    return;
  } else
    if (isStorageSupport) {
      localStorage.setItem('name', modalNameElement.value);
      localStorage.setItem('phone', modalPhoneElement.value);
      localStorage.setItem('question', modalQuestionElement.value);
    }
});

questionsFormElement.addEventListener('submit', function (e) {
  if (!questionNameElement.value || !questionPhoneElement.value || !questionTextareaElement.value) {
    e.preventDefault();
    return;
  } else
    if (isStorageSupport) {
      localStorage.setItem('questionName', questionNameElement.value);
      localStorage.setItem('questionPhone', questionPhoneElement.value);
      localStorage.setItem('questionTextarea', questionTextareaElement.value);
    }
});

window.addEventListener("DOMContentLoaded", function () {
  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select()
    }
  }

  function mask(event) {
    var matrix = "+7 (___) ___ ____",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
    if (event.type == "blur") {
      if (this.value.length == 2) this.value = ""
    } else setCursorPosition(this.value.length, this)
  };

  var modalPhone = document.querySelector("#modal-phone");
  var questionPhone = document.querySelector("#question-phone");

  modalPhone.addEventListener("input", mask, false);
  modalPhone.addEventListener("focus", mask, false);
  modalPhone.addEventListener("blur", mask, false);
  questionPhone.addEventListener("input", mask, false);
  questionPhone.addEventListener("focus", mask, false);
  questionPhone.addEventListener("blur", mask, false);
});

const navCheckbox = document.querySelector('.navigation__checkbox');
const adrCheckbox = document.querySelector('.address__checkbox');

navCheckbox.addEventListener('change', function () {
  if (navCheckbox.checked) {
    adrCheckbox.checked = false;
  }
})

adrCheckbox.addEventListener('change', function () {
  if (adrCheckbox.checked) {
    navCheckbox.checked = false;
  }
})