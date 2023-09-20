import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__btn-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__edit-title">{props.title}</h2>
        <form
          onSubmit={props.onSubmit}
          name={props.name}
          className={`popup__edit-form popup__edit-form-${props.name}`}
        >
          {props.children}
          <button
            name="inputsaveedit"
            type="submit"
            className="popup__btn-save-edit popup__btn-save-edit_disabled popup__btn-progress-status"
          >
            {props.textButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
