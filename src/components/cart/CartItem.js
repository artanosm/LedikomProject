import  { useContext, useState } from "react";
import classes from "./CartItem.module.scss";
import CartContext from "../../store/cart-context";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {IconButton} from "@mui/material";

const CartItem = ({item}) => {
  const { brand,price, amount, model, id, color, storage } = item;
  const cartCtx = useContext(CartContext);
  const [show, setShow] = useState(true);

const deleteItemHandler = () =>{
  setShow(false);
  cartCtx.deleteItem(id)
}

const increaseItemHandler = () => {
  cartCtx.addItem(item)
}
const decreaseItemHandler = () => {
  cartCtx.removeItem(id)
}
  


  return (
    <div className={classes.itemContainer}>
      <img className={classes.cartImage} src={color.image} alt="phone"></img>
      <div className={classes.dataContainer}>
        <h3>{model}</h3>
        <p>{color.name}</p>
        <p>{brand}</p>
        <p>{storage}</p>
      </div>
      <div className={classes.buttonContainer}>
      <IconButton sx={{padding:0}} onClick={decreaseItemHandler} fontSize='small'><RemoveIcon fontSize="small" /></IconButton>
        <span>{amount}</span>

      <IconButton sx={{padding:0}} onClick={increaseItemHandler} fontSize="small"><AddIcon fontSize="small"/></IconButton>
      </div>
      <p>{price * amount}$</p>
      <div className={classes.amountContainer}>
        {show && (
          <IconButton color="error" onClick={deleteItemHandler}>
            <DeleteOutlineIcon  />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default CartItem;
