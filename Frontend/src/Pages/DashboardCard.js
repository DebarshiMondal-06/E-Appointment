import React from 'react';
import { FaUser } from 'react-icons/fa';

const DashboardCard = () => {
  return <>
    <h1 className='text-center'>Dashboard</h1>
    <main className='dashboard--main'>
      <div className='dashboard--card card shadow'>
        <h3 className='text-info'>Total Hospital</h3>
        <article className='cards--info'>
          <p className='cards--text text-info'>18</p>
          <p className='cards--icon'><FaUser /></p>
        </article>
      </div>
      <div className='dashboard--card card shadow'>
        <h3 className='text-warning'>Total Doctors</h3>
        <article className='cards--info'>
          <p className='cards--text text-warning'>18</p>
          <p className='cards--icon'><FaUser /></p>
        </article>
      </div>
      <div className='dashboard--card card shadow'>
        <h3 className='text-success'>Total Patient</h3>
        <article className='cards--info'>
          <p className='cards--text text-success'>18</p>
          <p className='cards--icon'><FaUser /></p>
        </article>
      </div>
    </main>
  </>;
};

export default DashboardCard;
