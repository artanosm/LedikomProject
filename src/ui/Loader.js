import React from "react";
import classes from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={classes.spinnerContainer}>
      <div className={classes.loadingSpinner}>
      </div>
    </div>
  );
}