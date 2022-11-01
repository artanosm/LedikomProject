import React from "react";
import classes from "./PhoneItem.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { lazy } from "react";

const PhoneItem = ({id,storage,colors,model,brand,price1,firebaseId}) => {

  const navigate = useNavigate();
  return (
    // <Link className={classes.a} to={`/phones/${id}?color=${colors.color1.name}&storage=${storage.storage64GB.replace(/\s/g, "+")}`}>
     <div
      className={classes.a}
      onClick={()=> navigate(
        `/phones/${id}?color=${
          colors.color1.name
        }&storage=${storage.storage64GB.replace(/\s/g, "+")}`,
        { state:{firebaseId:firebaseId} }
      )}
    >
      <motion.div
        className={classes.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          className={classes.image}
          alt="phone-img"
          src={colors.color1.image}
          loading='lazy'
        />
        <div className={classes.dataContainer}>
          <p className={classes.model}>{model}</p>
          <p className={classes.brand}>{brand}</p>
          <p className={classes.price}>{price1} $</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PhoneItem;
