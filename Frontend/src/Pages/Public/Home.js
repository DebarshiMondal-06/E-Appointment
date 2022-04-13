import React from "react";
import Navbar from "../../Components/Navigation/Navbar";
import { BsFillCalendar2EventFill } from 'react-icons/bs'
import { FaHandHoldingMedical } from 'react-icons/fa'
import { RiHospitalFill } from 'react-icons/ri'
import DcotorImage from '../../Components/Images/doctor.png';
import DoctorIcon from '../../Components/Images/doctoricon.png';
import Shield from '../../Components/Images/insurance.png';
import Working from '../../Components/Images/working.png';
import CustomerCare from '../../Components/Images/customerservice.png';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="landing--page">
      <Navbar />
      <section className="first--section">
        <div>
          <h2>Protect Your Health and Take Care of Health</h2>
          <div className="text--qoute">
            <p>Make your next appointment book from anywhere and anytime through our platform.</p>
          </div>
          <article className="tags">
            <h3><BsFillCalendar2EventFill className="icon" size={20} /> &nbsp; Book an Appointment  </h3>
            <h3> <RiHospitalFill size={20} className="icon" /> &nbsp; Find your Nearest Hospital </h3>
            <h3> <FaHandHoldingMedical size={20} className="icon" /> &nbsp; Health Guarantee Forever </h3>
          </article>
          <div className="btns">
            <Link to="/"><button className="btn btn--1 shadow-sm">Book Now</button></Link> &nbsp;&nbsp;
            <Link to="/auth"><button className="btn btn--2 shadow-sm">Get Started</button></Link>
          </div>
        </div>
        <div className="doctor--image">
          <img src={DcotorImage} alt="" />
        </div>
      </section>
      <section className="second--section">
        <h3>Why you should trust us? </h3>
        <main>
          <div className="card shadow-sm">
            <img src={DoctorIcon} alt="" />
            <h5>All Specialist</h5>
            <p className="text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, alias.</p>
          </div>
          <div className="card shadow-sm">
            <img src={Shield} alt="" />
            <h5>Private & Secure</h5>
            <p className="text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, alias.</p>
          </div>
          <div className="card shadow-sm">
            <img src={Working} alt="" />
            <h5>Flexible Booking</h5>
            <p className="text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, alias.</p>
          </div>
          <div className="card shadow-sm">
            <img src={CustomerCare} alt="" />
            <h5>24 * 7 Helpline</h5>
            <p className="text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, alias.</p>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Home;
