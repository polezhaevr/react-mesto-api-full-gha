import React from "react";
import logo from "../styles/images/header-logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <Link className="header__link" to="/">
        <img
          className="header__logo"
          src={logo}
          alt="Логотип шапки сервиса по редактированию фотографий - Место"
        />
      </Link>
      {props.children}
    </header>
  );
}

export default Header;
