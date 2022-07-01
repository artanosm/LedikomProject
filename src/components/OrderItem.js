import React from "react";
import OrdersItemGroup from "./OrdersItemGroup";
import classes from "./OrderItem.module.css";

const OrderItem = ({ order }) => {

  const onDeleteHandler = () => {
    const getOrders = async () => {
      const response = await fetch(
        `https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/orders/${order.id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      console.log(responseData);
    };
    getOrders()
      .then(() => console.log("Success"))
      .catch((error) => {
        console.log(error);
      });
  };

  const onCompleteHandler =()=>{
    const getOrders = async () => {
            const response = await fetch(
              `https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/orders/${order.id}.json`,
              {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  name: order.name,
                  address: order.address,
                  email: order.email,
                  phone: order.phone,
                  cartItems: order.cartItems,
                  textArea: order.textArea,
                  city: order.city,
                  totalAmount: order.totalAmount,
                  orderCompleted: true,
                }),
              }
            );
            if (!response.ok) {
              throw new Error("Something went wrong");
            }
            const responseData = await response.json();
            console.log(responseData);
          };
          getOrders().then(()=> console.log('Completed'))
            .catch((error) => {
              console.log(error);
            });
        };
  
  const cartItems = (
    <ul>
      {order.cartItems.map((item, key) => {
        return <OrdersItemGroup item={item} key={key} />;
      })}
    </ul>
  );

  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <p>Order ID: {order.id}</p>
        <p>Name: {order.name}</p>
        <p>Email: {order.email}</p>
        <p>Phone: {order.phone}</p>
        <p>City: {order.city}</p>
        <p>Address: {order.address}</p>
      </div>
      <div> Items: {cartItems}</div>
      <h4>Total Amount: {order.totalAmount}</h4>
      <button onClick={onDeleteHandler}>Delete Order</button>
      <button onClick={onCompleteHandler}>Complete Order</button>
    </div>
  );
};

export default OrderItem;

//   const onDeleteHandler = () => {
//     const getOrders = async () => {
//       const response = await fetch(
//         `https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/orders.json`,
//         {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json",
//           },
//           body: JSON.stringify({
//             name: order.name,
//             address: order.address,
//             email: order.email,
//             phone: order.phone,
//             cartItems: order.cartItems,
//             textArea: order.textArea,
//             city: order.city,
//             totalAmount: order.totalAmount,
//             orderCompleted: true,
//           }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Something went wrong");
//       }
//       const responseData = await response.json();
//       console.log(responseData);
//     };
//     getOrders()
//       .then(
//         async () =>
//           await fetch(
//             `https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/orders/${order.id}`,
//             {
//               method: "DELETE",
//               headers: {
//                 "Access-Control-Allow-Origin": "https://localhost:3000",
//                 "Content-type": "application/json",
//               },
//             }
//           ).catch((error) => {
//             console.log(error);
//           })
//       )
//       .catch((error) => {
//         console.log(error);
//       });
//   };
