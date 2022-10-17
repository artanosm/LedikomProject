import React, { useState, useContext } from "react";
import { ReactComponent as CloseMenu } from "../assets/x.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { motion } from "framer-motion";

import HeaderCart from "./HeaderCart";
import { Link } from "react-router-dom";
import "./Header.scss";

import AuthContext from "../store/auth-context";

const Header = (props) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const authCtx = useContext(AuthContext)

  const closeMobileMenu = () => setClick(false);
  
  return (
    <div className="header">
      <motion.div
        className="logo-container"
        initial={{ rotate: 0 }}
        animate={{ rotate: [15, -15, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" onClick={closeMobileMenu}>
          <img
            className="img"
            alt="Logo"
            src="https://ledikom.mk/assets/ledikom/images/logo.png?v=1"
          />
        </Link>
      </motion.div>

      <ul  className={click ? "nav-options active" : "nav-options"}>
        <li
          className={click ? "option activeOption" : "option"}
          onClick={closeMobileMenu}
        >
          <Link to="/">Home</Link>
        </li>
        {click && <hr />}
        <li
          className={click ? "option activeOption" : "option"}
          onClick={closeMobileMenu}
        >
          <Link to="/phones">Phones</Link>
        </li>
        {click && <hr />}
        <li
          className={click ? "option activeOption" : "option"}
          onClick={closeMobileMenu}
        >
          <Link to="/service">Service</Link>
        </li>
      </ul>

      <div className="cart">
        <Link to="/login">
          <motion.div
            className="icon"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.1 }}
          >
          {authCtx.user ? <span>{authCtx.user.email}</span> :  <PersonOutlineOutlinedIcon fontSize="medium" />}
          </motion.div>
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
