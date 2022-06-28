import React, { useEffect, useState } from "react";
import OrderItem from "../components/OrderItem";

const Orders = () => {
  const [orders, setOrders] = useState([]);
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
      //   .then((data) => {
      //     console.log(data);

      //     setOrders(data);
      //   })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const orderItems = orders.map((order, key) => {
    return (
    <OrderItem order={order} key={key} />
)});

  return (
    <div>
      <h3>Orders</h3>
      <div>{orderItems}</div>
    </div>
  );
};

export default Orders;
