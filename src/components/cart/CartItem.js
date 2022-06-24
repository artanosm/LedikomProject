import React, { useContext } from "react";
import classes from "./CartItem.module.css";
import CartContext from "../../store/cart-context";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button } from "@mui/material";

const CartItem = ({ brand, amount, model, id, color, storage}) => {
  const cartCtx = useContext(CartContext);
  
  const removeItemHandler = () => {
    cartCtx.removeItem(id);
  };

  return (
    <div className={classes.itemContainer}>
      <img className={classes.cartImage} src={color} alt="phone"></img>
      <h3>{`${brand} ${model} ${storage}`}</h3>
      <div className={classes.amountContainer}>
        <Button size="medium" color="error" onClick={removeItemHandler}>
          <DeleteOutlineIcon />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
