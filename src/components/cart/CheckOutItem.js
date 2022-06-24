import React from "react";
import classes from "./CheckOutItem.module.css";

const CartItem = (props) => {
  return (
    <div className={classes.mainContainer}>
      <img src={props.color} alt="phone"></img>
      <p>
        {props.brand} {props.model} {props.storage}
      </p>
      <div className={classes.priceAmount}>
        <p>{props.price}</p>
        <p>{props.amount}</p>
        <p>{props.price * props.amount}</p>
      </div>
    </div>
  );
};

export default CartItem;
