import React, { useContext, useState } from "react";
import classes from "./CartItem.module.scss";
import CartContext from "../../store/cart-context";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button } from "@mui/material";

// const CartItem = ({ brand,price, amount, model, id, color, storage }) => {
const CartItem = ({item}) => {
  const { brand,price, amount, model, id, color, storage } = item;
  
  const cartCtx = useContext(CartContext);
  const [show, setShow] = useState(true);

  const removeItemHandler = () => {
    setShow(false);
    cartCtx.removeItem(id);
  };
  return (
    <div className={classes.itemContainer}>
      <img className={classes.cartImage} src={color.color} alt="phone"></img>
      <div className={classes.dataContainer}>
        <h3>{model}</h3>
        <p>{brand}</p>
        <p>{storage}</p>
      </div>
  
      <p>{price}$</p>
      <div className={classes.amountContainer}>
        {show && (
          <Button size="medium" color="error" onClick={removeItemHandler}>
            <DeleteOutlineIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
