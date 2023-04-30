
export default class Popup {
    constructor(selector) {
        this._popupElement = document.querySelector(selector);
        this._closePhoto = this._popupElement.querySelector('.popup__close');
    }


    open() {
        this._popupElement.classList.add('popup_opened')
        this._handleEscClose = this._handleEscClose.bind(this)
        document.addEventListener('keydown', this._handleEscClose);
        this.setEventListeners();
    }


    close() {
        this._popupElement.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
        this._closePhoto.addEventListener('click', this.close.bind(this))
    }

}