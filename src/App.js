import { Routes, Route } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

import Home from "./pages/Home";
import Phones from "./pages/Phones";
import Service from "./pages/Service";
import Login from "./components/signForms/Login";
import SignUp from "./components/signForms/SignUp";
import Profile from "./pages/Profile";
import CheckOut from "./pages/CheckOut";
import Cart from "./components/cart/Cart";
import PhoneDetails from "./components/phoneDetails/PhoneDetails";
import AddPhone from "./components/AddPhone";
import Orders from "./pages/Orders";
import { AuthContextProvider } from "./store/auth-context";
import CartContext from "./store/cart-context";
import ServiceBrand from "./components/service/ServiceBrand";
import AddService from "./components/AddService";
import PhoneServiceDetails from "./components/service/PhoneServiceDetails";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const cartCtx = useContext(CartContext);
  let cartI = cartCtx.items;
  let cartTA = cartCtx.totalAmount;

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartI));
    localStorage.setItem("cartTotalAmount", JSON.stringify(cartTA));
  }, [cartI, cartTA]);  
  

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <AuthContextProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addPhone" element={<AddPhone />} />
        <Route path="/addService" element={<AddService />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/service" element={<Service />} />
        <Route path="/service/:brand" element={<ServiceBrand />} />
        <Route path="/service/:brand/:serviceId" element={<PhoneServiceDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/phones/:phoneId" element={<PhoneDetails />} />
      </Routes>
      <Footer />
    </AuthContextProvider>
  );
}

export default App;
