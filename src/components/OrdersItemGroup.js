import React from "react";
import classes from "./OrdersItemGroup.module.css";

const OrdersItemGroup = ({ item }) => {
  return (
    <>

    
    <div className={classes.container}>
      <img className={classes.img} src={item.color} alt="product" />

      <div>
        <h5>{item.brand}</h5>
        <p>{item.model}</p>
        <p>{item.price}</p>
        <p>{item.storage}</p>
      </div>
    </div>
    <hr/>
    </>
  );
};

export default OrdersItemGroup;
