import React from 'react'


const SelectBox = ({ errors, register, name1, register1, pattern1, message1 }) => {


  return <div className="col-md-6 mb-4">
    <label className="form-label">{name1}</label>
    <select className="form-control" {...register(register1, { required: true, pattern: pattern1 ? pattern1 : null })}>
      <option value="">Choose</option>
      <option value="1">Cardic</option>
      <option value="1">Surgery</option>
      <option value="1">Dental</option>
      <option value="1">Child Specality</option>
    </select>
    <p>{errors[register1] ? errors[register1]?.type === 'pattern' ? <span className="text-danger">{message1}</span>
      : <span className="text-danger">This field is required</span>
      : null
    }</p>
  </div>
}

export default SelectBox;