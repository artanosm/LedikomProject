import {memo} from "react";
import classes from "./StorageItem.module.scss";
import { motion } from "framer-motion";

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
const StorageItem = ({ storage, storageA, setStorage }) => {
  
  const discountPercent = storageA.discountPrice && Math.floor(
    (100 * (storageA.discountPrice - storageA.price) / storageA.price)
  );


  return (
    <motion.div
  variants={item}
      // initial={{ opacity: 0, scale: 0.7 }}
      // animate={{ opacity: 1, scale: 1 }}
      // whileHover={{ scale: 1.1 }}
      // transition={{ duration: 0.1 }}
      percent={discountPercent && `${discountPercent}%`}
      className={`${
        storageA.discountPrice
          ? classes.storageItemDiscount
          : classes.storageItem
      } ${storage === storageA.storage ? classes.active : ""}`}
      onClick={() => {
        setStorage(storageA);
      }}
    >
      {storageA.storage}
    </motion.div>
  );
};

export default memo(StorageItem);
