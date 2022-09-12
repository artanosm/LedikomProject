import React, { useContext } from "react";
import classes from "./ServiceCard.module.scss";
import ServiceContext from "../../store/service-context";

const ServiceCard = ({ itemImage, price, name }) => {
  const serviceCtx = useContext(ServiceContext);
  const existing = serviceCtx.items.filter(item => item.name === name)

  const onAddRemoveHandler = () => {
    serviceCtx.addItem({ name: name, price: price });
  };
  return (
    <div className={existing.length > 0 ? `${classes.main} ${classes.active}` : classes.main} onClick={onAddRemoveHandler}>
      <img src={itemImage} alt="item" />
      <p>{name}</p>
      <p>{price} $</p>
    </div>
  );
};

export default ServiceCard;
