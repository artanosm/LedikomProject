import  {  useEffect, useContext } from "react";
import useGetSingleData from "../customHooks/useGetSingleData";

import classes from "./OrderDetail.module.scss";

import { useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import { db } from "../firebase";
import { doc } from "firebase/firestore";

import OrdersItemGroup from "../OrdersItemGroup";
import Loader from "../../ui/Loader";

const OrderDetail = () => {
  const { orderId } = useParams();
  // const [order, setOrder] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const docRef = doc(db, `users/${authCtx.user?.uid}/orders/${orderId}`);
  const [order, isLoading] = useGetSingleData(docRef,authCtx?.user?.uid)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const unsubscribe = onSnapshot(docRef, (doc) => {
  //     setOrder(doc.data());
  //     setIsLoading(false);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [authCtx.user?.uid,orderId]);


  return isLoading ? (
    <Loader />
  ) : (
    <div className={classes.mainContainer}>
      <h2>Order Detail</h2>
      <div className={classes.infoContainer}>
        <ul>
          <li>{order?.name}</li>
          <li>{order?.phone}</li>
          <li>
            {order?.address}, {order?.city}
          </li>
        </ul>
        <ul>
          <li>Order ID: {order?.id}</li>
          <li>Order placed on: {order?.date}</li>
          <li
            className={
              order?.orderCompleted ? classes.completed : classes.waiting
            }
          >
            {order?.orderCompleted ? "Completed" : "Waiting"}
          </li>
        </ul>
      </div>
      <div className={classes.itemsContainer}>
        {order?.cartItems.map((item, i) => (
          <OrdersItemGroup key={i} item={item} />
        ))}
      </div>
      <h4>Total Amount: {order?.totalAmount} $</h4>
    </div>
  );
};

export default OrderDetail;
