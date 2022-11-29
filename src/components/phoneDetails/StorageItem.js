import React from "react";
import classes from "./StorageItem.module.scss";
import { motion } from "framer-motion";

const StorageItem = ({ storage, storageA, setPrice, setStorage }) => {

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.1 }}
      className={`${classes.storageItem} ${
        storage === storageA.storage ? classes.active : ""
      }`}
      onClick={() => {
        setStorage(storageA);
      }}
    >
      {storageA.storage}
    </motion.div>
  );
};

export default React.memo(StorageItem);


// import React from "react";
// import classes from "./StorageItem.module.scss";
// import { motion } from "framer-motion";

// const StorageItem = ({ storage, storageA, price, setPrice, setStorage }) => {

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.7 }}
//       animate={{ opacity: 1, scale: 1 }}
//       whileHover={{ scale: 1.1 }}
//       transition={{ duration: 0.1 }}
//       className={`${classes.storageItem} ${
//         storage === storageA ? classes.active : ""
//       }`}
//       onClick={() => {
//         setPrice(price);
//         setStorage(storageA);
//       }}
//     >
//       {storageA}
//     </motion.div>
//   );
// };

// export default React.memo(StorageItem);
