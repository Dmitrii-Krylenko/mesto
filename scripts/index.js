import { formValidationConfig, initialCards } from "./constans.js";
import Card from "./card.js";
import Section from "./Section.js";
import Validate from "./validate.js";
import Popup from "./popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
const editProfile = document.querySelector('.profile__edit');
const addPhoto = document.querySelector('.profile__add')
const editPopup = document.querySelector('.popup_edit-profil');
const addPopup = document.querySelector('.popup_add');
const openImage = document.querySelector('.popup_photo_big');
const photoAttribute = document.querySelector('.popup__image-big');
const photoTitle = document.querySelector('.popup__header_big');
const nameElement = document.querySelector('.popup__input_inter_title');
const imageElement = document.querySelector('.popup__input_inter_link');
const buttonClose = document.querySelector('#buttonClose');
const buttonClosePhoto = document.querySelector('.popup__close_foto');
const closePhoto = document.querySelector('.popup__close_photo_big');
const photoPlace = document.querySelector('.elements');


// const openPopup = (popupElement) => {
//   popupElement.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupEscape);
//   popupElement.addEventListener('click', closePopupOverlay);

// };
// const closePopup = (popupElement) => {
//   popupElement.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupEscape);
//   popupElement.removeEventListener('click', closePopupOverlay);
// };

// const closePopupEscape = (evt) => {
//   if (evt.key === 'Escape') {
//     const popupOpenned = document.querySelector('.popup_opened');
//     closePopup(popupOpenned);
//   }
// }

// const closePopupOverlay = (evt) => {
//   if (evt.target === evt.currentTarget) {
//     closePopup(evt.target);
//   }
// }

// function openEditProfile() {
//   openPopup(editPopup);
//   nameValue.value = nameWrite.textContent;
//   occupationValue.value = occupationWrite.textContent;
// }

// const openAdd = (config) => {
//   openPopup(addPopup);
//   nameElement.value = '';
//   imageElement.value = '';
// }



// function handleOpenPhoto(name, link) {
//   photoAttribute.src = link;
//   photoAttribute.alt = name;
//   photoTitle.textContent = name;
//   openPopup(openImage);
// }

// function closePhotoBig() {
//   closePopup(openImage);
// }
// function closeEditProfile() {
//   closePopup(editPopup);
// }
// function closeAdd() {
//   closePopup(addPopup);
// }

// editProfile.addEventListener('click', () => {
//   openEditProfile();
// });

// // editProfile.addEventListener('click', () => {
// //   const popupWithForm = new PopupWithForm ('.popup_edit-profil', ()=>{});
// //   popupWithForm.open()
// // });


// addPhoto.addEventListener('click', () => {
//   openAdd();
// });

// buttonClose.addEventListener('click', closeEditProfile);
// buttonClosePhoto.addEventListener('click', closeAdd);
// // closePhoto.addEventListener('click', closePhotoBig);



const nameWrite = document.querySelector('.profile__name');
const occupationWrite = document.querySelector('.profile__occupation');
const nameValue = document.querySelector('.popup__input_inter_name');
const occupationValue = document.querySelector('.popup__input_inter_occupation');

const formElement = document.querySelector('.popup__form_edit-profile');

// function editProfileFormSubmitHandler(evt) {
//   evt.preventDefault();
//   nameWrite.textContent = nameValue.value;
//   occupationWrite.textContent = occupationValue.value;
//   closeEditProfile();
// }

// formElement.addEventListener('submit', editProfileFormSubmitHandler);






// const createCard = (item) => {
//   const element = new Card(item, '#templateCard', handleOpenPhoto);
// return element.getElement()
// };

// const addCardDom = (item) => {
//   photoPlace.prepend(item);

// }

// const section = new Section (
//   {
//     renderer: (item) => {
// const card = createCard(item)
// section.addItem(card)
//     },
//     items: initialCards,
//   },
//   ".elements" 
// )
// section.renderItems()
// // initialCards.forEach((newElement)=>{
// //   addCardDom(createCard(newElement));

// // });
// addPopup.addEventListener('submit', createElementSubmit);

// function createElementSubmit(evt) {
//   evt.preventDefault();
//   const newElement = {
//     name: nameElement.value,
//     link: imageElement.value
//   }
//   addCardDom(createCard(newElement));
//   closeAdd();
//   nameElement.value = '';
//   imageElement.value = '';
// }



// function handleOpenPhoto(name, link) {
//   photoAttribute.src = link;
//   photoAttribute.alt = name;
//   photoTitle.textContent = name;
//   openPopup(openImage);

const createCard = (item) => {
  const element = new Card(item, '#templateCard', (name, link) => {
    const popupWithImage = new PopupWithImage('.popup_photo_big', name, link)
    popupWithImage.open()
  });
  return element.getElement()
};

const section = new Section(
  {
    renderer: (item) => {
      const card = createCard(item)
      section.addItem(card)
    },
    items: initialCards,
  },
  ".elements"
)
section.renderItems()

const userInfo = new UserInfo('.profile__name', '.profile__occupation')

const popupWithFormProfile = new PopupWithForm('.popup_edit-profil', (data) => {
  userInfo.setUserInfo(data);
})

editProfile.addEventListener('click', () => {
  const htmlData = userInfo.getUserInfo()
  nameValue.value = htmlData.name;
  occupationValue.value = htmlData.occupation;
  popupWithFormProfile.open()

})

const popupWithFormAdd = new PopupWithForm('.popup_add', (item) => {
  const card = createCard(item)
      section.addItem(card)

  
})

addPhoto.addEventListener('click', ()=>{
  popupWithFormAdd.open()
})




// initialCards.forEach((newElement)=>{
//   addCardDom(createCard(newElement));




const validatorElemet = new Validate(formElement, formValidationConfig);
validatorElemet.enableValidation();

const validatorAdd = new Validate(addPopup, formValidationConfig);
validatorAdd.enableValidation();