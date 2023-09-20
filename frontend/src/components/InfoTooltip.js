import React from "react";
import regSuccess from "../styles/images/RegSuccess.svg";
import noRegSuccess from "../styles/images/noRegSuccess.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup-info ${props.isOpen ? "popup-info_opened" : ""}`}>
      <div className="popup-info__container">
        <button
          className="popup-info__btn-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          src={props.registrationSuccess ? regSuccess : noRegSuccess}
          alt="Иконка состояния"
          className="popup-info__img"
        />
        <p className="popup-info__text">
          {props.registrationSuccess
            ? "Вы успешно зарегистрировались!"
            : `Что-то пошло не так! Попробуйте ещё раз.`}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
