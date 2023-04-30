// Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

export default class UserInfo {
    constructor(selectorName, selectorOccupation) {
        this._selectorName = document.querySelector(selectorName)
        this._selectorOccupation = document.querySelector(selectorOccupation)

    }

    getUserInfo() {
        return {
            name: this._selectorName.textContent,
            occupation: this._selectorOccupation.textContent
        }

    }

    setUserInfo({ name, occupation }) {
        this._selectorName.textContent = name
        this._selectorOccupation.textContent = occupation
    }
}