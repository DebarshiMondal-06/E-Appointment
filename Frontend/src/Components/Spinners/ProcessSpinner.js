import React from 'react';
import './loader.css';



const ProcessSpinner = ({ size, border, padding }) => {
  return <div className="lds-ring" style={{ padding }}>
    <div
      style={{
        width: size ? size : '26px',
        height: size ? size : '26px',
        border: `${border ? border : '4px'} solid #fff`,
        borderColor: `transparent transparent transparent #fff`,
      }}
    ></div><div></div><div></div><div></div>
  </div>
}

export default ProcessSpinner;