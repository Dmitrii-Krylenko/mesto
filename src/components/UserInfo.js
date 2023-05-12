export default class UserInfo {
    constructor(selectorName, selectorOccupation, selectorAvatar) {
        this._selectorName = document.querySelector(selectorName)
        this._selectorOccupation = document.querySelector(selectorOccupation)
        this._selectorAvatar = document.querySelector(selectorAvatar)

    }

    getUserInfo() {
        return {
            name: this._selectorName.textContent,
            occupation: this._selectorOccupation.textContent

        }

    }
    
setUserAvatar(avatar){
    this._selectorAvatar.src= avatar

}

    setUserInfo({ name, occupation }) {
        this._selectorName.textContent = name
        this._selectorOccupation.textContent = occupation


    }

    adaptFromServer({name, about, avatar}) {
        return {name, occupation: about, avatar}
    }
}