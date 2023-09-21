import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

import { CurrentUser } from "../contexts/CurrentUserContext";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarOpen] = React.useState(false);
  const [isPopupInfoOpen, setPopupInfoOpen] = React.useState(false);
  const [registrationSuccess, setRegistrationSuccess] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState();
  const [email, setEmail] = React.useState("");
  const [selectedCard, openCard] = React.useState({});
  const [isImageOpen, setImageOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setUser] = React.useState({});

  function getUser() {
    api
      .getUserInfo()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => console.log(err));
  }

  function getCards() {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if (loggedIn) {
      getUser();
      getCards();
    }
  }, [loggedIn]);

  //Обработка лайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((err) => console.log(err));
  }

  //Удаление карточки
  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => setCards(cards.filter((item) => item._id !== id)))
      .catch((err) => console.log(err));
  }

  //Редактирование данных пользователя
  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((data) => {
        setUser(data);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  //Редактирвоание аватара
  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((data) => {
        setUser(data);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  //Добавление новой карточки
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then(newCard => {
        setCards([...cards , newCard]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleEditProfileClick() {
    setProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setAddOpen(true);
  }

  function handleEditAvatarClick() {
    setAvatarOpen(true);
  }

  function handleOpenPopupInfoClick() {
    setPopupInfoOpen(true);
  }

  function handleRegistrationSuccessClick() {
    setRegistrationSuccess(true);
  }

  function closeAllPopups() {
    setAvatarOpen(false);
    setProfileOpen(false);
    setAddOpen(false);
    setImageOpen(false);
    setPopupInfoOpen(false);
  }

  function handleCardClick(card) {
    setImageOpen(true);
    openCard(card);
  }

  const handleLogin = () => {
    setLoggedIn(true);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .validateToken(token)
        .then((res) => {
          setEmail(res.email);
          setLoggedIn(true);
          navigate("/main");
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  return (
    <CurrentUser.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/main" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />

          <Route
            path="/sign-in"
            element={
              <Login
                handleOpenPopupInfoClick={handleOpenPopupInfoClick}
                handleLogin={handleLogin}
              />
            }
          />

          <Route
            path="/sign-up"
            element={
              <Register
                handleOpenPopupInfoClick={handleOpenPopupInfoClick}
                handleRegistrationSuccessClick={handleRegistrationSuccessClick}
              />
            }
          />

          <Route
            path="/main"
            element={
              <ProtectedRoute
                element={Main}
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                cards={cards}
                onCardLike={handleCardLike}
                loggedIn={loggedIn}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                email={email}
              />
            }
          />
        </Routes>
        <Footer />
        <ImagePopup
          item={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImageOpen}
        />
        /Попап открытия формы редактирвоания
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        /Попап формы добавления новых карточек
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        /Попап изменеия аватара
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          isOpen={isPopupInfoOpen}
          onClose={closeAllPopups}
          registrationSuccess={registrationSuccess}
        />
        /Попап потверждения удаления карточки
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          textButton="Да"
        ></PopupWithForm>
      </div>
    </CurrentUser.Provider>
  );
}

export default App;
