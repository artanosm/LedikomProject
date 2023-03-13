import OrdersItemGroup from "./OrdersItemGroup";
import classes from "./OrderItem.module.scss";
// import { realTimeDatabase } from "./firebase";
import { doc, updateDoc,deleteDoc } from "firebase/firestore";
import { db } from "../components/firebase";

const OrderItem = ({ order }) => {
  const docRef = doc(db,'orders',order.id)
  const userDocRef = doc(db,'users',order.userId,'orders',order.id)

  const onDeleteHandler = () => {
  deleteDoc(docRef)
  deleteDoc(userDocRef)
  };

  const onCompleteHandler = () => {
    updateDoc(userDocRef, { orderCompleted: true });
    updateDoc(docRef,{ orderCompleted: true })
  };

  const cartItems = (
    <ul className={classes.listContainer}>
      {order.cartItems.map((item, key) => {
        return <OrdersItemGroup item={item} key={key} />;
      })}
    </ul>
  );
  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <p>Name: {order.name}</p>
        <p>Email: {order.email}</p>
        <p>User Id: {order.userId}</p>
        <p>Phone: {order.phone}</p>
        <p>City: {order.city}</p>
        <p>Address: {order.address}</p>
        <p>Date:{order.date}</p>
        <p>Order ID: {order.id}</p>
      </div>
      <div>{cartItems}</div>
      <h4>Total Amount: {order.totalAmount} $</h4>
      <div className={classes.buttonsContainer}>
        <button onClick={onDeleteHandler} className={classes.deleteButton}>
          Delete Order
        </button>
        {!order.orderCompleted && (
          <button
            onClick={onCompleteHandler}
            className={classes.completeButton}
          >
            Complete Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
