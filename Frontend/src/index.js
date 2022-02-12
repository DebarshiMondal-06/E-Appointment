import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from "./Utils/GlobalContext";
import { AuthContext } from "./Auth/AuthContext";
import Footer from "./Components/Footer";


ReactDOM.render(
  <GlobalContext>
    <AuthContext>
      <Router>
        <ToastContainer autoClose="2500" position="bottom-right" />
        <App />
        <Footer />
      </Router>
    </AuthContext>
  </GlobalContext>,
  document.getElementById("root")
);
