import React from 'react';
import './loader.css';



const ProcessSpinner = () => {
  return <div className="lds-ring">
    <div
      style={{
        width: '27px',
        height: "27px",
        border: `4px solid #fff`,
        borderColor: `transparent transparent transparent #fff`
      }}
    ></div><div></div><div></div><div></div>
  </div>
}

export default ProcessSpinner;