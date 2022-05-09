import React from 'react';
import { useLocation } from 'react-router-dom';
import Doctor from './Doctors/Doctor';
import DashboardCard from './DashboardCard';
import Patient from './Patients/Patient';
import AddDoctor from './Doctors/AddDoctor';
import './pages.css';
import PendingUser from './PendingUsers/PendingUser';
import Profile from './UserProfile/Profile';
import Hospital from './Hospitals/Hospital';
import AddHospital from './Hospitals/AddHospital';
import Book from './Appointment/Book';
import Appointments from './Appointment/Appointments';



const Paths = () => {
  let { pathname } = useLocation();

  if (pathname === '/dashboard/doctors') return <Doctor />
  if (pathname === '/dashboard/doctors_add') return <AddDoctor />
  if (pathname === '/dashboard/patients') return <Patient />
  if (pathname === '/dashboard/pending') return <PendingUser />
  if (pathname === '/dashboard/profile') return <Profile />
  if (pathname === '/dashboard/hospital') return <Hospital />
  if (pathname === '/dashboard/hospital_add') return <AddHospital />
  if (pathname === '/dashboard/hospital_edit') return <AddHospital />
  if (pathname === '/dashboard/appointments') return <Appointments />
  if (pathname === '/dashboard/book') return <Book />
  if (pathname === '/dashboard/book_edit') return <Book />


  return <DashboardCard />
};

export default Paths;
