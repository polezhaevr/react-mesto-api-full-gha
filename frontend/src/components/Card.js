import React from "react";
import { CurrentUser } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUserContext = React.useContext(CurrentUser);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.item.owner === currentUserContext._id;
  
  const cardDeleteButtonClassName = `photo-post__btn-trash ${
    isOwn ? "photo-post__btn-trash_active" : ""
  }`;

  console.log();

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.item.likes.some(
    (i) => i === currentUserContext._id,
  );
  const cardLikeIconClassName = `photo-post__btn-like  ${
    isLiked ? "photo-post__btn-like_focus" : ""
  }`;

  function handleCardClick() {
    props.onCardClick(props.item);
  }

  function handleLikeClick() {
    props.onCardLike(props.item, currentUserContext._id);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.item._id);
  }

  return (
    <li className="photo-post__item">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <img
        className="photo-post__image"
        alt={props.item.alt}
        src={props.item.link}
        onClick={handleCardClick}
      />
      <div className="photo-post__text-container">
        <h2 className="photo-post__text">{props.item.name}</h2>
        <div className="photo-post__container-count">
          <button
            className={cardLikeIconClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="photo-post__count-likes">{props.item.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;