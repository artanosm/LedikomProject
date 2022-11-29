import React, { useContext } from "react";
import classes from "./HeaderCart.module.scss";
import CartContext from "../store/cart-context";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { motion } from "framer-motion";

const HeaderCart = (props) => {
  const cartCtx = useContext(CartContext);
  const numberOfItems = cartCtx.items.length;
  return (
    <motion.button
      numberofitems={numberOfItems}
      className={
        numberOfItems ? `${classes.button} ${classes.active}` : classes.button
      }
      onClick={props.onClick}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.1 }}
    >
      <ShoppingCartOutlinedIcon fontSize="medium" />
    </motion.button>
  );
};

export default HeaderCart;
