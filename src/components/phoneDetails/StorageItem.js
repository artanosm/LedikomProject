import React from "react";
import classes from "./StorageItem.module.scss";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const StorageItem = ({ storage, storageA, price, setPrice, setStorage }) => {
  const [searchParams, setSearchParams] = useSearchParams(); 
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.1 }}
      className={`${classes.storageItem} ${
        storage === storageA ? classes.active : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        setPrice(price);
        setStorage(storageA);
        setSearchParams({
          color: searchParams.get("color"),
          storage: storageA,
        });
       
      }}
    >
      {storageA}
    </motion.div>
  );
};

export default StorageItem;
