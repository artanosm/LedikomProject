import React, { useContext } from "react";
import classes from "./HeaderCart.module.css";
import { BsCart2 } from "react-icons/bs";
import CartContext from "../store/cart-context";

const HeaderCart = (props) => {
  const cartCtx = useContext(CartContext)
  const numberOfItems = cartCtx.items.length

  return (
    <button className={classes.button} onClick={props.onClick}>
      <BsCart2 size="1.2em" />
      <span className={classes.span}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCart;
