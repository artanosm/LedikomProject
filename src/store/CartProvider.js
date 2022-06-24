import { useReducer } from "react";
import CartContext from "./cart-context";
import React from "react";

// const defaultCartState = {
//   items: [],
//   totalAmount: 0,
// };
let defaultCartState;
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
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
   
    let updatedItems = state.items.concat(action.item);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    console.log(state, action)
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

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  // const increaseItemHandler = (id) => {
  //   dispatchCartAction({ type: "INCREASE", id: id });
  // };

  // const decreaseItemHandler = (id) => {
  //   dispatchCartAction({ type: "DECREASE", id: id });
  // };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    // increaseItem: increaseItemHandler,
    // decreaseItem: decreaseItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      <div>{props.children}</div>
    </CartContext.Provider>
  );
};

export default CartProvider;

// import { useReducer } from "react";
// import CartContext from "./cart-context";
// import React from "react";

// // const defaultCartState = {
// //   items: [],
// //   totalAmount: 0,
// // };
// let defaultCartState;
// if (JSON.parse(window.localStorage.getItem("cartItems")) !== null) {
//   defaultCartState = {
//     items: JSON.parse(window.localStorage.getItem("cartItems")),
//     totalAmount: JSON.parse(window.localStorage.getItem("cartTotalAmount")),
//   };
// } else {
//   defaultCartState = {
//     items: [],
//     totalAmount: 0,
//   };
// }

// const cartReducer = (state, action) => {
//   if (action.type === "ADD") {
//     const updatedTotalAmount =
//       state.totalAmount + action.item.price * action.item.amount;
//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.id === action.item.id
//     );

//     const existingCartItem = state.items[existingCartItemIndex];

//     let updatedItems;
//     if (existingCartItem) {
//       const updatedItem = {
//         ...existingCartItem,
//         amount: existingCartItem.amount + action.item.amount,
//       };

//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     } else {
//       updatedItems = state.items.concat(action.item);
//     }

//     return {
//       items: updatedItems,
//       totalAmount: updatedTotalAmount,
//     };
//   }

//   if (action.type === "INCREASE") {
//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.id === action.id
//     );
//     const existingItem = state.items[existingCartItemIndex];
//     console.log(existingItem);
//     const updatedTotalAmount = state.totalAmount + existingItem.price;
//     let updatedItems;
//     // if (existingItem.amount === 1) {
//     //   updatedItems = state.items.filter((item) => item.id !== action.id);
//     // }

//     const updatedItem = { ...existingItem, amount: existingItem.amount + 1 };
//     updatedItems = [...state.items];
//     updatedItems[existingCartItemIndex] = updatedItem;
//     return {
//       items: updatedItems,
//       totalAmount: updatedTotalAmount,
//     };
//   }

//   if (action.type === "DECREASE") {
//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.id === action.id
//     );
//     const existingItem = state.items[existingCartItemIndex];
//     const updatedTotalAmount = state.totalAmount - existingItem.price;
//     let updatedItems;
//     if (existingItem.amount === 1) {
//       updatedItems = state.items.filter((item) => item.id !== action.id);
//     } else {
//       const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     }

//     return {
//       items: updatedItems,
//       totalAmount: updatedTotalAmount,
//     };
//   }
//   if (action.type === "CLEAR") {
//     return {items:[], totalAmount:0};
//   }
//   return {items:[], totalAmount:0};
// };

// const CartProvider = (props) => {
//   const [cartState, dispatchCartAction] = useReducer(
//     cartReducer,
//     defaultCartState
//   );

//   const addItemHandler = (item) => {
//     dispatchCartAction({ type: "ADD", item: item });
//   };

//   const increaseItemHandler = (id) => {
//     dispatchCartAction({ type: "INCREASE", id: id });
//   };

//   const decreaseItemHandler = (id) => {
//     dispatchCartAction({ type: "DECREASE", id: id });
//   };

//   const clearCartHandler = () => {
//     dispatchCartAction({ type: "CLEAR" });
//   };

//   const cartContext = {
//     items: cartState.items,
//     totalAmount: cartState.totalAmount,
//     addItem: addItemHandler,
//     increaseItem: increaseItemHandler,
//     decreaseItem: decreaseItemHandler,
//     clearCart: clearCartHandler,
//   };

//   return (
//     <CartContext.Provider value={cartContext}>
//       <div>{props.children}</div>
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;
