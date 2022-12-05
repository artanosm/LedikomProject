import React from "react";
import classes from "./ServiceCard.module.scss";

const ServiceCard = ({ itemImage, price, name, services, setServices }) => {
  const existing = services.items.filter((item) => item.name === name);

  const onAddRemoveHandler = () => {
    const exist = services.items.findIndex((item) => item.name === name);

    if (exist >= 0) {
      const itemsArr = services.items.filter((item) => item.name !== name);
      const total = services.totalAmount;
      const newTotal = total - price;
      setServices({ items: itemsArr, totalAmount: newTotal });
    } else {
      const itemsArr = services.items;
      itemsArr.push({ name, price });
      const total = services.totalAmount;
      const newTotal = total + price;
      setServices({ items: itemsArr, totalAmount: newTotal });
    }
  };
  return (
    <div
      className={
        existing.length > 0 ? `${classes.main} ${classes.active}` : classes.main
      }
      onClick={onAddRemoveHandler}
    >
      <img src={itemImage} alt="item" />
      <p>{name}</p>
      <p>{price} $</p>
    </div>
  );
};

export default ServiceCard;
