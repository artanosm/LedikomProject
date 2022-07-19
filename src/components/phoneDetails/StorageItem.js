import React from "react";
import classes from "./StorageItem.module.css";
import { motion } from "framer-motion";

const StorageItem = ({ storage, storageA, price, setPrice, setStorage }) => {
  console.log();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.1 }}
      className={`${classes.storageItem} ${
        storage === storageA ? classes.active : ""
      }`}
      onClick={() => {
        setPrice(price);
        setStorage(storageA);
      }}
    >
      {storageA}
    </motion.div>
  );
};

export default StorageItem;
