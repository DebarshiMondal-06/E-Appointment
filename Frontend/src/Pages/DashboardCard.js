import React from 'react';
import { FaUser } from 'react-icons/fa';

const DashboardCard = () => {

  let dashboard_card = (textcolor, text, count) => {
    return <div className='dashboard--card card shadow'>
      <h3 className={`text-${textcolor}`}><b>{text}</b></h3>
      <article className='cards--info'>
        <p className={`cards--text text-${textcolor}`}>{count}</p>
        <p className='cards--icon'><FaUser /></p>
      </article>
    </div>
  }

  return <>
    <h1 className=''>Dashboard</h1>
    <main className='dashboard--main'>
      {dashboard_card('success', 'Total User', 44)}
      {dashboard_card('danger', 'Pending User', 44)}
      {dashboard_card('info', 'Total Patient', 17)}
      {dashboard_card('warning', 'Daily Patient', 12)}
      {dashboard_card('secondary', 'Total Doctor', 32)}
      {dashboard_card('danger', 'Daily Doctor', 18)}
      {dashboard_card('success', 'Total Hospitals', 29)}
      {dashboard_card('info', 'Appointments', 53)}
      {dashboard_card('warning', 'Payments', 25)}
      {dashboard_card('secondary', 'Revenue', 3700)}
    </main>
  </>;
};

export default DashboardCard;
