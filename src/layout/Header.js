import React, { useState } from "react";
import { ReactComponent as CloseMenu } from "../assets/x.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import HeaderCart from "./HeaderCart";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = (props) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/" onClick={closeMobileMenu}>
          <img
            className="img"
            alt="Logo"
            src="https://ledikom.mk/assets/ledikom/images/logo.png?v=1"
          />
        </Link>
      </div>

      <ul className={click ? "nav-options active" : "nav-options"}>
        <li className="option" onClick={closeMobileMenu}>
          <Link to="/">Home</Link>
        </li>
        <li className="option phones" onClick={closeMobileMenu}>
          <Link to="/phones">Phones </Link>
        </li>
        <li className="option" onClick={closeMobileMenu}>
          <Link to="/service">Service</Link>
        </li>
      </ul>

      <div className="cart">
        <Link to="/login">
          <div className="icon">
            <PersonOutlineOutlinedIcon fontSize="medium"/>
          </div>
        </Link>
        <HeaderCart className="cart" onClick={props.onShowCart} />
      </div>
      <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <CloseMenu className="menu-icon" />
        ) : (
          <MenuIcon className="menu-icon" />
        )}
      </div>
    </div>
  );
};

export default Header;
