import React from "react";
import { useNavigate, Link } from "react-router-dom";
import * as auth from "../utils/auth";
import Header from "./Header";

const Login = ({ handleLogin, handleOpenPopupInfoClick }) => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .authorize(formValue.email, formValue.password)
      .then((res) => {
        if (res.token) localStorage.setItem("token", res.token);
        handleLogin();
        navigate("/main", { replace: true });
      })
      .catch((err) => {
        switch (err) {
          case 400:
            console.log("Ошибка 400 - не передано одно из полей");
            handleOpenPopupInfoClick();
            break;

          case 401:
            console.log("Ошибка 401 - пользователь с email не найден");
            handleOpenPopupInfoClick();
            break;

          default:
            console.log(`Авторизация не выполнена. Ошибка ${err}`);
            handleOpenPopupInfoClick();
        }
      });
  };

  return (
    <>
      <Header>
        <div className="header__menu">
          <Link to="/sign-up" className="header__menu-link">
            Зарегистрироваться
          </Link>
        </div>
      </Header>

      <form className="login" onSubmit={handleSubmit}>
        <div className="login__container">
          <h1 className="login__title">Вход</h1>

          <div className="login__input-wrapper">
            <input
              id="email"
              name="email"
              type="email"
              className="login__input"
              placeholder="Email"
              value={formValue.email}
              onChange={handleChange}
            />

            <input
              id="password"
              name="password"
              type="password"
              className="login__input"
              placeholder="Пароль"
              value={formValue.password}
              onChange={handleChange}
            />
          </div>
          <button className="login__button">Войти</button>
        </div>
      </form>
    </>
  );
};

export default Login;
