import React from "react";
import Navbar from "../Components/Navigation/Navbar";
import { BsFillCalendar2EventFill } from 'react-icons/bs'
import { FaHandHoldingMedical } from 'react-icons/fa'
import { RiHospitalFill } from 'react-icons/ri'
import DcotorImage from '../Components/Images/doctor.png';


const Home = () => {
  return (
    <div className="landing--page">
      <Navbar />

      <section className="first--section">
        <div>
          <h2>Protect Your Health and Take Care of Health</h2>
          <article className="tags">
            <p><BsFillCalendar2EventFill size={20} /> Book An Appointment</p>
            <p> <RiHospitalFill size={20} /> Find Your Nearest Hospital</p>
            <p> <FaHandHoldingMedical size={20} /> Best Doctors</p>
          </article>
          <button className="btn">Book Now</button>
        </div>
        <div className="doctor--image">
          <img src={DcotorImage} alt="" />
        </div>
      </section>


    </div>
  );
};

export default Home;
