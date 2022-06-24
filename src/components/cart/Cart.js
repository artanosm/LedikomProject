import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../../ui/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  console.log(cartCtx.items);
 

  const clearCartHandler = () => {
    cartCtx.clearCart();
  };

  const onCheckHandler = () => {
    navigate("/checkout");
    props.onClose();
  };

  const cartItems = (
    <ul className={classes.cartContainer}>
      {cartCtx.items.map((item, key) => {
        console.log(key)
        return (
          <CartItem
            brand={item.brand}
            model={item.model}
            id={item.id}
            key={key}
            amount={item.amount}
            color={item.color}
            storage={item.storage}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartCtx.items.length !== 0 ? (
        <div>{cartItems}</div>
      ) : (
        <p>No Items Yet</p>
      )}
      {cartCtx.items.length > 0 && (
        <div className={classes.totalContainer}>
           {/* <Button size="small" onClick={clearCartHandler} variant='outlined' color="error">Clear Cart</Button> */}
          <button
            className={`${classes.clearCart} ${classes.button}`}
            onClick={clearCartHandler}
          >
            Clear Cart
          </button>
          <button
            className={`${classes.checkOut} ${classes.button}`}
            onClick={onCheckHandler}
          >
            Check out
          </button>
          {/* <Button size="small" onClick={onCheckHandler} variant='contained' color="success">Check Out</Button> */}

          <h3>Total: {cartCtx.totalAmount} $</h3>
        </div>
      )}
    </Modal>
  );
};
export default Cart;
