import React from 'react';
import { FaWindowClose, FaUsers } from 'react-icons/fa';
import { MdAssistantNavigation, MdPolicy, MdAdminPanelSettings } from 'react-icons/md';
import { RiHomeGearFill, RiLogoutBoxFill } from 'react-icons/ri';

const SideBar = ({ openSidebar, closeSidebar, handleClose }) => {

  return <div className={`sidebar shadow-lg animate__animated ${openSidebar ? 'animate__fadeInLeft animate__faster' : 'd-none'} 
  ${closeSidebar ? 'animate__fadeOutLeft animate__faster' : null}`}>
    <article className='sidebar--top'>
      <h2>E-appointment</h2>
      <h2><FaWindowClose className='close--icon' onClick={() => handleClose(500)} /></h2>
    </article>
    <main className='sidebar--list'>
      <ul>
        <li className='items'> <MdAssistantNavigation /> &nbsp; Navigation </li>
        <ol className='items--list'>
          <li>DashBoard</li>
          <li>Profile</li>
        </ol>
        <li className='items'> <RiHomeGearFill /> &nbsp; Master Settings</li>
        <ol className='items--list'>
          <li>Manage Hospitals</li>
          <li>Manage Payment</li>
          <li>Manage Appointment</li>
        </ol>
        <li className='items'> <FaUsers /> &nbsp; Users Management </li>
        <ol className='items--list'>
          <li>Manage Doctors</li>
          <li>Manage Patient</li>
        </ol>
        <li className='items'> <MdPolicy /> &nbsp; CMS</li>
        <li className='items'> <MdAdminPanelSettings /> &nbsp;  Settings</li>
        <li className='items'> <RiLogoutBoxFill /> &nbsp; Logout</li>
      </ul>
    </main>
  </div>;
};

export default SideBar;
