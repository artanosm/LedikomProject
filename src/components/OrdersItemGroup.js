import React from "react";
import classes from "./OrdersItemGroup.module.css";

const OrdersItemGroup = ({ item }) => {
  return (
    <div className={classes.container}>
      <img className={classes.img} src={item.color} alt='product' />

      <div>
     
        {item.brand} {item.model} {item.amount} {item.price} {item.storage}
      </div>
    </div>
  );
};

export default OrdersItemGroup;
