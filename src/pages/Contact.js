import React from "react";
import classes from "./Contact.module.scss";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { Call, Email } from "@mui/icons-material";
import { Link } from "react-router-dom";


export const Contact = () => {
  return (
    <div className={classes.main}>
      <div></div>
      <div className={classes.infoContainer}>
        <h3>Contact Info</h3>
        <Link to="/orders">Orders</Link>
        <p>
          <span>
            <RoomOutlinedIcon fontSize="smaller" />
          </span>
          Cvetan Dimov 1000,Skopje
        </p>
        <p>
          <span>
            <Call fontSize="smaller" />
          </span>
          070 25 25 25
        </p>
        <p>
          <span>
            <Email fontSize="smaller" />
          </span>
          info@ledikom.mk
        </p>
      </div>
    </div>
  );
};

export default Contact;
