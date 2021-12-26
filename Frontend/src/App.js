import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./LandingView/Home";
import Auth from "./Auth/Auth";



const App = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route index element={<Auth />} path="/auth" />
    </Routes>
  );
};

export default App;
