import React, { useRef, useState } from "react";
import Input from "./Input";
import classes from "./CheckOutForm.module.css";
// import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CheckIcon from "@mui/icons-material/Check";

const CheckOutForm = ({ deliveryForm, cartItems, totalAmount }) => {
  const [alert, setAlert] = useState(false);

  const cartCtx = useContext(CartContext);
  // const navigate = useNavigate();
  const formRef = useRef(null);
  let nameRef = useRef(null);
  let emailRef = useRef(null);
  let phoneRef = useRef(null);
  let addressRef = useRef(null);
  let cityRef = useRef(null);
  let textAreaRef = useRef(null);

 
  const addOrder = async (order) => {
    const response = await fetch(
      "https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          name: order.name,
          email: order.email,
          phone: order.phone,
          address: order.address,
          city: order.city,
          delivery: deliveryForm,
          textArea: order.textArea,
          orderCompleted: false,
          totalAmount: totalAmount,
          cartItems: cartItems,
        }),
        headers: { "Content-Type": "application.json" },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPhone = phoneRef.current.value;
    const enteredAddress = addressRef.current.value;
    const selectedCity = cityRef.current.value;
    const textArea = textAreaRef.current.value;

    addOrder({
      name: enteredName,
      email: enteredEmail,
      phone: enteredPhone,
      address: enteredAddress,
      city: selectedCity,
      textArea: textArea,
      totalAmount: totalAmount,
      cartItems: JSON.parse(JSON.stringify(cartItems)),
    });
    cartCtx.clearCart();
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
    formRef.current.reset();
    // navigate("/", { replace: true });
  };
  return (
    <form ref={formRef} onSubmit={submitHandler}>
      {/* {!phone && <h2>Not Found</h2>} */}
      <div
        className={alert ? `${classes.alert} ${classes.active}` : classes.alert}
      >
        <CheckIcon fontSize="large" /> <p>Order sent</p>
      </div>
      <Input forwardedRef={nameRef} name={"Name"} type={"text"} />
      <Input forwardedRef={emailRef} name={"Email"} type={"email"} />
      <Input forwardedRef={phoneRef} name={"Phone Number"} type={"tel"} />
      <Input forwardedRef={addressRef} name={"Address"} type={"text"} />
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
