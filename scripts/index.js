let editProfile = document.querySelector('.profile__edit');
let editPopup = document.querySelector('.popup');
function open() {
    editPopup.classList.add('popup_opened');
    nameValue.value = nameWrite.textContent;
    occupationValue.value = occupationWrite.textContent;
}
console.log(open)
function close() {
    editPopup.classList.remove('popup_opened');
}
editProfile.addEventListener('click', open);

let closePopup = document.querySelector('.popup__close');
closePopup.addEventListener('click', close);

// let userName = 'Жак-Ив Кусто';
// let userOccupation = 'Исследователь океана';

let nameWrite = document.querySelector('.profile__name');
let occupationWrite = document.querySelector('.profile__occupation');
let nameValue = document.querySelector('.popup__input_inter_name');
let occupationValue = document.querySelector('.popup__input_inter_occupation');
// nameWrite.textContent = userName;
// nameValue.value = nameWrite.textContent;
// occupationValue.value = occupationWrite.textContent;
// occupationWrite.textContent = userOccupation;

let formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameWrite.textContent = nameValue.value;
    occupationWrite.textContent = occupationValue.value;
    close();
}

formElement.addEventListener('submit', handleFormSubmit); 