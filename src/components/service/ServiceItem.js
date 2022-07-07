import React from 'react'
import classes from './ServiceItem.module.css'



const ServiceItem = ({name,price}) => {
  
  return (
    <div className={classes.main}>
    <p className={classes.name}>{name}</p>
    <p className={classes.price}>{price} $</p>
    </div>
  )
}

export default ServiceItem