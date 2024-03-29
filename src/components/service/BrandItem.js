
import { Link } from 'react-router-dom'
import classes from './BrandItem.module.scss'


const BrandItem = ({brand}) => {
  return (
    <Link to={brand.name} className={classes.main}>
        <img src={brand.logo} alt='logo' />
        <p className={classes.brandName}>{brand.name}</p>
    </Link>
  )
}

export default BrandItem