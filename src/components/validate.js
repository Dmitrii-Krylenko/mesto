class Validate {
    constructor(form, config) {
        this._form = form;
        this._config = config;
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._submitButton = this._form.querySelector(this._config.submitButtonSeletor);
    }

    disableButton() {
        this._submitButton.disabled = true;
        this._submitButton.classList.add(this._config.activeButtonClass);
    }

    enableButton() {
        this._submitButton.disabled = false;
        this._submitButton.classList.remove(this._config.activeButtonClass);
    }

    _showInputError(input, validationMessage) {
        const errorTextElement = this._form.querySelector(`${this._config.errorClassTemplate}${input.name}`);
        errorTextElement.textContent = validationMessage
        errorTextElement.classList.add(this._config.activeErrorClass);
        input.classList.add(this._config.activeErrorClassBoarder);
    }

    _hideInputError(input, validationMessage) {
        const errorTextElement = this._form.querySelector(`${this._config.errorClassTemplate}${input.name}`);
        errorTextElement.textContent = validationMessage
        input.classList.remove(this._config.activeErrorClassBoarder);
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableButton();
        }
        else {
            this.enableButton();
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((input) => !input.validity.valid);
    }

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showInputError(input, input.validationMessage);
        }
        else {
            this._hideInputError(input);
        }
    }

    _setEventListeners() {
        this._inputList.forEach((input) => {
            input.addEventListener('input', (evt) => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            })
        })
    }

    enableValidation() {
        this._setEventListeners();
    }
}

export default Validate;
