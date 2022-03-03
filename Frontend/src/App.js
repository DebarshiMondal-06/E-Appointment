import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./LandingView/Home";
import Auth from "./Auth/Auth";
import Dashboard from "./Pages/Dashboard";
import { SignInAuth, ProtectAuth, ProtectAdminDoctor, ProtectAdmin } from "./Utils/ProtectedRoutes";
import Error from "./Pages/Error";
import "./index.css";
import { useContext } from "react";
import { createGlobalContext } from "./Utils/GlobalContext";
import Footer from './Components/Footer';


const App = () => {
  const { loader } = useContext(createGlobalContext);

  return <>
    <Routes>
      <Route element={<Home />} path="/" />
      <Route index element={<SignInAuth><Auth /></SignInAuth>} path="/auth" />
      <Route index element={<SignInAuth><Auth /></SignInAuth>} path="/forgot" />
      <Route index element={<ProtectAuth><Dashboard /></ProtectAuth>} path="/dashboard" />
      <Route element={<ProtectAdmin><Dashboard /></ProtectAdmin>} path="/dashboard/doctors" />
      <Route element={<ProtectAdmin><Dashboard /></ProtectAdmin>} path="/dashboard/doctors_add" />
      <Route element={<ProtectAdmin><Dashboard /></ProtectAdmin>} path="/dashboard/doctors_edit" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/hospital" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/hospital_add" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/patients" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/patients_add" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/pending" />
      <Route element={<ProtectAuth><Dashboard /></ProtectAuth>} path="/dashboard/profile" />
      <Route element={<Error />} path="*" />
    </Routes>
    {loader ? null : <Footer />}
  </>
};

export default App;
