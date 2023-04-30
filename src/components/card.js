class Card {
  constructor(card, templateSelector, handleOpenPhoto) {
    this._link = card.link;
    this._name = card.name;
    this._templateSelector = templateSelector;
    this._handleOpenPhoto = handleOpenPhoto;

  }

  _handleCardLike() {
    this._likeBotton.classList.toggle('elements__like_active');
  }

  _handleDelete() {
    this._element.remove();

  }

  _setEventListeners() {
    this._likeBotton.addEventListener('click', () => {
      this._handleCardLike();

    })

    this._deleteCard.addEventListener('click', () => {
      this._handleDelete();

    })
    this._imageButton.addEventListener('click', () => {
      this._handleOpenPhoto(this._name, this._link);
    })
  }

  _getTemplate() {
    const elementCard = document.querySelector(this._templateSelector)
      .content.querySelector('.elements__card').cloneNode(true);
    return elementCard;
  }

  getElement() {
    this._element = this._getTemplate();
    this._elementsImage = this._element.querySelector('.elements__image');
    this._elementsImage.src = this._link;
    this._elementsImage.alt = this._name;
    this._element.querySelector('.elements__text').textContent = this._name;
    this._likeBotton = this._element.querySelector('.elements__like');
    this._deleteCard = this._element.querySelector('.elements__trash');
    this._imageButton = this._element.querySelector('.elements__image')

    this._setEventListeners();


    return this._element;


  }
}

export default Card;