import React from "react";
import classes from "./ColorItem.module.scss";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";


const ColorItem = ({ colorA, colorImg, setColorImg }) => {
  

const [searchParams, setSearchParams] = useSearchParams();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.1 }}
      className={`${classes.colorsItem} ${
        colorImg.color === colorA.image ? classes.active : ""
      }`}
      onClick={(e) => { 
        e.preventDefault();     
        setColorImg({ color: colorA.image, name: colorA.name });
        setSearchParams({color:colorA.name,storage:searchParams.get('storage') })
        
      }}
    >
      <div style={{ backgroundColor: colorA.hex }}></div>
      <p>{colorA.name}</p>
    </motion.div>
  );
};

export default ColorItem;
