import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="add"
      title="Новое место"
      textButton="Создать"
    >
      <input
        id="text-input-link"
        className="popup__input-text popup__input-text_insert_textinput"
        name="name"
        type="text"
        placeholder="Название"
        required
        onChange={handleNameChange}
        value={name}
      />
      <span className="text-input-link-error popup__input-error">
        Вы пропустили это поле.
      </span>
      <input
        id="url-input"
        className="popup__input-text popup__input-text_insert_linkinput"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
        onChange={handleLinkChange}
        value={link}
      />
      <span className="url-input-error popup__input-error">
        Введите адрес сайта.
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
