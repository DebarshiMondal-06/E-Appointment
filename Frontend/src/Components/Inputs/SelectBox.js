import React from 'react'


const SelectBox = ({ errors, register, name1, register1, pattern1, message1, data, message }) => {


  return <div className="select--box--div col-md-6 mb-4">
    <label className="form-label">{name1}</label>
    <i className="fas fa-sort-down"></i>
    <select className="select--boxes form-control" {...register(register1, { required: true, pattern: pattern1 ? pattern1 : null })}>
      <option value="">{message ? message : 'Choose'}</option>
      {
        message ? null : data && data[0].map((items, i) => {
          let val = items[data[1]];
          return <option key={i} value={val}>{val}</option>
        })
      }
    </select>
    <p>{errors[register1] ? errors[register1]?.type === 'pattern' ? <span className="text-danger">{message1}</span>
      : <span className="text-danger">This field is required</span>
      : null
    }</p>
  </div>
}

export default SelectBox;