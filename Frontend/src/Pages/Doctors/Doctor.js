import React from 'react';
import { Link } from 'react-router-dom';

const Doctor = () => {
  return <div className='doctors'>
    <article>
      <h4>Doctors</h4>
      <Link to="/doctors/add"><button className='btn btn-info'>Add</button></Link>
    </article>
  </div>;
};

export default Doctor;
