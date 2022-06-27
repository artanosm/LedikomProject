import React from "react";
import OrdersItemGroup from "./OrdersItemGroup";

const OrderItem = ({ order }) => {
  const cartItems = (
    <ul>
      {order.cartItems.map((item, key) => {
        return <OrdersItemGroup item={item} key={key} />;
      })}
    </ul>
  );

  return (
    <div>
      <h1>{order.name}</h1>
      <div>{cartItems}</div>
    </div>
  );
};

export default OrderItem;
