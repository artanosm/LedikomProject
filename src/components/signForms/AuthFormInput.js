import React from 'react'
import classes from './AuthFormInput.module.css'

const AuthFormInput = React.forwardRef((props,ref) => {
  return (
    <div className={classes.formControl}>
    <input
      ref={ref}
      placeholder={props.placeholder}
      type={props.type}
      id={props.id}
      required
    />
  </div>
  )
})

export default AuthFormInput