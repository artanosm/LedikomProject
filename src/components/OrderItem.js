import React from 'react'

const OrderItem = ({order}) => {
    console.log(order);
  return (
    <div>
        {order.name}
    </div>
  )
}

export default OrderItem