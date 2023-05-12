import './index.css'
import { formValidationConfig, initialCards } from "../components/constans.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import Card from "../components/card.js";
import Section from "../components/Section.js";
import Validate from "../components/validate.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/api';
const editProfile = document.querySelector('.profile__edit');
const addPhoto = document.querySelector('.profile__add')
const addPopup = document.querySelector('.popup_add');
const editAvatar = document.querySelector('.profile__button')
const saveAvatar = document.querySelector('.popup_avatar')

let currnet_user = null;

const nameValue = document.querySelector('.popup__input_inter_name');
const occupationValue = document.querySelector('.popup__input_inter_occupation');
const formElement = document.querySelector('.popup__form_edit-profile');

const validatorElemet = new Validate(formElement, formValidationConfig);
validatorElemet.enableValidation();

const validatorAdd = new Validate(addPopup, formValidationConfig);
validatorAdd.enableValidation();

const validatorAvatar = new Validate(saveAvatar, formValidationConfig);
validatorAvatar.enableValidation();

const popupWithImage = new PopupWithImage('.popup_photo_big')
popupWithImage.setEventListeners()

const popupWithConfirmation = new PopupWithConfirmation('.popup_delete', (id, element) => {
  api.deleteCard(id).then(() => {
    element.remove();
  })
})
popupWithConfirmation.setEventListeners()

const createCard = (item) => {
  const element = new Card(item, '#templateCard', (name, link) => {
    popupWithImage.open(name, link)
  }, (cardElement) => {
    popupWithConfirmation.open(item._id, cardElement)
  }, currnet_user._id, (like_id) => {
    return api.setLike(like_id)
  }, (like_id) => {
    return api.deleteLike(like_id)
  });
  return element.getElement()
};

const section = new Section({
  renderer: (item) => {
    const card = createCard(item)
    section.addItem(card)
  },
},
  ".elements"
)

const userInfo = new UserInfo('.profile__name', '.profile__occupation', '.profile__avatar')

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '16cddbd8-a5a0-4ea8-ba7a-4e06d4944e1a',
    'Content-Type': 'application/json'
  }
})

api.getUserInfo()
  .then((info) => {
    const infoAdapted = userInfo.adaptFromServer(info)
    userInfo.setUserInfo(infoAdapted)
    userInfo.setUserAvatar(infoAdapted.avatar)
    currnet_user = info;
  })

api.getInitialCards()
  .then((cards) => {
    section.renderItems(cards)
  })

const popupWithFormProfile = new PopupWithForm('.popup_edit-profil', (data) => {
  popupWithFormProfile.loadingButton(true)
  userInfo.setUserInfo(data);
  api.editUserInfo(data.name, data.occupation)
  popupWithFormProfile.loadingButton(false)
})

popupWithFormProfile.setEventListeners()

editProfile.addEventListener('click', () => {
  const htmlData = userInfo.getUserInfo();
  nameValue.value = htmlData.name;
  occupationValue.value = htmlData.occupation;
  popupWithFormProfile.open();

})

const popupWithFormAdd = new PopupWithForm('.popup_add', (item) => {
  popupWithFormAdd.loadingButton(true);
  api.editPhoto(item.name, item.link).then((itemServer) => {
    const card = createCard(itemServer);
    section.addItem(card);
  })

  popupWithFormAdd.loadingButton(false);

})

popupWithFormAdd.setEventListeners()

const popupEditAvatar = new PopupWithForm('.popup_avatar', (data) => {
  popupEditAvatar.loadingButton(true);
  userInfo.setUserAvatar(data.link);
  api.editUserAva(data.link);
  popupEditAvatar.loadingButton(false);
})
popupEditAvatar.setEventListeners();

editAvatar.addEventListener('click', () => {
  validatorAvatar.disableButton();
  popupEditAvatar.open();
})

addPhoto.addEventListener('click', () => {
  validatorAdd.disableButton();
  popupWithFormAdd.open();
})
