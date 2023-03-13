import classes from './ServiceItem.module.scss'



const ServiceItem = ({name,price}) => {
  
  return (
    <div className={classes.main}>
    <p className={classes.name}>{name}</p>
    <p className={classes.price}>{price} $</p>
    </div>
  )
}

export default ServiceItem