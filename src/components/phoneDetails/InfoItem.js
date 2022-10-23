import React from "react";
import classes from "./InfoItem.module.scss";

const InfoItem = ({title, content}) => {

  return (
    <div>
      <h4 className={classes.titles}>{title}<span>{content}</span></h4>
      <hr />
    </div>
  );
};

export default React.memo(InfoItem);
