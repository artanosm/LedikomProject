import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import classes from "./MyOrders.module.scss";
import { db } from "../components/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import Loader from "../ui/Loader";

const MyOrders = () => {
  const authCtx = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);




  useEffect(() => {
    setIsLoading(true);
    // const getOrders = async () => {
    //   const colRef = collection(db, `users/${authCtx.user?.uid}/orders`);
    //   const q = query(colRef, orderBy("serverDate", 'desc'));
    //   const data = await getDocs(q);
    //   const docs = data.docs?.map((doc) => doc?.data());
    //   setOrders(docs);
    //   setIsLoading(false)
    // };
    // getOrders();
      const colRef = collection(db, `users/${authCtx.user?.uid}/orders`);
      const q = query(colRef, orderBy("serverDate", 'desc'));
      let ordersArr =[];
      const unsubscribe = onSnapshot(q ,(snapshot)=>{
        let orderArr = snapshot.docs.map(doc => doc.data())
        setOrders(orderArr)
      });
      setOrders(ordersArr);
      setIsLoading(false)
    
    return ()=> {unsubscribe()};
  }, [authCtx.user?.uid]);


  return isLoading ? (
    <Loader />
  ) : (
    <div className={classes.mainContainer}>
      <h2>My Orders</h2>
      {orders.map((order, i) => (
        <div key={i} className={classes.container}>
          <div className={classes.info}>
            <p>Order Date: {order?.date.slice(0, 15)}</p>
            <p>Order Status: {order?.orderCompleted ? 'Completed' : 'Waiting'}</p>
          </div>
          <div className={classes.imagesContainer}>
            {order?.cartItems.map((item, j) => {
              if (j > 3) {
                return null;
              }
              return (
                <img key={j} alt={item.color.name} src={item.color.image} />
              );
            })}
          </div>
          <h5>Total: {order.totalAmount} $</h5>
          <Link
            className={classes.linkContainer}
            to={`/profile/orders/${order.id}`}
          >
            Order Detail
          </Link>
        </div>
      ))}
    </div>
  );
};

export default React.memo(MyOrders);
