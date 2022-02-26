import React from 'react'



const Input = ({ errors, register, name1, register1, pattern1, message1, type, value }) => {
  return <div className="col-md-6 mb-4">
    <label className="form-label">{name1}</label>
    <input defaultValue={value} type={type ? type : "text"} className="form-control" {...register(register1, { required: true, pattern: pattern1 })} />
    <p>{errors[register1] ? errors[register1]?.type === 'pattern' ? <span className="text-danger">{message1}</span>
      : <span className="text-danger">This field is required</span>
      : null
    }</p>
  </div>
}

export default Input;