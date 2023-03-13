import  { useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeaderCart from "./HeaderCart";
import classes from "./Header.module.scss";
import Avatar from "@mui/material/Avatar";
import { Turn as Hamburger } from "hamburger-react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchBox from "../components/signForms/SearchBox";
import NavBarLink from "./NavBarLink";
import ProfileMenu from "../components/profile/ProfileMenu";

const Header = (props) => {
  const authCtx = useContext(AuthContext);

  const [click, setClick] = useState(false);

  const handleMenuClick = () => {
    if (!click) {
      props.onDisableScroll();
    }
    if (click) {
      props.onEnableScroll();
    }
    setClick(!click);
  };

  const closeMobileMenu = () => {
    props.onEnableScroll();
    setClick(false);
  };

  return (
    <div className={classes.header}>
      <motion.div
        className={classes.logoContainer}
        initial={{ rotate: 0 }}
        animate={{ rotate: [15, -15, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" onClick={closeMobileMenu}>
          <img
            className={classes.img}
            alt="Logo"
            src="https://ledikom.mk/assets/ledikom/images/logo.png?v=1"
          />
        </Link>
      </motion.div>

      <ul
        className={
          click ? `${classes.navOptions} ${classes.active}` : classes.navOptions
        }
      >
        <NavBarLink
          closeMobileMenu={closeMobileMenu}
          path="/"
          click={click}
          name="Home"
        />
        <hr />
        <NavBarLink
          closeMobileMenu={closeMobileMenu}
          path="/phones"
          click={click}
          name="Phones"
        />
        <hr />
        <NavBarLink
          closeMobileMenu={closeMobileMenu}
          path="/service"
          click={click}
          name="Service"
        />
        <hr />
        <NavBarLink
          closeMobileMenu={closeMobileMenu}
          path="/contact"
          click={click}
          name="Contact"
        />
        <li className={classes.searchBox}>
          <SearchBox closeMobileMenu={closeMobileMenu} />
        </li>
      </ul>
      <div
        className={click ? classes.overlay : ""}
        onClick={closeMobileMenu}
      ></div>
      <div className={classes.cart}>
        {!authCtx.user && (
          <Link
            to={authCtx.user ? "/profile" : "/login"}
            onClick={closeMobileMenu}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: "black" }}>
              <PersonOutlineOutlinedIcon fontSize="medium" />
            </Avatar>
          </Link>
        )}
        {authCtx.user && (
          <ProfileMenu
            onEnableScroll={props.onEnableScroll}
            setClick={setClick}
          />
        )}
        <HeaderCart
          className={classes.cart}
          onClick={() => {
            closeMobileMenu();
            props.onShowCart();
          }}
        />
      </div>
      <div className={classes.mobileMenu} onClick={handleMenuClick}>
        <Hamburger
          duration={0.5}
          rounded
          color="white"
          distance="md"
          size={26}
          toggled={click}
          toggle={handleMenuClick}
        />
      </div>
    </div>
  );
};

export default Header;
