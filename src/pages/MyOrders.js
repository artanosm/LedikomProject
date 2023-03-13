import { useContext,useEffect,memo } from "react";
import AuthContext from "../store/auth-context";
import classes from "./MyOrders.module.scss";
import { db } from "../components/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";
import useGetData from "../components/customHooks/useGetData";

const MyOrders = () => {
  const authCtx = useContext(AuthContext);
  const navigate =useNavigate();
  // const [orders, setOrders] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem('token')
  const colRef = collection(db, `users/${authCtx?.user?.uid}/orders`);
  const q = query(colRef, orderBy("serverDate", "desc"));

  const [orders, isLoading] = useGetData(q,authCtx?.user?.uid)
useEffect(() => {
  if (!token) {
    authCtx.logOut()
    navigate('/',{replace:true})
  }
}, [token,navigate,authCtx])

  // useEffect(() => {
  //   setIsLoading(true);

  //   const colRef = collection(db, `users/${authCtx.user?.uid}/orders`);
  //   const q = query(colRef, orderBy("serverDate", "desc"));
  //   // let ordersArr = [];
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     let orderArr = snapshot.docs.map((doc) => doc.data());
  //     setOrders(orderArr);
  //   });
  //   // setOrders(ordersArr);
  //   setIsLoading(false);

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [authCtx.user?.uid]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={classes.mainContainer}>
      <h2>My Orders</h2>
      {orders.map((order, i) => (
        <Link to={`/profile/orders/${order.id}`} key={i} className={classes.container}>
          <div className={classes.info}>
            <p>Order Placed: {order?.date.slice(0, 15)}</p>
            <p className={order?.orderCompleted ? classes.completed : classes.waiting}>
              {order?.orderCompleted ? "Completed" : "Waiting"}
            </p>
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
          <h4>Total: {order.totalAmount} $</h4>
        </Link>
      ))}
    </div>
  );
};

export default memo(MyOrders);
