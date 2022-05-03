import React from 'react';
import { useCookies } from 'react-cookie';
import { FaUser } from 'react-icons/fa';

const DashboardCard = () => {
  const [cookie] = useCookies();
  const { user_role } = cookie.user_data || {};

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
      {(user_role === 'admin') ?
        <> {dashboard_card('success', 'Total User', 44)}
          {dashboard_card('danger', 'Pending User', 44)}
          {dashboard_card('info', 'Total Patient', 17)}
          {dashboard_card('secondary', 'Total Doctor', 32)}
          {dashboard_card('success', 'Total Hospitals', 29)}
          {dashboard_card('secondary', 'Revenue', 3700)}
        </>
        : null}

      {(user_role === 'doctor') ? <>
        {dashboard_card('success', 'Patient', 17)}
        {dashboard_card('danger', 'Appointments', 5)}
        {dashboard_card('info', 'Upcoming Schedule', 5)}
        {dashboard_card('secondnary', 'Payments', 2)}
        {dashboard_card('warning', 'Profit', 2)}
      </>
        : null}

      {(user_role === 'patient') ? <>
        {dashboard_card('warning', 'Appointments', 5)}
        {dashboard_card('info', 'Upcoming', 5)}
        {dashboard_card('success', 'Payments', 2)}
        {dashboard_card('danger', 'Failed Payments', 0)}
      </>
        : null}


    </main>
  </>;
};

export default DashboardCard;
