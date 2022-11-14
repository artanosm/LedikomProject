import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
const OrderDetail = () => {
  const { orderId } = useParams();

  const location = useLocation();
  const [order, setOrder] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    } else {
      const getOrder = async () => {
        const snapshot = await getDocs(
          collection(db, `users/${authCtx.user?.uid}/orders`)
        );
        const docs = snapshot.docs?.map((doc) => doc?.data());
        const found = docs.filter((order) => order.id === orderId);
        setOrder(found[0]);
      };
      getOrder();
    }
  }, [authCtx.user?.uid, orderId, location.state]);

  return (
    <div>
      <h1>J</h1>
      <h5>{order?.id}</h5>
    </div>
  );
};

export default OrderDetail;
