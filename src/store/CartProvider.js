import { useReducer } from "react";
import CartContext from "./cart-context";
import React from "react";


let defaultCartState

if (JSON.parse(window.localStorage.getItem("cartItems")) !== null) {
  defaultCartState = {
    items: JSON.parse(window.localStorage.getItem("cartItems")),
    totalAmount: JSON.parse(window.localStorage.getItem("cartTotalAmount")),
  };
} else {
  defaultCartState = {
    items: [],
    totalAmount: 0,
  };
}



const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingCartItemIndex];
    let updatedItems;
    let updatedTotalAmount;
    if (existingItem) {
      updatedTotalAmount = state.totalAmount + existingItem.price;
      const updatedItem = { ...existingItem, amount: existingItem.amount + 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedTotalAmount = state.totalAmount + action.item.price;
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "DELETE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const existingItemTotal = existingItem.amount * existingItem.price;
    const updatedTotalAmount = state.totalAmount - existingItemTotal;
    let updatedItems;
    updatedItems = state.items.filter((item) => item.id !== action.id);
    console.log(updatedTotalAmount);
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return { items: [], totalAmount: 0 };
  }
  return { items: [], totalAmount: 0 };
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const deleteItemHandler = (id) => {
    dispatchCartAction({ type: "DELETE", id: id });
  };
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      <div>{props.children}</div>
    </CartContext.Provider>
  );
};

export default CartProvider;
