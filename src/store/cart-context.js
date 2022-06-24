import { createContext } from "react";

const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: ()=>{},
    removeItem: ()=>{},
    increaseItem: ()=>{},
    decreaseItem: ()=>{},
    clearCart: ()=>{},
  
})

export default CartContext;