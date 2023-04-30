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