import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const SignIn = () => {
  const [value, setValue] = useState({ email: "", password: "" });
  const { email, password } = value;
  const [hide, setHide] = useState(false);


  const authenicate = async () => {
    console.log(email);
    return await new Promise((resolve, reject) => {
      var poolData = {
        UserPoolId: "ap-south-1_P6zGpVmws",
        ClientId: "707b8r1jjimaj4voe30s0u64oo",
      };
      var userPool = new CognitoUserPool(poolData);
      const user = new CognitoUser({
        Username: email,
        Pool: userPool,
      });
      const authDetails = new AuthenticationDetails({
        Password: password,
        Username: email,
      });
      user.authenticateUser(authDetails, {
        onSuccess: (res) => {
          console.log(res);
          // setCookie("auth_Token", res.getIdToken());
          resolve(res);
        },
        onFailure: (err) => {
          console.log(err);
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
          <label className="form-label">Phone or Email Address</label>
          <input value={email} className="form-control"
            onChange={(e) => setValue({ ...value, email: e.target.value })} type="email" />
        </div>
        <div className="col-8 mt-3 password">
          <label className="form-label">Password<Link className="forgot" to="/forgot">Forgot?</Link></label>
          <input value={password} onChange={(e) => setValue({ ...value, password: e.target.value })}
            type={`${hide ? "text" : "password"}`} className="form-control" />
          <span onClick={() => setHide(!hide)} className="eye--password">
            {hide ? <RiEyeFill /> : <RiEyeOffFill />}</span>
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
