import React, { useRef } from "react";
import Input from "./Input";
import classes from "./CheckOutForm.module.css";

const CheckOutForm = ({ deliveryForm, cartItems, totalAmount }) => {
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
          textArea: order.textArea,
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
  };
  return (
    <form onSubmit={submitHandler}>
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
