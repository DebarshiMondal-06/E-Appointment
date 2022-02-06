import React from 'react';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { Link } from 'react-router-dom';

const AddDoctor = () => {
  return <div>
    <h4><Link to="/dashboard/doctors"><HiOutlineArrowNarrowLeft className="back--icon" /></Link>  &nbsp; Add Doctors</h4>
  </div>;
};

export default AddDoctor;
