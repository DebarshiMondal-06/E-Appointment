import React from 'react'



const Inputs = ({ col, errors, register, name1, register1, pattern1, message1, type, value, isreadable }) => {
  return <div className={`password col-md-${col ? col : "6"}  mb-4`}>
    <label className="form-label">{name1}</label>
    <input readOnly={isreadable} defaultValue={value} type={type ? type : "text"} className="form-control"
      {...register(register1, { required: true, pattern: pattern1 })} />
    <p className='error--lines'>{errors[register1] ? errors[register1]?.type === 'pattern' ? <span className="text-danger">{message1}</span>
      : <span className="text-danger">This field is required</span>
      : null
    }</p>
  </div>
}

const TextBox = ({ register, name1, register1, message1, value }) => {
  return <div className={`password col-md-12  mb-4`}>
    <label className="form-label">{name1}</label>
    <textarea defaultValue={value} type="text" className="form-control"
      {...register(register1, { required: true })} rows="4" cols="30" />
    <p className='error--lines'><span className="text-danger">{message1}</span></p>
  </div>
}

export { Inputs, TextBox };