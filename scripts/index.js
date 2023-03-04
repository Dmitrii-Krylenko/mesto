const editProfile = document.querySelector('.profile__edit');
const addFoto = document.querySelector('.profile__add')
const editPopup = document.querySelector('.popup');
const addPopup = document.querySelector('.popup_add');
const openPhotoBig = document.querySelector('.popup_photo_big');
const photoBigSrcAlt = document.querySelector('.elements__image_big');
const photoBigTitle = document.querySelector('.popup__header_big');

function open() {
  editPopup.classList.add('popup_opened');
  nameValue.value = nameWrite.textContent;
  occupationValue.value = occupationWrite.textContent;
}
function openAdd() {
  addPopup.classList.add('popup_opened');
}
function openPhoto(evt) {
  photoBigSrcAlt.src = evt.target.src;
  photoBigSrcAlt.alt = evt.target.alt;
  photoBigTitle.textContent = evt.target.alt;
  openPhotoBig.classList.add('popup_opened');
}
function closePhotoBig() {
  openPhotoBig.classList.remove('popup_opened');
}
function close() {
  editPopup.classList.remove('popup_opened');
}
function closeAdd() {
  addPopup.classList.remove('popup_opened');
}
editProfile.addEventListener('click', open);
addFoto.addEventListener('click', openAdd);

const closePopup = document.querySelector('.popup__close');
const closePopupFoto = document.querySelector('.popup__close_foto');
const closePhoto = document.querySelector('.popup__close_photo_big');
closePopup.addEventListener('click', close);
closePopupFoto.addEventListener('click', closeAdd);
closePhoto.addEventListener('click', closePhotoBig);
const nameWrite = document.querySelector('.profile__name');
const occupationWrite = document.querySelector('.profile__occupation');
const nameValue = document.querySelector('.popup__input_inter_name');
const occupationValue = document.querySelector('.popup__input_inter_occupation');
const savePopupAdd = document.querySelector('.popup__save-add');

const formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameWrite.textContent = nameValue.value;
  occupationWrite.textContent = occupationValue.value;
  close();
}

formElement.addEventListener('submit', handleFormSubmit);


function likePhoto(evt) {
  evt.target.classList.toggle('elements__like_active');
}
function deletePhoto(evt) {
  const deleteCard = evt.target.closest('.elements__card');
  deleteCard.remove();
}
const photoPlace = document.querySelector('.elements');

function createNewCard(card) {
  const elementCard = document.querySelector('#templateCard').content.cloneNode(true);
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
  photoPlace.prepend(elementCard);
}


initialCards.forEach(createNewCard);

addPopup.addEventListener('submit', createElementSubmit);
function createElementSubmit(evt) {
  evt.preventDefault();
  const formElement = evt.target;
  const nameElement = formElement.querySelector('.popup__input_inter_title').value;
  const imageElement = formElement.querySelector('.popup__input_inter_link').value;
  const newElement = {
    name: nameElement,
    link: imageElement
  }
  createNewCard(newElement);
  closeAdd();
}
