import React from 'react'
import classes from './StorageItem.module.css'

const StorageItem = ({storage,storageA,price ,setPrice ,setStorage}) => {
    console.log();
  return (
    <div
            className={`${classes.storageItem} ${
              storage === storageA ? classes.active : ""
            }`}
            onClick={() => {
              setPrice(price);
              setStorage(storageA);
            }}
          >
            {storageA}
          </div>
  )
}

export default StorageItem