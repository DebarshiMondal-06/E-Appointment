import React from 'react';
import { useLocation } from 'react-router-dom';
import Doctor from './Doctors/Doctor';
import DashboardCard from './DashboardCard';
import Patient from './Patients/Patient';
import AddDoctor from './Doctors/AddDoctor';

const Paths = () => {
  let { pathname } = useLocation();

  if (pathname === '/doctors') return <Doctor />
  if (pathname === '/doctors/add') return <AddDoctor />
  if (pathname === '/patients') return <Patient />


  return <DashboardCard />
};

export default Paths;
