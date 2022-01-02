import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ToastContainer autoClose="2500" position="bottom-right" />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
