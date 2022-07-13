import React from 'react'
import classes from './ColorItem.module.css'

const ColorItem = ({colorA , colorImg, setColorImg}) => {

  return (
    <div
    // className={color === phony.black ? classes.active : classes.colorsItem }
    className={`${classes.colorsItem} ${
      colorImg === colorA.image ? classes.active : ""
    }`}
    onClick={() => {
      setColorImg(colorA.image);
    }}
  >
    <div style={{backgroundColor: colorA.hex}}></div>
    <p>{colorA.name}</p>
  </div>
  )
}

export default ColorItem