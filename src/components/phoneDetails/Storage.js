import React from "react";
import classes from "./Storage.module.css";

function Storage({ phony, setPrice, price, storage, setStorage }) {
  if (!price) {
    price = phony.price128GB;
  }
  return (
    <div>
      <h4 className={classes.title}>Storage:</h4>
      <div className={classes.storageContainer}>
        {phony.storage64GB && (
          <div
            className={`${classes.storageItem} ${
              storage === phony.storage64GB ? classes.active : ""
            }`}
            onClick={() => {
              setPrice(phony.price64GB);
              setStorage(phony.storage64GB);
            }}
          >
            {phony.storage64GB}
          </div>
        )}
        {phony.storage128GB && (
          <div
            className={`${classes.storageItem} ${
              storage === phony.storage128GB ? classes.active : ""
            }`}
            onClick={() => {
              setPrice(phony.price128GB);
              setStorage(phony.storage128GB);
            }}
          >
            {phony.storage128GB}
          </div>
        )}
        {phony.storage256GB && (
          <div
            className={`${classes.storageItem} ${
              storage === phony.storage256GB ? classes.active : ""
            }`}
            onClick={() => {
              setPrice(phony.price256GB);
              setStorage(phony.storage256GB);
            }}
          >
            {phony.storage256GB}
          </div>
        )}
        {phony.storage512GB && (
          <div
            className={`${classes.storageItem} ${
              storage === phony.storage512GB ? classes.active : ""
            }`}
            onClick={() => {
              setPrice(phony.price512GB);
              setStorage(phony.storage512GB);
            }}
          >
            {phony.storage512GB}
          </div>
        )}
        {phony.storage1TB && (
          <div
            className={`${classes.storageItem} ${
              storage === phony.storage1TB ? classes.active : ""
            }`}
            onClick={() => {
              setPrice(phony.price1TB);
              setStorage(phony.storage1TB);
            }}
          >
            {phony.storage1TB}
          </div>
        )}
      </div>
    </div>
  );
}

export default Storage;
