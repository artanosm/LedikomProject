import { Routes, Route,useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import TopHeader from "./layout/TopHeader";
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
import MyOrders from "./pages/MyOrders";
import AddService from "./components/AddService";
import ServiceBrand from "./components/service/ServiceBrand";
import PhoneServiceDetails from "./components/service/PhoneServiceDetails";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import OrderDetail from "./components/profile/OrderDetail";
import AuthContext from "./store/auth-context";
import { AnimatePresence } from "framer-motion";


import CartContext from "./store/cart-context";
import EditPhone from "./components/EditPhone";


function App() {
  const authCtx = useContext(AuthContext);

  const token = sessionStorage.getItem("token");

  const [cartIsShown, setCartIsShown] = useState(false);
  const location = useLocation()
  const cartCtx = useContext(CartContext);
  let cartI = cartCtx.items;
  let cartTA = cartCtx.totalAmount;

  useEffect(() => {
    if (!token) {
      authCtx.logOut();
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartI));
    localStorage.setItem("cartTotalAmount", JSON.stringify(cartTA));
  }, [cartI, cartTA]);

  const showCartHandler = () => {
    disableScroll();
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    enableScroll();
    // window.document.body.style.overflow = "unset";
    setCartIsShown(false);
  };


  const disableScroll = () => {
    window.document.body.style.overflow = "hidden";
  };
  const enableScroll = () => {
    window.document.body.style.overflow = "unset";
  };
  return (
    <>
      {cartIsShown && (
        <Cart cartIsShown={cartIsShown} onClose={hideCartHandler} />
      )}
      <TopHeader />
      <Header
        onShowCart={showCartHandler}
        onDisableScroll={disableScroll}
        onEnableScroll={enableScroll}
      />

   <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/addPhone" element={<AddPhone />} />
        <Route path="/addService" element={<AddService />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/product/:phoneId" element={<EditPhone />} />
        <Route path="/phones/:phoneId" element={<PhoneDetails />} />
        <Route path="/search/:searchId" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/service/:brand" element={<ServiceBrand />} />
        <Route
          path="/service/:brand/:serviceId"
          element={<PhoneServiceDetails />}
        />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/orders" element={<MyOrders />} />
        <Route path="/profile/orders/:orderId" element={<OrderDetail />} />
      </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default App;
