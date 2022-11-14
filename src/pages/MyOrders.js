import React, { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import AuthContext from "../store/auth-context";
import { db } from "../components/firebase";
import { collection, getDocs } from "firebase/firestore";
import OrdersItemGroup from "../components/OrdersItemGroup";
import classes from "./MyOrders.module.scss";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const authCtx = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const snapshot = await getDocs(
        collection(db, `users/${authCtx.user?.uid}/orders`)
      );

      const docs = snapshot.docs?.map((doc) => doc?.data());

      setOrders(docs);
    };
    getOrders();
  }, [authCtx.user?.uid]);
  return (
    <Stack p={4} maxWidth={800}>
      {orders.map((order, i) => (
        <Link  key={i} to={`/profile/orders/${order.id}`} state={{ order:order}}>
          <div  className={classes.container}>
            <div className={classes.info}>
              <p>{order.date.slice(0, 22)}</p>
            </div>
            {order.cartItems.map((item, j) => {
              return <OrdersItemGroup item={item} key={j}></OrdersItemGroup>;
            })}
            <h5>Total Amount: {order.totalAmount} $</h5>
          </div>
        </Link>
      ))}
    </Stack>
  );
};

export default React.memo(MyOrders);
