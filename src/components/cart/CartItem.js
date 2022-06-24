import React, { useContext } from "react";
import classes from "./CartItem.module.css";
import CartContext from "../../store/cart-context";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button } from "@mui/material";


const CartItem = ({ brand, amount, model, id, color, storage ,key}) => {
  const cartCtx = useContext(CartContext);

  const removeItemHandler =()=>{
    cartCtx.removeItem(id)
  }

  // const increaseItemHandler = () => {
  //   cartCtx.increaseItem(id);
  // };

  // const decreaseItemHandler = () => {
  //   cartCtx.decreaseItem(id);
  // };


  return (
    <div className={classes.itemContainer}>
      <img className={classes.cartImage} src={color} alt="phone"></img>
      <h3>{`${brand} ${model} ${storage}`}</h3>
      <div className={classes.amountContainer}>
      <Button size='medium' color="error" onClick={removeItemHandler}><DeleteOutlineIcon /></Button>
       {/* <button onClick={decreaseItemHandler}>-</button>
        <p>{amount}</p>
        <button onClick={increaseItemHandler}>+</button> */}
      </div>
    </div>
  );
};

export default CartItem;
