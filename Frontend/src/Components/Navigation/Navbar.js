import React from "react";
import NavList from "./NavList";
import "../component.css";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
      <div className="container-fluid">
        <Link className="brand navbar-brand" to="/">
          E-appointment
        </Link >
        <button
          className="toggler navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
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
