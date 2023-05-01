import './index.css'
import { formValidationConfig, initialCards } from "../src/components/constans.js";
import Card from "../src/components/card.js";
import Section from "../src/components/Section.js";
import Validate from "../src/components/validate.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import UserInfo from "../src/components/UserInfo.js";
const editProfile = document.querySelector('.profile__edit');
const addPhoto = document.querySelector('.profile__add')
const addPopup = document.querySelector('.popup_add');

const nameValue = document.querySelector('.popup__input_inter_name');
const occupationValue = document.querySelector('.popup__input_inter_occupation');

const formElement = document.querySelector('.popup__form_edit-profile');


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

addPhoto.addEventListener('click', () => {
  popupWithFormAdd.open()
})



const validatorElemet = new Validate(formElement, formValidationConfig);
validatorElemet.enableValidation();

const validatorAdd = new Validate(addPopup, formValidationConfig);
validatorAdd.enableValidation();