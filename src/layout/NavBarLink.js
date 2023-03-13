import { Link } from 'react-router-dom'
import classes from './NavBarLink.module.scss'

const NavBarLink = ({click,closeMobileMenu,name,path}) => {
  return (
    <li
    className={
      click ? `${classes.option} ${classes.activeOption}` : classes.option
    }
    onClick={closeMobileMenu}
  >
    <Link to={`${path}`}>{name}</Link>
  </li>
  )
}

export default NavBarLink;