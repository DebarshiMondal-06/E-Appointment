import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="section--login">
      <h1>Welcome Back!</h1>
      <p>SignIn with your registered account!</p>
      <form className="login_card">
        <div className="col-8">
          <label className="form-label">Username or Email Address</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-8 mt-3">
          <label className="form-label">
            Password
            <Link className="forgot" to="/forgot">
              Forgot?
            </Link>
          </label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-8 signin--btn">
          <button className="btn">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
