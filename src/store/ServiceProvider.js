// import { useReducer } from "react";
// import ServiceContext from "./service-context";
// import React from "react";

// const defaultCartState = {
//   items: [],
//   totalAmount: 0,
// };

// const serviceReducer = (state, action) => {
//   if (action.type === "ADDREMOVE") {
    
//     const existingItemIndex = state.items.findIndex(
//       (item) => item.name === action.item.name
//     );

//     const existingItem = state.items[existingItemIndex];
//     let updatedTotalAmount;
//     let updatedItems;

//     if (existingItem) {
//       updatedTotalAmount = state.totalAmount - action.item.price;
//       updatedItems = state.items.filter(
//         (item) => item.name !== action.item.name
//       );
//     } else {
//       updatedTotalAmount = state.totalAmount + action.item.price;
//       updatedItems = state.items.concat(action.item);
//     }

//     return {
//       items: updatedItems,
//       totalAmount: updatedTotalAmount,
//     };
//   }

//   return { items: [], totalAmount: 0 };
// };

// export const ServiceProvider = (props) => {
//   const [serviceState, dispatchServiceAction] = useReducer(
//     serviceReducer,
//     defaultCartState
//   );

//   const addItemHandler = (item) => {
//     dispatchServiceAction({ type: "ADDREMOVE", item: item });
//   };

//   const serviceContext = {
//     items: serviceState.items,
//     totalAmount: serviceState.totalAmount,
//     addItem: addItemHandler,
//   };

//   return (
//     <ServiceContext.Provider value={serviceContext}>
//       <div>{props.children}</div>
//     </ServiceContext.Provider>
//   );
// };

// export default ServiceProvider;
