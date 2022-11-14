import React from "react";
import classes from "./Input.module.scss";
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.div}>
      <br />
      <input
        ref={ref}
        placeholder={props.name}
        className={classes.input}
        type={props.type}
        defaultValue={props?.defaultValue}
      ></input>
      <br />
    </div>
  );
});

export default Input;
