import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_open-img  ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container-img">
        <img
          className="popup__opened-img"
          src={props.item.link}
          alt={props.item.name}
        />
        <h2 className="popup__opened-img-text">{props.item.name}</h2>
        <button
          className="popup__btn-close  popup__btn-close_open-img"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
