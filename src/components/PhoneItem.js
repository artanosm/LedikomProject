import React from "react";
import classes from "./PhoneItem.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PhoneItem = (props) => {
  return (
    <Link className={classes.a} to={`/phones/${props.id}`}>
      <motion.div
        className={classes.container}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <img
          className={classes.image}
          alt="phone-img"
          src={props.colors.color1.image}
        />
        <div className={classes.dataContainer}>
          <p className={classes.model}>{props.model}</p>
          <p className={classes.brand}>{props.brand}</p>
          <p className={classes.price}>{props.price1} $</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default PhoneItem;
