import { memo } from "react";
import classes from "./Storage.module.scss";
import StorageItem from "./StorageItem";
import { motion } from "framer-motion";


const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};
function Storage({ phone, storage, setStorage }) {
  return (
    <>
      <h4 className={classes.title}>{phone.storageOrCase}:</h4>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={classes.storageContainer}
      >
        {phone.storage.storage1.storage && (
          <StorageItem
            storage={storage}
            storageA={phone.storage.storage1}
            setStorage={setStorage}
          />
        )}
        {phone.storage.storage2.storage && (
          <StorageItem
            storage={storage}
            storageA={phone.storage.storage2}
            setStorage={setStorage}
          />
        )}
        {phone.storage.storage3.storage && (
          <StorageItem
            storage={storage}
            storageA={phone.storage.storage3}
            setStorage={setStorage}
          />
        )}
        {phone.storage.storage4.storage && (
          <StorageItem
            storage={storage}
            storageA={phone.storage.storage4}
            setStorage={setStorage}
          />
        )}
        {phone.storage.storage5.storage && (
          <StorageItem
            storage={storage}
            storageA={phone.storage.storage5}
            setStorage={setStorage}
          />
        )}
      </motion.div>
    </>
  );
}

export default memo(Storage);
