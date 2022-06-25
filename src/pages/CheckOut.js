import React, { Fragment, useContext, useState } from "react";
import CartContext from "../store/cart-context";
import classes from "./CheckOut.module.css";
import CheckOutItem from "../components/cart/CheckOutItem";
import CheckOutForm from "../components/cart/CheckOutForm";

const CheckOut = () => {
  const cartCtx = useContext(CartContext);
  let [deliveryForm, setDeliveryForm] = useState(null);
 
  const cartItems = (
    <ul>
      {cartCtx.items.map((item) => {
        return (
          <CheckOutItem
            price={item.price}
            brand={item.brand}
            model={item.model}
            id={item.id}
            key={item.id}
            amount={item.amount}
            color={item.color}
            storage={item.storage}
            image={item.image}
          />
        );
      })}
    </ul>
  );

  console.log(cartItems);

  return (
    <Fragment>
      <div className={classes.mainContainer}>
        <div className={classes.firstContainer}>
          <div className={classes.itemsContainer}>
            <div className={classes.headers}>
              <div className={classes.product}>Products</div>
              <div>Price</div>
              <div>Amount</div>
              <div>Total</div>
            </div>
            <hr></hr>
            <div>
              {cartCtx.items.length !== 0 ? (
                <div>{cartItems}</div>
              ) : (
                <p>No Items Yet</p>
              )}
              {cartCtx.items.length > 0 && (
                <div>
                  <hr></hr>
                  <h3 className={classes.amount}>
                    Total: {cartCtx.totalAmount} $
                  </h3>
                </div>
              )}
            </div>
          </div>
          <div className={classes.deliver}>
            <h3>Deliver</h3>
            <div className={classes.deliver1}>
              <div>
                <input
                  onChange={(e) => setDeliveryForm(e.target.value)}
                  name="location"
                  value="Post"
                  id="post"
                  type="radio"
                />
                <label htmlFor="post">Post</label>
              </div>
              <div>
                <input
                  onChange={(e) => setDeliveryForm(e.target.value)}
                  name="location"
                  id="pickup"
                  value="Pickup"
                  type="radio"
                />
                <label htmlFor="pickup">Pick Up</label>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.info}>
          <h3>Delivery Information</h3>
          <CheckOutForm cartItems={cartCtx.items} totalAmount={cartCtx.totalAmount} deliveryForm={deliveryForm} />
        </div>
      </div>
    </Fragment>
  );
};

export default CheckOut;
