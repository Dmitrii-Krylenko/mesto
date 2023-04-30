import Popup from "./popup.js";
import {formValidationConfig} from "./constans.js";

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector)
        this._handleFormSubmit = handleFormSubmit
        this._inputList = this._popupElement.querySelectorAll(formValidationConfig.inputSelector)
        this._form = this._popupElement.querySelector(`${selector} ${formValidationConfig.formSelector}`)
        this._values = {}

    }
    // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
    _getInputValues() {
        this._inputList.forEach((input) => {
            const inputName = input.name
            const inputValue = input.value
            this._values [inputName] = inputValue

        });
        return this._values 

    }
    // Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())
            this.close()
        })

    }
    // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
    close() {
        super.close()
        this._form.reset()
    }
}

