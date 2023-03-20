const editProfile = document.querySelector('.profile__edit');
// FIXME: photo
const addFoto = document.querySelector('.profile__add')
const editPopup = document.querySelector('.popup');
const addPopup = document.querySelector('.popup_add');
const openImage = document.querySelector('.popup_photo_big');
const photoAttribute = document.querySelector('.popup__image-big');
const photoTitle = document.querySelector('.popup__header_big');
const nameElement = document.querySelector('.popup__input_inter_title');
const imageElement = document.querySelector('.popup__input_inter_link');

const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape)
  popupElement.addEventListener('click', closePopupOverlay)

};
const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  popupElement.addEventListener('click', closePopupOverlay)
};

const closePopupEscape = (evt) =>{
    if (evt.key === 'Escape') {
      const popupOpenned = document.querySelector('.popup_opened');
      closePopup(popupOpenned);
    }
}

const closePopupOverlay = (evt) =>{
  if (evt.target === evt.currentTarget) {
    const popupOpenned = document.querySelector('.popup_opened');
    closePopup(popupOpenned);
  }
}

function openEditProfile() {
  openPopup(editPopup);
  nameValue.value = nameWrite.textContent;
  occupationValue.value = occupationWrite.textContent;
  const form = document.querySelector('.popup__form_edit-profile');
  const button = form.querySelector('.popup__save');
  const inputList = form.querySelectorAll('.popup__input');
  toggleButtonState(button, inputList)
}
function openAdd() {
  openPopup(addPopup);
  nameElement.value = '';
  imageElement.value = '';
  const form = document.querySelector('.popup__form-add');
  const button = form.querySelector('.popup__save');
  const inputList = form.querySelectorAll('.popup__input');
  toggleButtonState(button, inputList)
}

function openPhoto(evt) {
  photoAttribute.src = evt.target.src;
  photoAttribute.alt = evt.target.alt;
  photoTitle.textContent = evt.target.alt;
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
  
editProfile.addEventListener('click', openEditProfile);
addFoto.addEventListener('click', openAdd);

const buttonClose = document.querySelector('.popup__close');
const buttonCloseFoto = document.querySelector('.popup__close_foto');
const closePhoto = document.querySelector('.popup__close_photo_big');
buttonClose.addEventListener('click', closeEditProfile);
buttonCloseFoto.addEventListener('click', closeAdd);
closePhoto.addEventListener('click', closePhotoBig);



const nameWrite = document.querySelector('.profile__name');
const occupationWrite = document.querySelector('.profile__occupation');
const nameValue = document.querySelector('.popup__input_inter_name');
const occupationValue = document.querySelector('.popup__input_inter_occupation');

const formElement = document.querySelector('.popup__form');

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  nameWrite.textContent = nameValue.value;
  occupationWrite.textContent = occupationValue.value;
  closeEditProfile();
}

formElement.addEventListener('submit', handleEditProfileFormSubmit);


function likePhoto(evt) {
  evt.target.classList.toggle('elements__like_active');
}
function deletePhoto(evt) {
  const deleteCard = evt.target.closest('.elements__card');
  deleteCard.remove();
}
const photoPlace = document.querySelector('.elements');

function createNewCard(card) {
  const elementCard = document.querySelector('#templateCard')
    .content.querySelector('.elements__card').cloneNode(true);
  const elementText = elementCard.querySelector('.elements__text');
  elementText.textContent = card.name;
  const elementsImage = elementCard.querySelector('.elements__image');
  elementsImage.setAttribute('src', card.link);
  elementsImage.setAttribute('alt', card.name);
  const like = elementCard.querySelector('.elements__like');
  like.addEventListener('click', likePhoto)
  const deleteCard = elementCard.querySelector('.elements__trash');
  deleteCard.addEventListener('click', deletePhoto);
  const imageButton = elementCard.querySelector('.elements__image');
  imageButton.addEventListener('click', openPhoto);
  return elementCard;
}

const addCardDom = (item) => {
  const element = createNewCard(item);
  photoPlace.prepend(element);
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