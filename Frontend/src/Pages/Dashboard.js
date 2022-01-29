import React, { useContext } from 'react'
import Navbar from '../Components/Navigation/Navbar';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import './pages.css';
import SideBar from '../Components/Navigation/SideBar';
import { createGlobalContext } from '../Utils/GlobalContext';


const Dashboard = () => {
    let { openSidebar, setOpenSidebar } = useContext(createGlobalContext);

    return <>
        <Navbar />
        {openSidebar ? <SideBar setOpenSidebar={setOpenSidebar} /> : null}
        <FaArrowAltCircleRight className='arrow--right' size={40} onClick={() => setOpenSidebar(!openSidebar)} />
        <div className='container'>
            <h1 className='text-center'>Dashboard</h1>
        </div>
    </>
}

export default Dashboard;
