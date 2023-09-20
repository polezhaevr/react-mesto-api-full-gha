import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { CurrentUser } from "../contexts/CurrentUserContext";
import Header from "./Header";

function Main(props) {
  const currentUserContext = React.useContext(CurrentUser);

  return (
    <>
      <Header>
        <div className="header__user-container">
          <p className="header__user-mail">{props.email}</p>
          <Link
            to="/sign-in"
            className="header__menu-link"
            onClick={props.handleLogout}
          >
            Выйти
          </Link>
        </div>
      </Header>
      <main className="content">
        <section className="profile">
          <div
            className="profile__avatar-container"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile__img-avatar"
              src={currentUserContext.avatar}
              alt="Аватарка профиля"
            />
          </div>
          <div className="profile__container-about-profile">
            <h1 className="profile__name-title">{currentUserContext.name}</h1>
            <button
              className="profile__btn-edit"
              aria-label="Изменить имя и описание профиля"
              type="button"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__text">{currentUserContext.about}</p>
          </div>
          <button
            className="profile__btn-pic-add"
            aria-label="Добавить картинку"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </section>

        <section className="photo-post">
          <ul className="photo-post__list">
            {
            props.cards.slice(0).reverse().map(cards => {
             return (
              <Card
                item={cards}
                key={cards._id}
                onCardLike={props.onCardLike}
                onCardClick={cards}
                onCardDelete={props.onCardDelete}
                {...props}
              />
             )
            })}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
