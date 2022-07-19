import React from "react";
import classes from "./Storage.module.css";
import StorageItem from "./StorageItem";

function Storage({ phony, setPrice, price, storage, setStorage }) {
  if (!price) {
    price = phony.price128GB;
  }
  return (
    <div>
      <h4 className={classes.title}>{phony.storageOrCase}:</h4>
      <div className={classes.storageContainer}>
        {phony.storage64GB && (
          <StorageItem
            storage={storage}
            price={phony.price64GB}
            storageA={phony.storage64GB}
            setStorage={setStorage}
            setPrice={setPrice}
          />
        )}
        {phony.storage128GB && (
          <StorageItem
            storage={storage}
            price={phony.price128GB}
            storageA={phony.storage128GB}
            setStorage={setStorage}
            setPrice={setPrice}
          />
        )}
        {phony.storage256GB && (
          <StorageItem
            storage={storage}
            price={phony.price256GB}
            storageA={phony.storage256GB}
            setStorage={setStorage}
            setPrice={setPrice}
          />
        )}
        {phony.storage512GB && (
          <StorageItem
            storage={storage}
            price={phony.price512GB}
            storageA={phony.storage512GB}
            setStorage={setStorage}
            setPrice={setPrice}
          />
        )}
        {phony.storage1TB && (
          <StorageItem
            storage={storage}
            price={phony.price1TB}
            storageA={phony.storage1TB}
            setStorage={setStorage}
            setPrice={setPrice}
          />
        )}
      </div>
    </div>
  );
}

export default Storage;
