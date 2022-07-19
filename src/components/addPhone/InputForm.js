import React from 'react'

const InputForm = React.forwardRef(({title, type},ref) => {
  return (
    <div>
    <label >{title}</label>
    <input type={type} ref={ref} />
    </div>
  )
})

export default InputForm;