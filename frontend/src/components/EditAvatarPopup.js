import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const refAva = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: refAva.current.value,
    });
  }

  React.useEffect(() => {
    refAva.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      textButton="Cохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={refAva}
        id="avatar-link"
        className="popup__input-text popup__input-text_insert_linkinput"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar"
        required
      />
      <span className="avatar-link-error popup__input-error">
        Введите адрес картинки.
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
