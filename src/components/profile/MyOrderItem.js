import classes from "./MyOrderItem.module.scss";

const MyOrderItem = ({ item }) => {
  return (
    <div className={classes.mainContainer}>
      <img  src={item.color.color} alt="product" />

      <div className={classes.infoContainer}>
        <h5>{item.brand}</h5>
        <p>{item.model}</p>
        <p>{item.color.name}</p>
      </div>
      <div className={classes.amountContainer}>
        
        <span>{item.price} $</span>
      </div>
      <div className={classes.amountContainer}>
        <span>x {item.amount}</span>
      </div>
    </div>
  );
};

export default MyOrderItem;
