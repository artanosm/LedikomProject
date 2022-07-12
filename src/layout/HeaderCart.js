import React, { useContext } from "react";
import classes from "./HeaderCart.module.css";
import CartContext from "../store/cart-context";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const HeaderCart = (props) => {
  const cartCtx = useContext(CartContext)
  const numberOfItems = cartCtx.items.length

  return (
    <button className={classes.button} onClick={props.onClick}>
      <ShoppingCartOutlinedIcon fontSize="small" />
      <span className={classes.span}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCart;
