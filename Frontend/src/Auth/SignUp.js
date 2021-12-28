import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

const SignUp = () => {
  const [hide, setHide] = useState({
    verify: false,
    password: false,
  });

  return (
    <div className="section--login account" style={{ marginTop: 120 }}>
      <h1>Create Account</h1>
      <p>You are creating account as Patient.</p>
      <form className="login_card">
        <article className="signup--row">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" />
          </div>
        </article>
        <div className="col-8 mt-3">
          <label className="form-label">Email Address</label>
          <input type="email" className="form-control" />
        </div>
        <div className="col-8 mt-3">
          <label className="form-label">Phone Number</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-8 mt-3">
          <label className="form-label">Date of Birth</label>
          <input type="date" className="form-control" />
        </div>
        <div className="col-8 mt-3 password">
          <label className="form-label">Password</label>
          <input
            type={`${hide.password ? "text" : "password"}`}
            className="form-control"
          />
          <span
            onClick={() => setHide({ ...hide, password: !hide.password })}
            className="eye--password"
          >
            <FaEye />
          </span>
        </div>
        <div className="col-8 mt-3 password">
          <label className="form-label">Verify</label>
          <input
            type={`${hide.verify ? "text" : "password"}`}
            className="form-control"
          />
          <span
            onClick={() => setHide({ ...hide, verify: !hide.verify })}
            className="eye--password"
          >
            <FaEye />
          </span>
        </div>
        <div className="col-8 signin--btn">
          <button className="btn">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
