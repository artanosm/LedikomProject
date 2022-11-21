import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import OrderItem from "../components/OrderItem";
import classes from "./Orders.module.scss";
import AuthContext from "../store/auth-context";
// import { realTimeDatabase } from "../components/firebase";
import Loader from "../ui/Loader";
import { db } from "../components/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reFetch, setReFetch] = useState(false);

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.user;

  useEffect(() => {
    setIsLoading(true);
    // const getOrders = async () => {
      //   const response = await fetch(
        //     `${realTimeDatabase}/orders.json`
        //   );
    //   if (!response.ok) {
    //     throw new Error("Something went wrong");
    //   }
    //   const responseData = await response.json();
    //   const loadedOrders = [];
    //   console.log(responseData)
    //   for (const key in responseData) {
    //     loadedOrders.push({
    //       userId:responseData[key].userId,
    //       date:responseData[key].date,
    //       id: key,
    //       address: responseData[key].address,
    //       city: responseData[key].city,
    //       email: responseData[key].email,
    //       name: responseData[key].name,
    //       orderCompleted: responseData[key].orderCompleted,
    //       phone: responseData[key].phone,
    //       textArea: responseData[key].textArea,
    //       totalAmount: responseData[key].totalAmount,
    //       cartItems: responseData[key].cartItems,
    //     });
    //   }

    //   setOrders(loadedOrders);
    //   setIsLoading(false)
    // };
    // getOrders()
    //   .then(() => {
    //     setReFetch(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // ==============

    // const colRef = collection(db, "users");
    // const unSubscribe = onSnapshot(colRef, (colSnapshot) => {
    //   colSnapshot.forEach((doc) => {
    //     const userId = doc.data().userId;
    //     const ordersRef = collection(db, `users/${userId}/orders`);
    //     onSnapshot(ordersRef, (querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         ordersArr.push({
    //           userId: doc.data().userId,
    //           date: doc.data().date,
    //           id: doc.data().id,
    //           address: doc.data().address,
    //           city: doc.data().city,
    //           email: doc.data().email,
    //           name: doc.data().name,
    //           orderCompleted: doc.data().orderCompleted,
    //           phone: doc.data().phone,
    //           textArea: doc.data().textArea,
    //           totalAmount: doc.data().totalAmount,
    //           cartItems: doc.data().cartItems,
    //         });
    //       });
    //     });
    //   });
    // });
    // ==================
    // getDocs(colRef).then((res) => {
    //   res.docs.forEach((doc) => {
    //     const userId = doc.data().userId;
    //     const ordersRef = collection(db, `users/${userId}/orders`);
    //     onSnapshot(ordersRef,(querySnapshot)=>{
    //       querySnapshot.forEach((doc) => {
    //         ordersArr.push({
    //           userId: doc.data().userId,
    //           date: doc.data().date,
    //           id: doc.data().id,
    //           address: doc.data().address,
    //           city: doc.data().city,
    //           email: doc.data().email,
    //           name: doc.data().name,
    //           orderCompleted: doc.data().orderCompleted,
    //           phone: doc.data().phone,
    //           textArea: doc.data().textArea,
    //           totalAmount: doc.data().totalAmount,
    //           cartItems: doc.data().cartItems,
    //         })
    //     });
    //     }
    //     )
    //   });
    // });

    // =========

    const colRef = collection(db, "orders");
    const q = query(colRef, orderBy("serverDate", "desc"));
    const unSubscribe = onSnapshot(q, (colSnapshot) => {
      let ordersArr = [];

      colSnapshot.docs.forEach((doc) => {
        ordersArr.push(doc.data());
      });
      setOrders(ordersArr);

    });
    setIsLoading(false);
    return () => {
      unSubscribe();
    };
  }, []);

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
