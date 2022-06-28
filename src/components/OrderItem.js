import React from "react";
import OrdersItemGroup from "./OrdersItemGroup";
import classes from "./OrderItem.module.css";

const OrderItem = ({ order }) => {
  const cartItems = (
    <ul>
      {order.cartItems.map((item, key) => {
        return <OrdersItemGroup item={item} key={key} />;
      })}
    </ul>
  );

  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <p>Name: {order.name}</p>
        <p>Email: {order.email}</p>
        <p>Phone: {order.phone}</p>
        <p>City: {order.city}</p>
        <p>Address: {order.address}</p>
      </div>
      <div> Items: {cartItems}</div>
      <h4>Total Amount: {order.totalAmount}</h4>
    </div>
  );
};

export default OrderItem;
