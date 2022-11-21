import React, { useRef, useState, useContext } from "react";
import Input from "./Input";
import classes from "./CheckOutForm.module.scss";
// import { useNavigate } from "react-router-dom";
import CartContext from "../../store/cart-context";
import CheckIcon from "@mui/icons-material/Check";
import { realTimeDatabase } from "../firebase";
import AuthContext from "../../store/auth-context";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { v4 } from "uuid";

const CheckOutForm = ({ deliveryForm, cartItems, totalAmount }) => {
  const [alert, setAlert] = useState(false);

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const randomString = v4();

  const formRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const textAreaRef = useRef(null);

  // const addOrder = async (order) => {
    // await fetch(
    //   `${realTimeDatabase}/orders/${randomString}.json`,

    //   {
    //     method: "PUT",
    //     body: JSON.stringify(
    //       {
    //         date: new Date().toString().slice(0,25),
    //         serverDate:serverTimestamp(),

    //         name: order.name,
    //         email: order.email,
    //         phone: order.phone,
    //         address: order.address,
    //         city: order.city,
    //         delivery: deliveryForm,
    //         textArea: order.textArea,
    //         orderCompleted: false,
    //         totalAmount: totalAmount,
    //         cartItems: cartItems,
    //         id: order.id,
    //         userId: authCtx.user.uid,
    //       },
    //       randomString
    //     ),
    //     headers: { "Content-Type": "application.json" },
    //   }
    // );
  // };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!authCtx.user) {
      return;
    }
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPhone = phoneRef.current.value;
    const enteredAddress = addressRef.current.value;
    const selectedCity = cityRef.current.value;
    const textArea = textAreaRef.current.value;

    const order = {
      date: new Date().toString().slice(0,25),
      serverDate:serverTimestamp(),
      id: randomString,
      cartItems: JSON.parse(JSON.stringify(cartItems)),
      orderCompleted: false,
      name: enteredName,
      email: enteredEmail,
      phone: enteredPhone,
      address: enteredAddress,
      city: selectedCity,
      textArea: textArea,
      totalAmount: totalAmount,
      userId: authCtx.user.uid,
    };

    setDoc(doc(db, "orders", randomString), { ...order});

    setDoc(doc(db,`users/${authCtx.user.uid}/orders`, randomString), {
      ...order,
    });
    // addDoc(collection(db, `users/${authCtx.user.uid}/orders`,randomString), {
    //   ...order
    // });

    // addOrder(order);

    cartCtx.clearCart();
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
    formRef.current.reset();
    // navigate("/", { replace: true });
  };
  return (
    <form ref={formRef} onSubmit={submitHandler}>
      <div
        className={alert ? `${classes.alert} ${classes.active}` : classes.alert}
      >
        <CheckIcon fontSize="large" /> <p>Order sent</p>
      </div>
      <Input
        defaultValue={authCtx.userData?.name}
        ref={nameRef}
        name={"Name"}
        type={"text"}
      />
      <Input
        defaultValue={authCtx.user?.email}
        ref={emailRef}
        name={"Email"}
        type={"email"}
      />
      <Input
        defaultValue={authCtx.userData?.phoneNumber}
        ref={phoneRef}
        name={"Phone Number"}
        type={"tel"}
      />
      <Input
        defaultValue={authCtx.userData?.address}
        ref={addressRef}
        name={"Address"}
        type={"text"}
      />
      <select className={classes.select} ref={cityRef}>
        <option disabled defaultValue>
          Select City
        </option>
        <option value="Skopje">Skopje</option>
        <option value="Tetovo">Tetovo</option>
        <option value="Gostivar">Gostivar</option>
        <option value="Ohrid">Ohrid</option>
        <option value="Kicevo">Kicevo</option>
      </select>
      <br />
      <label>Something to Add</label>
      <br />
      <textarea ref={textAreaRef} />
      <br />
      <button className={classes.orderButton} type="submit">
        Order
      </button>
    </form>
  );
};

export default CheckOutForm;
