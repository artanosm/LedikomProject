import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";
import { Link, useNavigate } from "react-router-dom";
// fir
import { motion } from "framer-motion";
import HeaderCart from "./HeaderCart";
import classes from "./Header.module.scss";
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Turn as Hamburger } from 'hamburger-react'
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import Logout from "@mui/icons-material/Logout";

const Header = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const token = sessionStorage.getItem("token");

  const [click, setClick] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    props.onEnableScroll();
    setClick(false)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    props.onEnableScroll();
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    authCtx.logOut();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!token) {
      authCtx.logOut();
    }
  }, [token]);

  return (
    <div
      // className={"header"}
      className={classes.header}
    >
      <motion.div
        // className="logo-container"
        className={classes.logoContainer}
        initial={{ rotate: 0 }}
        animate={{ rotate: [15, -15, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" onClick={closeMobileMenu}>
          <img
            // className="img"
            className={classes.img}
            alt="Logo"
            src="https://ledikom.mk/assets/ledikom/images/logo.png?v=1"
          />
        </Link>
      </motion.div>

      <ul
        // className={click ? "nav-options active" : "nav-options"}
        className={
          click ? `${classes.navOptions} ${classes.active}` : classes.navOptions
        }
      >
        <li
          // className={click ? "option activeOption" : "option"}
          // className={click ? `${classes.option} ${classes.activeOption}` : classes.option}
          className={
            click ? `${classes.option} ${classes.activeOption}` : classes.option
          }
          onClick={closeMobileMenu}
        >
          <Link to="/">Home</Link>
        </li>
        <hr />
        <li
          // className={click ? "option activeOption" : "option"}
          className={classes.option
            // click ? `${classes.option} ${classes.activeOption}` : classes.option
          }
          onClick={closeMobileMenu}
        >
          <Link to="/phones">Phones</Link>
        </li>
        <hr />
        <li
          // className={click ? "option activeOption" : "option"}
          className={
            click ? `${classes.option} ${classes.activeOption}` : classes.option
          }
          onClick={closeMobileMenu}
        >
          <Link to="/service">Service</Link>
        </li>
        <hr />
        <li
          // className={click ? "option activeOption" : "option"}
          className={
            click ? `${classes.option} ${classes.activeOption}` : classes.option
          }
          onClick={closeMobileMenu}
        >
          <Link to="/contact">Contact</Link>
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
          <motion.div
            // className="icon"
            className={classes.icon}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.1 }}
          >
            <Tooltip title="Account">
              <IconButton
                onClick={handleClick}
                size="medium"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                {authCtx.user ? (
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={authCtx.userData?.photoProfile}
                  />
                ) : (
                  <Avatar sx={{ width: 32, height: 32, bgcolor: "black" }}>
                    <PersonOutlineOutlinedIcon fontSize="medium" />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 20,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {authCtx.user && (
                <MenuItem>
                  <ListItemIcon>
                    <PersonOutlineOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <Link
                    style={{
                      fontSize: "small",
                      textDecoration: "none",
                      color: "grey",
                    }}
                    to={"/profile"}
                  >
                    Profile
                  </Link>
                </MenuItem>
              )}
              {authCtx.user && (
                <MenuItem>
                  <ListItemIcon>
                    <LocalMallOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <Link
                    style={{
                      fontSize: "small",
                      textDecoration: "none",
                      color: "grey",
                    }}
                    to={"/profile/orders"}
                  >
                    My Orders
                  </Link>
                </MenuItem>
              )}
              {authCtx.user && (
                <MenuItem
                  sx={{ fontSize: "small", color: "error.main" }}
                  onClick={logoutHandler}
                >
                  <ListItemIcon>
                    <Logout sx={{ color: "error.main" }} fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              )}
            </Menu>
          </motion.div>
        )}
        {/* </Link> */}
        {/* <HeaderCart className={classes.cart} onClick={props.onShowCart} /> */}
        <HeaderCart
          className={classes.cart}
          onClick={() => {
            closeMobileMenu();
            props.onShowCart();
          }}
        />
      </div>
      <div className={classes.mobileMenu} onClick={handleMenuClick}>
      <Hamburger duration={.5} rounded color="white" distance="md" size={26} toggled={click} toggle={handleMenuClick} />

 
        {/* {click ? (
          <CloseMenu className={classes.menuIcon} />
        ) : (
          <MenuIcon className={classes.menuIcon} />
        )} */}
      </div>
    </div>
  );
};

export default Header;
