import React, { useContext, useState } from "react";
import classes from "./CartItem.module.css";
import CartContext from "../../store/cart-context";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const CartItem = ({ brand, amount, model, id, color, storage }) => {
  const cartCtx = useContext(CartContext);
  const [show, setShow] = useState(true)

  const removeItemHandler = () => {
    setShow(false)
    cartCtx.removeItem(id);
    setTimeout(()=>{
      setShow(true)

    },100)
  };

  return (
    <AnimatePresence>

    {show && <motion.div className={classes.itemContainer}
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{y:-10, opacity:0}}
    transition={{duration:0.2}}
    >
      <img className={classes.cartImage} src={color.color} alt="phone"></img>
      <h3>{`${brand} ${model} ${storage} ${color.name}`}</h3>
      <div className={classes.amountContainer}>
        <Button size="medium" color="error" onClick={removeItemHandler}>
          <DeleteOutlineIcon />
        </Button>
      </div>
    </motion.div>}
    </AnimatePresence>
  );
};

export default CartItem;
