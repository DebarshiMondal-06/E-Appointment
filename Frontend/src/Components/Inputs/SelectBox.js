import React from 'react'


const SelectBox = ({ col, errors, register, name1, register1, pattern1, message1, data, message, value, className }) => {


  return <div className={`select--box--div col-md-${col ? col : '6'} mb-4`}>
    <label className="form-label">{name1}</label>
    <i className="fas fa-sort-down"></i>
    <select defaultValue={value} className={`select--boxes form-control ${className}`} {...register(register1, { required: true, pattern: pattern1 ? pattern1 : null })}>
      <option style={{ textTransform: "uppercase!important" }} value="">{message ? message : 'Choose'}</option>
      {
        message ? null : data && data[0].map((items, i) => {
          let val = items[data[1]];
          return <option key={i} value={val}>{val}</option>
        })
      }
    </select>
    <p className='error--lines'>{errors[register1] ? errors[register1]?.type === 'pattern' ? <span className="text-danger">{message1}</span>
      : <span className="text-danger">This field is required</span>
      : null
    }</p>
  </div>
}

export default SelectBox;