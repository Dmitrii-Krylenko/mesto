import Card from "./card.js";
import Validate from "./validate.js";
const editProfile = document.querySelector('.profile__edit');
const addPhoto = document.querySelector('.profile__add')
const editPopup = document.querySelector('.popup');
const addPopup = document.querySelector('.popup_add');
const openImage = document.querySelector('.popup_photo_big');
const photoAttribute = document.querySelector('.popup__image-big');
const photoTitle = document.querySelector('.popup__header_big');
const nameElement = document.querySelector('.popup__input_inter_title');
const imageElement = document.querySelector('.popup__input_inter_link');
const buttonClose = document.querySelector('.popup__close');
const buttonClosePhoto = document.querySelector('.popup__close_foto');
const closePhoto = document.querySelector('.popup__close_photo_big');
// const formEditProfile = document.querySelector('.popup__form_edit-profile');
// const buttonEditProfile = formEditProfile.querySelector('.popup__save');
// const inputListEditProfile = formEditProfile.querySelectorAll('.popup__input');
// const formAdd = document.querySelector('.popup__form_edit-profile');
// const buttonAdd = formAdd.querySelector('.popup__save');
// const inputListAdd = formAdd.querySelectorAll('.popup__input');
const photoPlace = document.querySelector('.elements');


const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  popupElement.addEventListener('click', closePopupOverlay);

};
const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
  popupElement.removeEventListener('click', closePopupOverlay);
};

const closePopupEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpenned = document.querySelector('.popup_opened');
    closePopup(popupOpenned);
  }
}

const closePopupOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function openEditProfile() {
  openPopup(editPopup);
  nameValue.value = nameWrite.textContent;
  occupationValue.value = occupationWrite.textContent;
  // toggleButtonState(buttonEditProfile, inputListEditProfile)


}
const openAdd = (config) => {
  openPopup(addPopup);
  nameElement.value = '';
  imageElement.value = '';
  // toggleButtonState(buttonAdd, inputListAdd, config.activeButtonClass);
}

// function openPhoto(evt) {
//   photoAttribute.src = evt.target.src;
//   photoAttribute.alt = evt.target.alt;
//   photoTitle.textContent = evt.target.alt;
//   openPopup(openImage);
// }

function handleOpenPhoto(name, link) {
  photoAttribute.src = link;
  photoAttribute.alt = name;
  photoTitle.textContent = name;
  openPopup(openImage);
}

function closePhotoBig() {
  closePopup(openImage);
}
function closeEditProfile() {
  closePopup(editPopup);
}
function closeAdd() {
  closePopup(addPopup);
}

editProfile.addEventListener('click', () => {
  openEditProfile(formValidationConfig);
});

addPhoto.addEventListener('click', () => {
  openAdd(formValidationConfig);
});

buttonClose.addEventListener('click', closeEditProfile);
buttonClosePhoto.addEventListener('click', closeAdd);
closePhoto.addEventListener('click', closePhotoBig);



const nameWrite = document.querySelector('.profile__name');
const occupationWrite = document.querySelector('.profile__occupation');
const nameValue = document.querySelector('.popup__input_inter_name');
const occupationValue = document.querySelector('.popup__input_inter_occupation');

const formElement = document.querySelector('.popup__form');

function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  nameWrite.textContent = nameValue.value;
  occupationWrite.textContent = occupationValue.value;
  closeEditProfile();
}

formElement.addEventListener('submit', editProfileFormSubmitHandler);


// function likePhoto(evt) {
//   evt.target.classList.toggle('elements__like_active');
// }
// function deletePhoto(evt) {
//   const deleteCard = evt.target.closest('.elements__card');
//   deleteCard.remove();
// }

// function createNewCard(card) {
//   const elementCard = document.querySelector('#templateCard')
//     .content.querySelector('.elements__card').cloneNode(true);
//   const elementText = elementCard.querySelector('.elements__text');
//   elementText.textContent = card.name;
//   const elementsImage = elementCard.querySelector('.elements__image');
//   elementsImage.setAttribute('src', card.link);
//   elementsImage.setAttribute('alt', card.name);
//   const like = elementCard.querySelector('.elements__like');
//   like.addEventListener('click', likePhoto)
//   const deleteCard = elementCard.querySelector('.elements__trash');
//   deleteCard.addEventListener('click', deletePhoto);
//   const imageButton = elementCard.querySelector('.elements__image');
//   imageButton.addEventListener('click', openPhoto);
//   return elementCard;
// }

// const addCardDom = (item) => {
//   const element = createNewCard(item);
//   photoPlace.prepend(element);
// };
const addCardDom = (item) => {
  const element = new Card(item, '#templateCard', handleOpenPhoto);
  photoPlace.prepend(element.getElement());
};

initialCards.forEach(addCardDom);
addPopup.addEventListener('submit', createElementSubmit);

function createElementSubmit(evt) {
  evt.preventDefault();
  const newElement = {
    name: nameElement.value,
    link: imageElement.value
  }
  addCardDom(newElement);
  closeAdd();
  nameElement.value = '';
  imageElement.value = '';
}

const validatorElemet = new Validate(formElement, formValidationConfig);
validatorElemet.enableValidation();

const validatorAdd = new Validate(addPopup, formValidationConfig);
validatorAdd.enableValidation();