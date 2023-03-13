import { useState, useContext } from "react";
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
import SnackBar from "../../ui/SnackBar";

const cities = {
  Skopje: "Skopje",
  Gostivar: "Gostivar",
  Tetovo: "Tetovo",
  Ohrid: "Ohrid",
  Struga:'Struga'
};
const CheckOutForm = ({ cartItems, totalAmount }) => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const randomString = v4();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

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
    if (!authCtx?.user) {
      return;
    }
    const order = {
      date: new Date().toString().slice(0, 25),
      serverDate: serverTimestamp(),
      id: randomString,
      cartItems: cartCtx.items,
      // cartItems: JSON.parse(JSON.stringify(cartItems)),
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
    setTimeout(() => {
      setAlert(false);
      navigate("/profile/orders", { replace: true });
    }, 3000);
    actions.resetForm();
  };
  return (
    <>
    <SnackBar color={"rgba(75, 183, 75, .8)"} message='Order Sent' handleClose={handleClose} alert={alert} icon={<CheckIcon/>} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form>
            <Stack spacing={2}>
              <InputMui
                name={"name"}
                label={"Name"}
                type={"text"}
                id={"name"}
              />
              <InputMui
                name={"email"}
                label={"Email"}
                type={"email"}
                id={"email"}
              />
              <InputMui
                name={"phoneNumber"}
                label={"Phone Number"}
                type={"tel"}
                id={"phone number"}
              />
              <InputMui
                name={"address"}
                label={"Address"}
                type={"text"}
                id={"address"}
              />
            </Stack>
            <SelectMui
              name={"city"}
              label={"Select City"}
              type={"text"}
              options={cities}
            />
            <br />
            <button
              disabled={alert}
              className={classes.orderButton}
              type="submit"
            >
              Order
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CheckOutForm;
