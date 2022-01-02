import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./LandingView/Home";
import Auth from "./Auth/Auth";
import Dashboard from "./Pages/Dashboard";



const App = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route index element={<Auth />} path="/auth" />
      <Route index element={<Dashboard />} path="/dashboard" />
    </Routes>
  );
};

export default App;
