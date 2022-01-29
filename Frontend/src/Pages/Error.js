import React from "react";
import { useNavigate } from "react-router-dom";
import Notfound from "../Components/Images/404.png";

const Error = () => {
  const navigate = useNavigate();

  return (
    <section className="error--section container">
      <div style={{ margin: "10% 0px" }}>
        <h2>Oops! seems Nothing found here.</h2>
        <img src={Notfound} width="200" height="200" alt="" className="mb-4" />
        <div className="error--btn">
          <button onClick={() => navigate("/")} className="btn ">
            Proceed to home
          </button>
        </div>
      </div>
    </section>
  );
};

export default Error;
