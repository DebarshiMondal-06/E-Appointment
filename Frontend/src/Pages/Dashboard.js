import React, { useContext } from 'react'
import Navbar from '../Components/Navigation/Navbar';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import SideBar from '../Components/Navigation/SideBar';
import { createGlobalContext } from '../Utils/GlobalContext';
import "./pages.css";
import Paths from './Paths';


const Dashboard = () => {
    let { openSidebar, handleOpen, handleClose, closeSidebar } = useContext(createGlobalContext);

    return <>
        <SideBar openSidebar={openSidebar} handleClose={handleClose} closeSidebar={closeSidebar} />
        <section className={`${openSidebar ? 'opacity--reduce' : null}`}>
            <Navbar />
            <FaArrowAltCircleRight className='arrow--right' size={40} onClick={() => handleOpen()} />
            <div className='dashboard--container container'>
                <Paths />
            </div>
        </section>
    </>
}

export default Dashboard;
