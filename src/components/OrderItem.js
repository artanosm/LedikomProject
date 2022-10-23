import React from "react";
import OrdersItemGroup from "./OrdersItemGroup";
import classes from "./OrderItem.module.scss";

const OrderItem = ({ order , reFetch, setReFetch }) => {
  const onDeleteHandler = () => {
    const deleteOrder = async () => {
      const response = await fetch(
        `https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/orders/${order.id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      // const responseData = await response.json();
    };
    deleteOrder()
      .then(() => setReFetch(true))
      .catch((error) => {
        console.log(error);
      });
  };

  const onCompleteHandler = () => {
    const completeOrder = async () => {
      const response = await fetch(
        `https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/orders/${order.id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            ...order,
            orderCompleted: true,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      console.log(responseData);
    };
    completeOrder()
      .then(() => {
        setReFetch(true)
        console.log("Completed")})
      .catch((error) => {
        console.log(error);
      });
  };

  const cartItems = (
    <ul className={classes.listContainer}>
      {order.cartItems.map((item, key) => {
        return <OrdersItemGroup item={item} key={key} />;
      })}
    </ul>
  );

  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <p>Order ID: {order.id}</p>
        <p>Name: {order.name}</p>
        <p>Email: {order.email}</p>
        <p>Phone: {order.phone}</p>
        <p>City: {order.city}</p>
        <p>Address: {order.address}</p>
      </div>
      <div>{cartItems}</div>
      <h4>Total Amount: {order.totalAmount} $</h4>
      <div className={classes.buttonsContainer}>
        <button onClick={onDeleteHandler} className={classes.deleteButton}>Delete Order</button>
        {!order.orderCompleted && <button onClick={onCompleteHandler} className={classes.completeButton}>Complete Order</button>}
      </div>
    </div>
  );
};

export default OrderItem;