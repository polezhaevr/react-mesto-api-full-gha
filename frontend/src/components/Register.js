import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import Header from "./Header";

const Register = ({
  handleOpenPopupInfoClick,
  handleRegistrationSuccessClick,
}) => {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
      .register(formValue.email, formValue.password)
      .then((res) => {
        console.log(res);
        handleOpenPopupInfoClick();
        handleRegistrationSuccessClick();
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        switch (err) {
          case 400:
            console.log("Ошибка 400. Некорректно заполнено одно из полей.");
            break;
          default:
            console.log(`Регистрация не выполнена. Ошибка ${err}`);
        }
      })
      .finally(() => {
        handleOpenPopupInfoClick();
      });
  };

  return (
    <>
      <Header>
        <div className="header__menu">
          <Link to="/sign-in" className="header__menu-link">
            Войти
          </Link>
        </div>
      </Header>
      <form className="login" onSubmit={handleSubmit}>
        <div className="login__container">
          <h1 className="login__title">Регистрация</h1>

          <div className="login__input-wrapper">
            <input
              id="input-email"
              name="email"
              type="email"
              className="login__input"
              placeholder="Email"
              value={formValue.email}
              onChange={handleChange}
              required
            />

            <input
              id="input-password"
              name="password"
              type="password"
              className="login__input"
              placeholder="Пароль"
              value={formValue.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login__button">
            Зарегистрироваться
          </button>
          <Link className="login__link" to="/sign-in">
            Уже зарегистрированы? Войти
          </Link>
        </div>
      </form>
    </>
  );
};

export default Register;
