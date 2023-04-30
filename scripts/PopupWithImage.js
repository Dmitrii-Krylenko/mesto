import Popup from "./popup.js";

export default class PopupWithImage extends Popup  {
     constructor(selector,name, link) {
        super (selector) 
        this._name = name;
        this._link = link;
     }
    
    open() {
        const bigImg = this._popupElement.querySelector('.popup__image-big');
        const textImg = this._popupElement.querySelector('.popup__header_big');

        bigImg.src = this._link;
        bigImg.alt = this._name;
        textImg.textContent = this._name;
 
        super.open();
        
    }

}
