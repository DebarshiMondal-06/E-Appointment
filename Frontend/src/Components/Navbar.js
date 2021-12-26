import React from "react";
import NavList from "./NavList";
import './component.css';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="brand navbar-brand" href="#">
          E-appointment
        </a>
        <button
          className="toggler navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="nav--items collapse navbar-collapse" id="navbarSupportedContent">
          <NavList />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
