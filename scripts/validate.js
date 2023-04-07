// const showInputError = (input, errorTextElement, validationMessage, activeErrorClass, activeErrorClassBoarder) => {
//     errorTextElement.textContent = validationMessage
//     errorTextElement.classList.add(activeErrorClass);
//     input.classList.add(activeErrorClassBoarder);
// }
// const hideInputError = (input, errorTextElement, activeErrorClass, activeErrorClassBoarder) => {
//     errorTextElement.classList.remove(activeErrorClass);
//     input.classList.remove(activeErrorClassBoarder);
//     errorTextElement.textContent = '';
// }
// const enableButton = (submitButton, activeButtonClass) => {
//     submitButton.disabled = false;
//     submitButton.classList.remove(activeButtonClass);
// }

// const disableButton = (submitButton, activeButtonClass) => {
//     submitButton.disabled = true;
//     submitButton.classList.add(activeButtonClass);
// }

// const toggleButtonState = (submitButton, inputList, activeButtonClass) => {
//     if (!hasInvalidInput(inputList)) {
//         enableButton(submitButton, activeButtonClass);
//     } else {
//         disableButton(submitButton, activeButtonClass);
//     }
// }

// const checkInputValidity = (input, errorClassTemplate, activeErrorClass, activeErrorClassBoarder) => {
//     const errorTextElement = document.querySelector(`${errorClassTemplate}${input.name}`);
//     if (!input.validity.valid) {
//         showInputError(input, errorTextElement, input.validationMessage, activeErrorClass, activeErrorClassBoarder);
//     } else {
//         hideInputError(input, errorTextElement, activeErrorClass, activeErrorClassBoarder);
//     }
// }

// const hasInvalidInput = (inputList) => {
//     return Array.from(inputList).some((input) => !input.validity.valid);
// }

// const setEventListeners = (form, inputList, errorClassTemplate, activeErrorClass, activeErrorClassBoarder, submitButton, activeButtonClass) => {
//     form.addEventListener('submit', (evt) => {
//         evt.preventDefault();
//     })
//     inputList.forEach((input) => {
//         input.addEventListener('input', (evt) => {
//             checkInputValidity(input, errorClassTemplate, activeErrorClass, activeErrorClassBoarder, submitButton);
//             toggleButtonState(submitButton, inputList, activeButtonClass);
//         })
//     })
// }

// const enableValidation = (config) => {
//     const formList = document.querySelectorAll(config.formSelector);
//     formList.forEach((formElement, index, list) => {
//         const inputList = formElement.querySelectorAll(config.inputSelector);
//         const submitButton = formElement.querySelector(config.submitButtonSeletor);

//         setEventListeners(formElement, inputList, config.errorClassTemplate, config.activeErrorClass, config.activeErrorClassBoarder, submitButton, config.activeButtonClass);
//     });
// }

// enableValidation(formValidationConfig);

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
        // errorTextElement.classList.remove(this._config.activeErrorClass);
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
