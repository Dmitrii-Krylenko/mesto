let editProfile = document.querySelector('.profile__edit');
let editPopup = document.querySelector('.popup_opened');
function open () {
    editPopup.classList.add('popup_opened');
}
function close () {
    editPopup.classList.remove('popup_opened');
}
editProfile.addEventListener('click', open);

let closePopup = document.querySelector('.popup__close ');
closePopup.addEventListener('click', close);

let userName = 'Жак-Ив Кусто';
let userOccupation = 'Исследователь океана';

let nameWrite = document.querySelector('.profile__name');
let occupationWrite = document.querySelector('.profile__occupation');
let nameValue = document.querySelector('.popup__input_inter_name');
let occupationValue = document.querySelector('.popup__input_inter_occupation');
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