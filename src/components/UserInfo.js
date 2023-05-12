export default class UserInfo {
    constructor(selectorName, selectorOccupation, selectorAvatar) {
        this._nameElement = document.querySelector(selectorName)
        this._occupationElement = document.querySelector(selectorOccupation)
        this._avatarElement = document.querySelector(selectorAvatar)

    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            occupation: this._occupationElement.textContent

        }

    }

    setUserAvatar(avatar) {
        this._avatarElement.src = avatar

    }

    setUserInfo({ name, occupation }) {
        this._nameElement.textContent = name
        this._occupationElement.textContent = occupation


    }

    adaptFromServer({ name, about, avatar }) {
        return { name, occupation: about, avatar }
    }
}