import React from "react";
import classes from  './Input.module.css'
const Input = ({ type, name , forwardedRef}) => {
  return (
    <div className={classes.div}>
      {/* <label className={classes.label}>{name}:</label> */}
      <br />
      <input ref={forwardedRef} placeholder={name} className={classes.input} type={type}></input>
      <br />
    </div>
  );
};

export default Input;
