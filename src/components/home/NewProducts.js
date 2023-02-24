import React from "react";
import classes from "./NewProducts.module.scss";
import Loader from "../../ui/Loader";
import PhoneItem from "../PhoneItem";

const NewProducts = ({ phones, isLoading }) => {
  const phoneItems = phones.map((phone, i) => {
    return (
      <PhoneItem
        // isLoading={isLoading}
        date={phone.date}
        type={phone.type}
        key={i}
        id={phone.id}
        price={phone.storage.storage1.price}
        brand={phone.brand}
        model={phone.model}
        colors={phone.colors}
        storage={phone.storage}
        animation={true}
      />
    );
  });

  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.container}>{phoneItems}</div>
    </>
  );
};

export default NewProducts;
