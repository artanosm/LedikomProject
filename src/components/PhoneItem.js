import React from "react";
import classes from "./PhoneItem.module.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PhoneItem = (props) => {
  // console.log(props.id);
  return (
    <Link className={classes.a} to={`/phones/${props.id}?color=${props.colors.color1.name}&storage=${props.storage.storage64GB.replace(/\s/g, "+")}`}>
      <motion.div
        className={classes.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
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
