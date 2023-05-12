import Popup from "./popup";
import { formValidationConfig } from "./constans.js";
export default class PopupWithConfirmation extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector(`${selector} ${formValidationConfig.formSelector}`);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._id, this._cardElement);
            this.close();
        })
    }

    open(id, cardElement) {
        this._id = id;
        this._cardElement = cardElement;
        super.open();
    }

    close() {
        super.close();
    }
}

