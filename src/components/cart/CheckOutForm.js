import React, { useState, useContext } from "react";
// import Input from "./Input";
import classes from "./CheckOutForm.module.scss";
import { useNavigate } from "react-router-dom";
import InputMui from "../signForms/InputMui";
import CartContext from "../../store/cart-context";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import AuthContext from "../../store/auth-context";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { v4 } from "uuid";
import { Formik, Form } from "formik";
import { object, string, number } from "yup";
import SelectMui from "../signForms/SelectMui";

const cities = {
  Skopje: "Skopje",
  Gostivar: "Gostivar",
  Tetovo: "Tetovo",
  Ohrid: "Ohrid",
};
const CheckOutForm = ({ cartItems, totalAmount }) => {
  // const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const randomString = v4();

  const initialValues = {
    name: authCtx.userData?.name,
    email: authCtx.user?.email,
    phoneNumber: authCtx.userData?.phoneNumber,
    address: authCtx.userData?.address,
    city: "",
  };

  const validationSchema = object({
    name: string().required("Required"),
    email: string().email("Invalid email").required("Email required"),
    phoneNumber: number().required("Required"),
    address: string().required("Required"),
    city: string().required("Required"),
  });

  const submitHandler = (values, actions) => {
    if (!authCtx.user) {
      return;
    }

    console.log(values);

    const order = {
      date: new Date().toString().slice(0, 25),
      serverDate: serverTimestamp(),
      id: randomString,
      cartItems: JSON.parse(JSON.stringify(cartItems)),
      orderCompleted: false,
      name: values.name,
      email: values.email,
      phone: values.phoneNumber,
      address: values.address,
      city: values.city,
      totalAmount: totalAmount,
      userId: authCtx.user?.uid,
    };

    setDoc(doc(db, "orders", randomString), { ...order });

    setDoc(doc(db, `users/${authCtx.user.uid}/orders`, randomString), {
      ...order,
    });
    cartCtx.clearCart();
    setAlert(true);
    setTimeout(() => setAlert(false), 2000);
    actions.resetForm();
    // navigate("/profile/orders", { replace: true });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {(formik) => (
        <Form>
          <div
            className={
              alert ? `${classes.alert} ${classes.active}` : classes.alert
            }
          >
            <CheckIcon fontSize="large" /> <p>Order sent</p>
          </div>
          <Stack spacing={2}>
            <InputMui
              name={"name"}
              label={"Name"}
              type={"text"}
              id={"name"}
              // defaultValue={authCtx.userData?.name}
            />
            <InputMui
              name={"email"}
              label={"Email"}
              type={"email"}
              id={"email"}
              // defaultValue={authCtx.user?.email}
            />
            <InputMui
              name={"phoneNumber"}
              label={"Phone Number"}
              type={"tel"}
              id={"phone number"}
              // defaultValue={authCtx.userData?.phoneNumber}
            />
            <InputMui
              name={"address"}
              label={"Address"}
              type={"text"}
              id={"address"}
              // defaultValue={authCtx.userData?.address}
            />
          </Stack>
          <SelectMui
            name={"city"}
            label={"Select City"}
            type={"text"}
            options={cities}
          />
          <br />
          <button className={classes.orderButton} type="submit">
            Order
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CheckOutForm;

// import React, { useRef, useState, useContext } from "react";
// // import Input from "./Input";
// import classes from "./CheckOutForm.module.scss";
// import { useNavigate } from "react-router-dom";
// import InputMui from "../signForms/InputMui";
// import CartContext from "../../store/cart-context";
// import Stack from '@mui/material/Stack';
// import CheckIcon from "@mui/icons-material/Check";
// import AuthContext from "../../store/auth-context";
// import { setDoc, doc, serverTimestamp } from "firebase/firestore";
// import { db } from "../firebase";
// import { v4 } from "uuid";

// const CheckOutForm = ({ deliveryForm, cartItems, totalAmount }) => {
//   const navigate =useNavigate()
//   const [alert, setAlert] = useState(false);

//   const authCtx = useContext(AuthContext);
//   const cartCtx = useContext(CartContext);

//   const randomString = v4();

//   const formRef = useRef(null);
//   const nameRef = useRef(null);
//   const emailRef = useRef(null);
//   const phoneRef = useRef(null);
//   const addressRef = useRef(null);
//   const cityRef = useRef(null);
//   const textAreaRef = useRef(null);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!authCtx.user) {
//       return;
//     }
//     const enteredName = nameRef.current.value;
//     const enteredEmail = emailRef.current.value;
//     const enteredPhone = phoneRef.current.value;
//     const enteredAddress = addressRef.current.value;
//     const selectedCity = cityRef.current.value;
//     const textArea = textAreaRef.current.value;

//     const order = {
//       date: new Date().toString().slice(0, 25),
//       serverDate: serverTimestamp(),
//       id: randomString,
//       cartItems: JSON.parse(JSON.stringify(cartItems)),
//       orderCompleted: false,
//       name: enteredName,
//       email: enteredEmail,
//       phone: enteredPhone,
//       address: enteredAddress,
//       city: selectedCity,
//       textArea: textArea,
//       totalAmount: totalAmount,
//       userId: authCtx.user.uid,
//     };

//     setDoc(doc(db, "orders", randomString), { ...order });

//     setDoc(doc(db, `users/${authCtx.user.uid}/orders`, randomString), {
//       ...order,
//     });
//     cartCtx.clearCart();
//     setAlert(true);
//     setTimeout(() => setAlert(false), 2000);
//     formRef.current.reset();
//     // navigate("/profile/orders", { replace: true });
//   };
//   return (
//     <form ref={formRef} onSubmit={submitHandler}>
//       <div
//         className={alert ? `${classes.alert} ${classes.active}` : classes.alert}
//       >
//         <CheckIcon fontSize="large" /> <p>Order sent</p>
//       </div>
//       <Stack spacing={2} >

//       <InputMui
//         ref={nameRef}
//         label={"Name"}
//         type={"text"}
//         id={"name"}
//         defaultValue={authCtx.userData?.name}
//       />
//       <InputMui
//         ref={emailRef}
//         label={"Email"}
//         type={"email"}
//         id={"email"}
//         defaultValue={authCtx.user?.email}
//       />
//       <InputMui
//         ref={phoneRef}
//         label={"Phone Number"}
//         type={"tel"}
//         id={"phone number"}
//         defaultValue={authCtx.userData?.phoneNumber}
//       />
//       <InputMui
//         ref={addressRef}
//         label={"Address"}
//         type={"text"}
//         id={"address"}
//         defaultValue={authCtx.userData?.address}
//       />
//       </Stack>

//       <select className={classes.select} ref={cityRef}>
//         <option disabled defaultValue>
//           Select City
//         </option>
//         <option value="Skopje">Skopje</option>
//         <option value="Tetovo">Tetovo</option>
//         <option value="Gostivar">Gostivar</option>
//         <option value="Ohrid">Ohrid</option>
//         <option value="Kicevo">Kicevo</option>
//       </select>
//       <br />
//       <label>Something to Add</label>
//       <br />
//       <textarea ref={textAreaRef} />
//       <br />
//       <button className={classes.orderButton} type="submit">
//         Order
//       </button>
//     </form>
//   );
// };

// export default CheckOutForm;
