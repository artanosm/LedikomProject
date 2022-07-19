import React, { useContext, useEffect, useState } from "react";
import OrderItem from "../components/OrderItem";
import AuthContext from "../store/auth-context";
import classes from "./Orders.module.css";

const Orders = () => {
  const authCtx = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState(false);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(
        "https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      const loadedOrders = [];

      for (const key in responseData) {
        loadedOrders.push({
          id: key,
          address: responseData[key].address,
          city: responseData[key].city,
          email: responseData[key].email,
          name: responseData[key].name,
          orderCompleted: responseData[key].orderCompleted,
          phone: responseData[key].phone,
          textArea: responseData[key].textArea,
          totalAmount: responseData[key].totalAmount,
          cartItems: responseData[key].cartItems,
        });
      }

      setOrders(loadedOrders);
    };
    getOrders()
      .then(() => {
        setReFetch(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reFetch]);

  let orderItems;
  if (completedOrders) {
    let filtered = orders.filter(
      (orderIsTrue) => orderIsTrue.orderCompleted === true
    );
    console.log(filtered);
    orderItems = filtered.map((order, key) => {
      return (
        <OrderItem
          reFetch={reFetch}
          setReFetch={setReFetch}
          order={order}
          key={key}
        />
      );
    });
  } else {
    let filtered = orders.filter(
      (orderIsFalse) => orderIsFalse.orderCompleted === false
    );
    orderItems = filtered.map((order, key) => {
      return (
        <OrderItem
          reFetch={reFetch}
          setReFetch={setReFetch}
          order={order}
          key={key}
        />
      );
    });
  }

  return (
    <div className={classes.main}>
      <h3>Please Login</h3>
      <div className={classes.headerContainer}>
        <h1>Orders</h1>
        <button
          className={!completedOrders ? `${classes.active}` : `${""}`}
          onClick={() => setCompletedOrders(false)}
        >
          Orders
        </button>
        <button
          className={completedOrders ? `${classes.active}` : `${""}`}
          onClick={() => setCompletedOrders(true)}
        >
          Completed Orders
        </button>
      </div>
      <div>{orderItems}</div>
    </div>
  );
};

export default Orders;
