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
import Advance from './Settings/Advance';
import Feedback from './Settings/Feedback';
import DoctorPatient from './Patients/DoctorPatient';



const Paths = () => {
  let { pathname } = useLocation();

  if (pathname === '/dashboard/doctors') return <Doctor />
  if (pathname === '/dashboard/doctors_add') return <AddDoctor />
  if (pathname === '/dashboard/patients') return <Patient />
  if (pathname === '/dashboard/patients_appointed') return <DoctorPatient />

  if (pathname === '/dashboard/pending') return <PendingUser />
  if (pathname === '/dashboard/profile') return <Profile />
  if (pathname === '/dashboard/hospital') return <Hospital />
  if (pathname === '/dashboard/hospital_add') return <AddHospital />
  if (pathname === '/dashboard/hospital_edit') return <AddHospital />
  if (pathname === '/dashboard/appointments') return <Appointments />
  if (pathname === '/dashboard/book') return <Book />
  if (pathname === '/dashboard/book_edit') return <Book />
  if (pathname === '/dashboard/feedback') return <Feedback />
  if (pathname === '/dashboard/advance') return <Advance />


  return <DashboardCard />
};

export default Paths;
