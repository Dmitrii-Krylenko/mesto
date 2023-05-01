import Popup from "./popup.js";

export default class PopupWithImage extends Popup  {
    //  constructor(selector,name, link) {
    constructor(selector) {
        super (selector) 
        this._bigImg = this._popupElement.querySelector('.popup__image-big');
        this._textImg = this._popupElement.querySelector('.popup__header_big');
        // this._name = name;
        // this._link = link;
     }
    
     open(name, link) {
    // open() {
   

        // bigImg.src = this._link;
        this._bigImg.src = link;
        // bigImg.alt = this._name;
        this._bigImg.alt = name;
        // textImg.textContent = this._name;
        this._textImg.textContent = name;
 
        super.open();
        
    }

}
