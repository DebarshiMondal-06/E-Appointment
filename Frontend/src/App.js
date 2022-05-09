import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./Auth/Auth";
import Dashboard from "./Pages/Dashboard";
import { SignInAuth, ProtectAuth, ProtectAdminDoctor, ProtectAdmin, ProtectPatient } from "./Utils/ProtectedRoutes";
import Error from "./Pages/Error";
import "./index.css";
import { useContext } from "react";
import { createGlobalContext } from "./Utils/GlobalContext";
import Footer from './Components/Footer';
import Services from "./Pages/Public/Services";
import Contact from "./Pages/Public/Contact";
import About from "./Pages/Public/About";
import Home from "./Pages/Public/Home";


const App = () => {
  const { loader } = useContext(createGlobalContext);
  return <>
    <Routes>
      {/* Auth routes... */}
      <Route index element={<SignInAuth><Auth /></SignInAuth>} path="/auth" />
      <Route index element={<SignInAuth><Auth /></SignInAuth>} path="/forgot" />
      <Route index element={<ProtectAuth><Dashboard /></ProtectAuth>} path="/dashboard" />
      <Route element={<ProtectAuth><Dashboard /></ProtectAuth>} path="/dashboard/profile" />

      {/* Admin routes... */}
      <Route element={<ProtectAdmin><Dashboard /></ProtectAdmin>} path="/dashboard/doctors" />
      <Route element={<ProtectAdmin><Dashboard /></ProtectAdmin>} path="/dashboard/doctors_add" />
      <Route element={<ProtectAdmin><Dashboard /></ProtectAdmin>} path="/dashboard/doctors_edit" />

      {/* AdminDoctor routes... */}
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/hospital" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/hospital_add" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/hospital_edit" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/patients" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/patients_add" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/pending" />

      {/* Patient routes... */}
      <Route element={<ProtectPatient><Dashboard /></ProtectPatient>} path="/dashboard/book" />
      <Route element={<ProtectPatient><Dashboard /></ProtectPatient>} path="/dashboard/book_edit" />
      <Route element={<ProtectPatient><Dashboard /></ProtectPatient>} path="/dashboard/appointments" />

      {/* Public routes... */}
      <Route element={<Home />} path="/" />
      <Route element={<About />} path="/about" />
      <Route element={<Services />} path="/services" />
      <Route element={<Contact />} path="/contact" />
      <Route element={<Error />} path="*" />
    </Routes>
    {loader ? null : <Footer />}
  </>
};

export default App;
