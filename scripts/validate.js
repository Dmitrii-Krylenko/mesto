const showInputError = (input, errorTextElement, validationMessage, activeErrorClass, activeErrorClassBoarder) => {
    errorTextElement.textContent = validationMessage
    errorTextElement.classList.add(activeErrorClass);
    input.classList.add(activeErrorClassBoarder)
}
const hideInputError = (input, errorTextElement, activeErrorClass, activeErrorClassBoarder) => {
    errorTextElement.classList.remove(activeErrorClass);
    input.classList.remove(activeErrorClassBoarder)
    errorTextElement.textContent = '';
}
const enableButton = (submitButton,activeButtonClass) => {
    submitButton.disabled = false;
    submitButton.classList.remove(activeButtonClass)
}

const disableButton = (submitButton, activeButtonClass) => {
    submitButton.disabled = true;
    submitButton.classList.add(activeButtonClass)
}

const checkInputValidity = (input, errorClassTemplate, activeErrorClass, activeErrorClassBoarder) => {
    const errorTextElement = document.querySelector(`${errorClassTemplate}${input.name}`);
    if (!input.validity.valid) {
        showInputError(input, errorTextElement, input.validationMessage, activeErrorClass, activeErrorClassBoarder);
    } else {
        hideInputError(input, errorTextElement, activeErrorClass, activeErrorClassBoarder);
    }
}

const hasInvalidInput = (inputList) => {
    return Array.from(inputList).some((input) => !input.validity.valid);
}

const toggleButtonState = (submitButton, activeButtonClass, inputList) => {
    if (!hasInvalidInput(inputList)) {
        enableButton(submitButton, activeButtonClass)
    } else {
        disableButton(submitButton, activeButtonClass)
    }
}

const setEventListeners = (form, inputList, errorClassTemplate, activeErrorClass, activeErrorClassBoarder, submitButton, activeButtonClass) => {
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })
    inputList.forEach((input) => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(input, errorClassTemplate, activeErrorClass, activeErrorClassBoarder, submitButton);
            toggleButtonState(submitButton, activeButtonClass, inputList)
        })
    })
}

const enableValidation = (config) => {
    const form = document.querySelector(config.formSelector);
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSeletor);
    setEventListeners(form, inputList, config.errorClassTemplate, config.activeErrorClass, config.activeErrorClassBoarder, submitButton, config.activeButtonClass);
}

enableValidation({
    formSelector: '.popup__form_edit-profile',
    inputSelector: '.popup__input',
    errorClassTemplate: '.popup__input_error-',
    activeErrorClass: 'popup__input_error',
    activeButtonClass: 'popup__save_none-active',
    activeErrorClassBoarder: 'popup__input_boarder',
    submitButtonSeletor: '.popup__button'
})

enableValidation({
    formSelector: '.popup__form-add',
    inputSelector: '.popup__input',
    errorClassTemplate: '.popup__input_error-',
    activeButtonClass: 'popup__save_none-active',
    activeErrorClass: 'popup__input_error',
    activeErrorClassBoarder: 'popup__input_boarder',
    submitButtonSeletor: '.popup__button'
})