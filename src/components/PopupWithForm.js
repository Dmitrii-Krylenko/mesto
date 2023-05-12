import Popup from "./popup.js";
import { formValidationConfig } from "./constans.js";

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popupElement.querySelectorAll(formValidationConfig.inputSelector);
        this._form = this._popupElement.querySelector(`${selector} ${formValidationConfig.formSelector}`);
        this._values = {};
        this._saveButton = this._popupElement.querySelector('.popup__save');
        this._saveButtonText = this._saveButton.textContent;

    }
    _getInputValues() {
        this._inputList.forEach((input) => {
            const inputName = input.name;
            const inputValue = input.value;
            this._values[inputName] = inputValue;

        });
        return this._values;

    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        })

    }

    close() {
        super.close();
        this._form.reset();
    }
    loadingButton(loading) {
        if (loading) {
            this._saveButton.textContent = 'Сохранение...';
        }
        else {
            this._saveButtonText;
        }
    }

}

