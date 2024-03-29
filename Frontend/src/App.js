import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./Auth/Auth";
import Dashboard from "./Pages/Dashboard";
import { SignInAuth, ProtectAuth, ProtectAdminDoctor, ProtectAdmin, ProtectDoctor } from "./Utils/ProtectedRoutes";
import Error from "./Pages/Error";
import "./index.css";
import { useContext } from "react";
import { createGlobalContext } from "./Utils/GlobalContext";
import Footer from './Components/Footer/Footer';
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
      <Route element={<ProtectAuth><Dashboard /></ProtectAuth>} path="/dashboard/book" />
      <Route element={<ProtectAuth><Dashboard /></ProtectAuth>} path="/dashboard/book_edit" />
      <Route element={<ProtectAuth><Dashboard /></ProtectAuth>} path="/dashboard/appointments" />
      <Route element={<ProtectAuth><Dashboard /></ProtectAuth>} path="/dashboard/feedback" />
      <Route element={<ProtectAuth><Dashboard /></ProtectAuth>} path="/dashboard/advance" />


      {/* Admin routes... */}
      <Route element={<ProtectAdmin><Dashboard /></ProtectAdmin>} path="/dashboard/doctors" />
      <Route element={<ProtectAdmin><Dashboard /></ProtectAdmin>} path="/dashboard/doctors_add" />
      <Route element={<ProtectAdmin><Dashboard /></ProtectAdmin>} path="/dashboard/doctors_edit" />
      <Route element={<ProtectAdmin><Dashboard /></ProtectAdmin>} path="/dashboard/patients" />
      <Route element={<ProtectAdmin><Dashboard /></ProtectAdmin>} path="/dashboard/patients_add" />


      {/* AdminDoctor routes... */}
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/hospital" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/hospital_add" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/hospital_edit" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/pending" />

      {/* Doctor routes... */}
      <Route element={<ProtectDoctor><Dashboard /></ProtectDoctor>} path="/dashboard/patients_appointed" />


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
