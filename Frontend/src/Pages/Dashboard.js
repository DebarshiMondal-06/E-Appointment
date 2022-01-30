import React, { useContext } from 'react'
import Navbar from '../Components/Navigation/Navbar';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import SideBar from '../Components/Navigation/SideBar';
import { createGlobalContext } from '../Utils/GlobalContext';
import './pages.css';


const Dashboard = () => {
    let { openSidebar, handleOpen, handleClose, closeSidebar } = useContext(createGlobalContext);

    return <>
        <Navbar />
        <SideBar openSidebar={openSidebar} handleClose={handleClose} closeSidebar={closeSidebar} />
        <FaArrowAltCircleRight className='arrow--right' size={40} onClick={() => handleOpen()} />
        <div className='container'>
            <h1 className='text-center'>Dashboard</h1>
        </div>
    </>
}

export default Dashboard;
