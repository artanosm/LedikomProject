import React from "react";
import classes from "./PhoneItem.module.css";
import { Link } from "react-router-dom";

const PhoneItem = (props) => {
  return (
    <Link className={classes.a} to={`/phones/${props.id}`}>
      <div className={classes.container}>
        <img
          className={classes.image}
          alt="phone-img"
          src={props.image}
        />
        <div className={classes.dataContainer}>
        <p className={classes.model}>{props.model}</p>
        <p className={classes.brand}>{props.brand}</p>
        <p className={classes.price}>
          {/* {props.price?.price64GB
            ? `${props.price?.price64GB}`
            : `${props.price?.price128GB}`} $ */}
          {props.price1}$
        </p>
        </div>
      </div>
    </Link>
  );
};

export default PhoneItem;
