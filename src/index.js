import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
// import "./index.css";
import "./index.scss";
import App from "./App";
import CartProvider from "./store/CartProvider";
import { ParallaxProvider } from "react-scroll-parallax";
import ScrollToTop from "../src/ScrollToTop";
// import ServiceProvider from "./store/ServiceProvider";
import { AuthContextProvider } from "./store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ParallaxProvider>
        <ScrollToTop>
        <AuthContextProvider>

          <CartProvider>
            {/* <ServiceProvider> */}
            <App />
            {/* </ServiceProvider> */}
          </CartProvider>
        </AuthContextProvider>
        </ScrollToTop>
      </ParallaxProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitalstWebVitals();
