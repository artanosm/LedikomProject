import React from "react";
import classes from "./ColorItem.module.scss";
import { motion } from "framer-motion";

const ColorItem = ({ colorA, colorImg, setColorImg }) => {
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.1 }}
      className={`${classes.colorsItem} ${
        colorImg.color === colorA.image ? classes.active : ""
      }`}
      onClick={() => {    
        setColorImg({ color: colorA.image, name: colorA.name });        
      }}
    >
      <div style={{ backgroundColor: colorA.hex }}></div>
      <p>{colorA.name}</p>
    </motion.div>
  );
};

export default ColorItem;
