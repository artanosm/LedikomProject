import { Routes, Route } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

import Home from "./pages/Home";
import Phones from "./pages/Phones";
import Service from "./pages/Service";
import User from "./pages/User";
import Profile from "./pages/Profile";
import CheckOut from "./pages/CheckOut";
import Cart from "./components/cart/Cart";
import PhoneDetails from "./components/phoneDetails/PhoneDetails";
import AddPhone from "./components/AddPhone";
import { AuthContextProvider } from "./store/auth-context";
import BrandPage from "./pages/BrandPage";
import CartContext from "./store/cart-context";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const cartCtx = useContext(CartContext);
  let cartI = cartCtx.items;
  let cartTA = cartCtx.totalAmount;

  useEffect(() => {
    window.localStorage.setItem("cartItems", JSON.stringify(cartI));
    window.localStorage.setItem("cartTotalAmount", JSON.stringify(cartTA));
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
        <Route path="/phones" element={<Phones />} />
        <Route path="/service" element={<Service />} />
        <Route path="/login" element={<User />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="phones/phone/:brand" element={<BrandPage />} />
        <Route path="/phones/:phoneId" element={<PhoneDetails />} />
      </Routes>
      <Footer />
    </AuthContextProvider>
  );
}

export default App;
