import React from "react";
import classes from "./InfoItem.module.css";

const InfoItem = ({title, content}) => {
  return (
    <div>
      <h4 className={classes.titles}>{title}</h4> <span>{content}</span>
      <hr />
    </div>
  );
};

export default InfoItem;
