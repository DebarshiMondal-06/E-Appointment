import React, { useContext } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { createGlobalContext } from '../../Utils/GlobalContext';

const SideBar = ({ setOpenSidebar, openSidebar }) => {


  return <div className='sidebar shadow-lg'>
    <h1>Hello <FaWindowClose onClick={() => setOpenSidebar(false)} /></h1>

  </div>;
};

export default SideBar;
