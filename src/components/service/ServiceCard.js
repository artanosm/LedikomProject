import React from 'react'
import classes from './ServiceCard.module.css'

const ServiceCard = ({itemImage, price,name}) => {
  return (
    <div className={classes.main}>
        <img src={itemImage} alt='item'/>
        <p>{name}</p>
        <p>{price} $</p>
    </div>
  )
}

export default ServiceCard