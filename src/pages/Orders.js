import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import OrderItem from "../components/OrderItem";
import classes from "./Orders.module.scss";
import AuthContext from "../store/auth-context";

import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState(false);
  const [reFetch, setReFetch] = useState(false);

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.user;

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
    <Fragment>
      {!isLoggedIn && (
        <div>
          <h4>Please Login as Admin</h4>
          <Link to={"/login"}>Go to Login page</Link>
        </div>
      )}
      {isLoggedIn && (
        <div className={classes.main}>
          <div className={classes.headerContainer}>
            <h1>Orders</h1>
            <button
              className={
                !completedOrders
                  ? `${classes.active} ${classes.buttonOrders}`
                  : `${classes.buttonOrders}`
              }
              onClick={() => setCompletedOrders(false)}
            >
              Orders
            </button>
            <button
              className={
                completedOrders
                  ? `${classes.active} ${classes.buttonCompleted}`
                  : `${classes.buttonCompleted}`
              }
              onClick={() => setCompletedOrders(true)}
            >
              Completed Orders
            </button>
          </div>
          <div>{orderItems}</div>
        </div>
      )}
    </Fragment>
  );
};

export default Orders;
