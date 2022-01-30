import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./LandingView/Home";
import Auth from "./Auth/Auth";
import Dashboard from "./Pages/Dashboard";
import { SignInAuth, ProtectAuth } from "./Utils/ProtectedRoutes";
import Error from "./Pages/Error";
import "./index.css";



const App = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route index element={<SignInAuth><Auth /></SignInAuth>} path="/auth" />
      <Route index element={<SignInAuth><Auth /></SignInAuth>} path="/forgot" />
      <Route index element={<ProtectAuth><Dashboard /></ProtectAuth>} path="/dashboard" />
      <Route element={<Error />} path="*" />
    </Routes>
  );
};

export default App;
