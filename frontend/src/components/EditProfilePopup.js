import React from "react";
import { CurrentUser } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  //Подписка на контекст текущего пользователя
  const currentUserContext = React.useContext(CurrentUser);

  const [name, setName] = React.useState(currentUserContext.name);
  const [description, setDescription] = React.useState(
    currentUserContext.about,
  );

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  React.useEffect(() => {
    setName(currentUserContext.name);
    setDescription(currentUserContext.about);
  }, [currentUserContext, props.isOpen]);

  // Функция сабмита формы
  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
      avatar: currentUserContext.avatar,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="profile"
      title="Редактировать профиль"
      textButton="Сохранить"
    >
      <input
        id="text-name-input"
        className="popup__input-text popup__input-text_insert_nameinput"
        type="text"
        placeholder="Имя Фамилия"
        name="name"
        onChange={handleNameChange}
        value={name || ""}
        required
      />
      <span className="text-name-input-error popup__input-error">
        Вы пропустили это поле.
      </span>
      <input
        id="text-input"
        name="about"
        className="popup__input-text popup__input-text_insert_jobinput"
        type="text"
        placeholder="Описание"
        onChange={handleDescriptionChange}
        value={description || ""}
        required
      />
      <span className="text-input-error popup__input-error">
        Вы пропустили это поле.
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
