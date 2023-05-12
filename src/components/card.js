class Card {
  constructor(card, templateSelector, handleOpenPhoto, handleDeletePhoto, currentUserId, setLike, deleteLike) {
    this._link = card.link;
    this._name = card.name;
    this._templateSelector = templateSelector;
    this._handleOpenPhoto = handleOpenPhoto;
    this._handleDeletePhoto = handleDeletePhoto;
    this._owner = card.owner
    this._likeCard = card.likes.length
    this._likes = card.likes
    this._currentUserId = currentUserId
    this._card = card
    this._setLike = setLike
    this._deleteLike = deleteLike

  }

  _handleCardLike() {

    this.swichLike(this._card._id)

  }

  _handleDelete() {
    this._handleDeletePhoto(this._element);
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

  colorizeLike() {
    const likedFlag = this._isCurrentUserLiked();
    if (likedFlag) {
      this._likeBotton.classList.add('elements__like_active');
    } else {
      this._likeBotton.classList.remove('elements__like_active');
    }
    this._likePlace.textContent = this._card.likes.length

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
    this._likePlace = this._element.querySelector('.elements__likes-number')
    this._likePlace.textContent = this._likeCard

    if (this._owner._id != this._currentUserId) {
      this._deleteCard.classList.add('hidden');
    }

    this._setEventListeners();

    const likedFlag = this._isCurrentUserLiked();
    if (likedFlag) {
      this._likeBotton.classList.add('elements__like_active');
      console.log('Ура!')
    } else {
    }
    return this._element;
  }


  _isCurrentUserLiked() {
    const result = this._likes.some((like) => {
      return like._id === this._currentUserId
    })
    return result;
  }

  swichLike(like_id) {
    if (this._isCurrentUserLiked()) {
      this._deleteLike(like_id)
        .then((card) => {
          this._card = card
          this._likes = card.likes
          this.colorizeLike()
        }) 
        .catch((err)=>{
          console.log(err)
        })
    }
    else {
      this._setLike(like_id)
        .then((card) => {
          this._card = card
          this._likes = card.likes
          this.colorizeLike()
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }

}



export default Card;