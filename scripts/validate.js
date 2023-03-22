const showInputError = (input, errorTextElement, validationMessage, activeErrorClass, activeErrorClassBoarder) => {
    errorTextElement.textContent = validationMessage
    errorTextElement.classList.add(activeErrorClass);
    input.classList.add(activeErrorClassBoarder);
}
const hideInputError = (input, errorTextElement, activeErrorClass, activeErrorClassBoarder) => {
    errorTextElement.classList.remove(activeErrorClass);
    input.classList.remove(activeErrorClassBoarder);
    errorTextElement.textContent = '';
}
const enableButton = (submitButton, activeButtonClass) => {
    submitButton.disabled = false;
    submitButton.classList.remove(activeButtonClass);
}

const disableButton = (submitButton, activeButtonClass) => {
    submitButton.disabled = true;
    submitButton.classList.add(activeButtonClass);
}

const toggleButtonState = (submitButton, inputList, activeButtonClass) => {
    if (!hasInvalidInput(inputList)) {
        enableButton(submitButton, activeButtonClass);
    } else {
        disableButton(submitButton, activeButtonClass);
    }
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

const setEventListeners = (form, inputList, errorClassTemplate, activeErrorClass, activeErrorClassBoarder, submitButton, activeButtonClass) => {
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })
    inputList.forEach((input) => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(input, errorClassTemplate, activeErrorClass, activeErrorClassBoarder, submitButton);
            toggleButtonState(submitButton, inputList, activeButtonClass);
        })
    })
}

const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement, index, list) => {
        const inputList = formElement.querySelectorAll(config.inputSelector);
        const submitButton = formElement.querySelector(config.submitButtonSeletor);

        setEventListeners(formElement, inputList, config.errorClassTemplate, config.activeErrorClass, config.activeErrorClassBoarder, submitButton, config.activeButtonClass);
    });
}

enableValidation(formValidationConfig);
