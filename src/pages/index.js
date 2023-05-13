import './index.css'
import { formValidationConfig, initialCards } from "../blocks/utils/Constans.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
const editProfile = document.querySelector('.profile__edit');
const addPhoto = document.querySelector('.profile__add')
const addPopup = document.querySelector('.popup_add');
const editAvatar = document.querySelector('.profile__button')
const saveAvatar = document.querySelector('.popup_avatar')

let currnetUser = null;

const nameValue = document.querySelector('.popup__input_inter_name');
const occupationValue = document.querySelector('.popup__input_inter_occupation');
const profileForm = document.querySelector('.popup__form_edit-profile');

const validatorElemet = new FormValidator(profileForm, formValidationConfig);
validatorElemet.enableValidation();

const validatorAdd = new FormValidator(addPopup, formValidationConfig);
validatorAdd.enableValidation();

const validatorAvatar = new FormValidator(saveAvatar, formValidationConfig);
validatorAvatar.enableValidation();

const popupWithImage = new PopupWithImage('.popup_photo_big')
popupWithImage.setEventListeners()

const popupWithConfirmation = new PopupWithConfirmation('.popup_delete', (id, element) => {
  api.deleteCard(id).then(() => {
    element.remove();
    popupWithConfirmation.close()
  })
    .catch((err) => {
      console.log(err)
    })
})
popupWithConfirmation.setEventListeners()

const createCard = (item) => {
  const element = new Card(item, '#templateCard', (name, link) => {
    popupWithImage.open(name, link)
  }, (cardElement) => {
    popupWithConfirmation.open(item._id, cardElement)
  }, currnetUser._id, (like_id) => {
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

Promise.all([api.getUserInfo(), api.getInitialCards()])

  .then(([info, cards]) => {
    const infoAdapted = userInfo.adaptFromServer(info)
    userInfo.setUserInfo(infoAdapted)
    userInfo.setUserAvatar(infoAdapted.avatar)
    currnetUser = info;
    section.renderItems(cards)
  })
  .catch(err => {
    console.log(err)
  });

const popupWithFormProfile = new PopupWithForm('.popup_edit-profil', (data) => {
  popupWithFormProfile.loadingButton(true)
  api.editUserInfo(data.name, data.occupation)
    .then(() => {
      userInfo.setUserInfo(data);
      popupWithFormProfile.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupWithFormProfile.loadingButton(false);
    })
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
  api.editPhoto(item.name, item.link)
    .then((itemServer) => {
      const card = createCard(itemServer);
      section.addItem(card);
      popupWithFormAdd.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupWithFormAdd.loadingButton(false);
    })

})

popupWithFormAdd.setEventListeners()

const popupEditAvatar = new PopupWithForm('.popup_avatar', (data) => {
  popupEditAvatar.loadingButton(true);
  api.editUserAva(data.link)
    .then((data) => {
      console.log(data);
      userInfo.setUserAvatar(data.avatar)
      popupEditAvatar.close()
    })
    .catch((err) => {
    })
    .finally(() => {
      popupEditAvatar.loadingButton(false);
    })

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
