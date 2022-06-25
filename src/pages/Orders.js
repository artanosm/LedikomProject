import React, { useEffect } from 'react'

const Orders = () => {

    useEffect(()=>{
        const getOrders = async()=> {
            const response = await fetch("https://phone-14ee2-default-rtdb.europe-west1.firebasedatabase.app/orders.json")
             if (!response.ok) {
                throw new Error('Something went wrong')
             }
            const responseData = response.json()
            console.log(responseData)
        }
        getOrders().catch((error)=>{console.log(error);})   
    },[])
    
  return (
    <div>Orders</div>
  )
}

export default Orders