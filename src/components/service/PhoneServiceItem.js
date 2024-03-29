import classes from './PhoneServiceItem.module.scss';
import { Link } from 'react-router-dom';

const PhoneServiceItem = ({item}) => {
  return (
    <Link to={item.id} state={item} className={classes.main}>
        <img src={item.image} alt='logo' />
        <p className={classes.brandName}>{item.model}</p>
    </Link>
  )
}

export default PhoneServiceItem