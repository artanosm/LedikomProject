import React from "react";
import classes from "./OrdersItemGroup.module.scss";

const OrdersItemGroup = ({ item }) => {
  return (
    <>    
    <div className={classes.container}>
      <img className={classes.img} src={item.color.color} alt="product" />

      <div>
        <h5>{item.brand}</h5>
        <p>{item.model}</p>
        <p>{item.color.name}</p>
        <p>{item.storage}</p>
        <p>{item.colorName}</p>
        <p>{item.price} $</p>
      </div>
    </div>
    <hr/>
    </>
  );
};

export default OrdersItemGroup;
