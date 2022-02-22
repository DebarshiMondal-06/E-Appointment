import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./LandingView/Home";
import Auth from "./Auth/Auth";
import Dashboard from "./Pages/Dashboard";
import { SignInAuth, ProtectAuth, ProtectAdminDoctor, ProtectAdmin } from "./Utils/ProtectedRoutes";
import Error from "./Pages/Error";
import "./index.css";



const App = () => {


  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route index element={<SignInAuth><Auth /></SignInAuth>} path="/auth" />
      <Route index element={<SignInAuth><Auth /></SignInAuth>} path="/forgot" />
      <Route index element={<ProtectAuth><Dashboard /></ProtectAuth>} path="/dashboard" />
      <Route element={<ProtectAdmin><Dashboard /></ProtectAdmin>} path="/dashboard/doctors" />
      <Route element={<ProtectAdmin><Dashboard /></ProtectAdmin>} path="/dashboard/doctors_add" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/patients" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/patients_add" />
      <Route element={<ProtectAdminDoctor><Dashboard /></ProtectAdminDoctor>} path="/dashboard/pending" />
      <Route element={<ProtectAuth><Dashboard /></ProtectAuth>} path="/dashboard/profile" />
      <Route element={<Error />} path="*" />
    </Routes>
  );
};

export default App;
