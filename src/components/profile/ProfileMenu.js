import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import Logout from "@mui/icons-material/Logout";
import classes from "./ProfileMenu.module.scss";
import AuthContext from "../../store/auth-context";

const ProfileMenu = ({ onEnableScroll, setClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    // window.document.body.style.overflow = "hidden";

    onEnableScroll();
    setClick(false);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    // window.document.body.style.overflow = "hidden";

    onEnableScroll();
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    authCtx.logOut();
    navigate("/", { replace: true });
  };
  return (
    <motion.div
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
      {authCtx?.user && (
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

          <MenuItem
            sx={{ fontSize: "small", color: "error.main" }}
            onClick={logoutHandler}
          >
            <ListItemIcon>
              <Logout sx={{ color: "error.main" }} fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}
    </motion.div>
  );
};

export default ProfileMenu;
