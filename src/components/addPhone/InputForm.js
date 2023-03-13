import React from 'react'

const InputForm = React.forwardRef(({title, type,value = ''},ref) => {
  return (
    <div>
    <label >{title}</label>
    <input defaultValue={value} type={type} ref={ref} />
    </div>
  )
})

export default InputForm;