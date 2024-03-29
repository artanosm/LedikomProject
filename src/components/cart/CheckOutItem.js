import classes from "./CheckOutItem.module.scss";

const CartItem = (props) => {
  return (
    <div className={classes.mainContainer}>
      <img src={props.color.image} alt="phone"></img>
      <p>
        {props.brand} {props.model} {props.storage} {props.color.name}
      </p>
      <div className={classes.priceAmount}>
        <p>{props.price}</p>
        <p>{props.amount}</p>
        <p>{props.price * props.amount}</p>
      </div>
    </div>
  );
};

export default CartItem;
