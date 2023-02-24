import React from "react";
import classes from "./Loader.module.scss";
import { GridLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={classes.spinnerContainer}>
    <GridLoader color="#ee3183" margin={3} />
      {/* <div className={classes.loadingSpinner}></div> */}
    </div>
  );
}
