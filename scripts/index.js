let editProfile = document.querySelector('.profile__edit');
let editPopup = document.querySelector('.popup-edit_display-none');
function open () {
    editPopup.classList.remove('popup-edit_display-none');
}
function close () {
    editPopup.classList.add('popup-edit_display-none');
}
editProfile.addEventListener('click', open);

let closePopup = document.querySelector('.popup-edit__close ');
closePopup.addEventListener('click', close);

let userName = 'Жак-Ив Кусто';
let userOccupation = 'Исследователь океана';

let nameWrite = document.querySelector('.profile__name');
let occupationWrite = document.querySelector('.profile__occupation');
let nameValue = document.querySelector('.form__name');
let occupationValue = document.querySelector('.form__occupation');
nameWrite.textContent = userName;
nameValue.value = userName;
occupationValue.value = userOccupation;
occupationWrite.textContent = userOccupation;

let formElement = document.querySelector('.popup__form');

function handleFormSubmit (evt) {
    evt.preventDefault();
nameWrite.textContent = nameValue.value;
occupationWrite.textContent =occupationValue.value;
close ();
}

formElement.addEventListener('submit', handleFormSubmit); 