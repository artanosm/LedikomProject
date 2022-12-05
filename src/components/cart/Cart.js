import React, { useContext } from "react";
import classes from "./Cart.module.scss";
import Modal from "../../ui/Modal";
import CartContext from "../../store/cart-context";
import AuthContext from "../../store/auth-context";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const clearCartHandler = () => {
    cartCtx.clearCart();
  };

  const onCheckHandler = () => {
    if (authCtx.user) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
    props.onClose();
  };

  const cartItems = (
    <ul className={classes.cartContainer}>
      <AnimatePresence mode={"popLayout"}>
        {cartCtx.items.map((item, key) => {
          return (
            <motion.li
              layout
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ type: "tween" }}
              // key={item.id}
              key={item.id}
            >
              <CartItem item={item} key={key} />
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
  return (
    <Modal cartIsShown={props.cartIsShown} onClose={props.onClose}>
      <div className={classes.headerCartContainer}>
        {cartCtx.items.length > 0 && <h2>My Cart</h2>}
        {cartCtx.items.length === 0 && <h2>Your Cart is empty </h2>}
    

        <button onClick={props.onClose} className={classes.closeButton}>
          <CloseIcon sx={{color: 'gray'}} fontSize="medium" />
        </button>
      </div>
      {cartCtx.items.length !== 0 && (
        <div className={classes.itemsContainer}>{cartItems}</div>
      )}
      {cartCtx.items.length > 0 && (
        <div className={classes.totalContainer}>
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

          <h3>Total: {cartCtx.totalAmount} $</h3>
        </div>
      )}
    </Modal>
  );
};
export default Cart;
