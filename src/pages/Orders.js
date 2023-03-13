import  { Fragment,useState, useContext } from "react";
import { Link } from "react-router-dom";
import OrderItem from "../components/OrderItem";
import classes from "./Orders.module.scss";
import AuthContext from "../store/auth-context";
import Loader from "../ui/Loader";
import { db } from "../components/firebase";
import {
  collection,
  query,
  orderBy,
  // onSnapshot
} from "firebase/firestore";
import useGetData from "../components/customHooks/useGetData";

const colRef = collection(db, "orders");
const q = query(colRef, orderBy("serverDate", "desc"));

const Orders = () => {
  // const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx?.user;


  const [orders,isLoading] = useGetData(q)

  // useEffect(() => {
  //   setIsLoading(true);
  //   const colRef = collection(db, "orders");
  //   const q = query(colRef, orderBy("serverDate", "desc"));
  //   const unSubscribe = onSnapshot(q, (colSnapshot) => {
  //     let ordersArr = [];
  //     colSnapshot.docs.forEach((doc) => {
  //       ordersArr.push(doc.data());
  //     });
  //     setOrders(ordersArr);
  //   });
  //   setIsLoading(false);
  //   return () => {
  //     unSubscribe();
  //   };
  // }, []);

  let orderItems;
  if (completedOrders) {
    let filtered = orders.filter(
      (orderIsTrue) => orderIsTrue.orderCompleted === true
    );

    orderItems = filtered.map((order, key) => {
      return (
        <OrderItem
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
      {isLoggedIn &&
        (isLoading ? (
          <Loader />
        ) : (
          <div className={classes.main}>
            <div className={classes.headerContainer}>
              <h1>Orders</h1>
              <div className={classes.buttonContainer}>
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
            </div>
            <div>{orderItems}</div>
          </div>
        ))}
    </Fragment>
  );
};

export default Orders;
