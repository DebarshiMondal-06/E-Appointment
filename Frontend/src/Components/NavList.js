import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const NavList = () => {
  const ContactMe = () => {
    document.getElementById('contact-sect').scrollIntoView({ behavior: 'smooth' });
  };
  const AboutMe = () => {
    document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
  };
  const Project = () => {
    document.getElementById('project-sect').scrollIntoView({ behavior: "smooth" });
  };
  const Home = () => {
    document.getElementById('home-sect').scrollIntoView({ behavior: "smooth" });
  };


  return <ul className="navbar-nav">
    <li className="nav-item">
      <NavLink onClick={Home} activeClassName='menu_active' className="nav--text nav-link" to="/"> Home </NavLink>
    </li>
    <li className="nav-item">
      <NavLink onClick={AboutMe} className="nav--text nav-link" to="/about-section"> About </NavLink>
    </li>
    <li className="nav-item">
      <NavLink onClick={Project} className="nav--text nav-link" to="/project"> Services </NavLink>
    </li>
    <li className="nav-item">
      <NavLink onClick={ContactMe} className="nav--text nav-link" to="/contact"> Contact </NavLink>
    </li>
    <li className='mt-1'>
      <Link to="/auth">
        <button className='signin--button btn'>SignIn</button>
      </Link>
    </li>
  </ul>
};

export default NavList;