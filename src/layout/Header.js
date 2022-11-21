import React, { useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as CloseMenu } from "../assets/x.svg";
import { ReactComponent as MenuIcon } from "../assets/menu.svg";
import { motion } from "framer-motion";
import HeaderCart from "./HeaderCart";
import "./Header.scss";
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import Logout from "@mui/icons-material/Logout";

const Header = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [click, setClick] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    authCtx.logOut();
    navigate("/", { replace: true });
  };

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

      <ul className={click ? "nav-options active" : "nav-options"}>
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
        {click && <hr />}
        <li
          className={click ? "option activeOption" : "option"}
          onClick={closeMobileMenu}
        >
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      <div className="cart">
        {!authCtx.user && (
          <Link to={authCtx.user ? "/profile" : "/login"}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "black" }}>
              <PersonOutlineOutlinedIcon fontSize="medium" />
            </Avatar>
          </Link>
        )}
        {authCtx.user && (
          <motion.div
            className="icon"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.1 }}
          >
            {/* {authCtx.user ? (
              <Avatar sx={{width:30,height:30}} src={authCtx.userData.photoProfile} />
            ) : (
              <PersonOutlineOutlinedIcon fontSize="medium" />
            )} */}

            <Tooltip title="Account">
              <IconButton
                onClick={handleClick}
                size="medium"
                // sx={{ ml: 2 }}
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
        <HeaderCart className="cart" onClick={props.onShowCart} />
      </div>
      <div className="mobile-menu" onClick={handleMenuClick}>
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
