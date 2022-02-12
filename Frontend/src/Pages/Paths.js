import React from 'react';
import { useLocation } from 'react-router-dom';
import Doctor from './Doctors/Doctor';
import DashboardCard from './DashboardCard';
import Patient from './Patients/Patient';
import AddDoctor from './Doctors/AddDoctor';
import './pages.css';
import PendingUser from './PendingUser';


const Paths = () => {
  let { pathname } = useLocation();

  if (pathname === '/dashboard/doctors') return <Doctor />
  if (pathname === '/dashboard/doctors_add') return <AddDoctor />
  if (pathname === '/dashboard/patients') return <Patient />
  if (pathname === '/dashboard/pending') return <PendingUser />


  return <DashboardCard />
};

export default Paths;
