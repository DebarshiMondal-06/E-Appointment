import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

const SignIn = () => {
  const [value, setValue] = useState({ email: "", password: "" });
  const { email, password } = value;

  var poolData = {
    UserPoolId: "ap-south-1_ODkATGGHL", 
    ClientId: "2c1793ve4nmbq5jj1t2hjkf08s",
  };

  const authenicate = async () => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: poolData,
      });
      const authDetails = new AuthenticationDetails({
        Password: password,
        Username: email,
      });
      user.authenticateUser(authDetails, {
        onSuccess: (res) => {
          // setCookie("auth_Token", res.getIdToken());
          resolve(res);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  };

  return (
    <div className="section--login">
      <h1>Welcome Back!</h1>
      <p>SignIn with your registered account!</p>
      <form className="login_card">
        <div className="col-8">
          <label className="form-label">Username or Email Address</label>
          <input
            value={email}
            onChange={(e) => setValue({ ...value, email: e.target.value })}
            type="email"
            className="form-control"
          />
        </div>
        <div className="col-8 mt-3">
          <label className="form-label">
            Password
            <Link className="forgot" to="/forgot">
              Forgot?
            </Link>
          </label>
          <input
            value={password}
            onChange={(e) => setValue({ ...value, password: e.target.value })}
            type="password"
            className="form-control"
          />
        </div>
        <div className="col-8 signin--btn" onClick={() => authenicate()}>
          <button type="button" className="btn">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
