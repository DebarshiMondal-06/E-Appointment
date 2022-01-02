import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import ProcessSpinner from "../Components/Spinners/ProcessSpinner";
import { createAuthContext } from "./AuthContext";


const SignIn = () => {
  const { sign_in } = useContext(createAuthContext);
  const [value, setValue] = useState({ email: "", password: "" });
  const [hide, setHide] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { email, password } = value;


  const authenicate = () => {
    setLoader(true);
    sign_in(email, password).then((el) => {
      setLoader(false);
      console.log(el);
      navigate('/dashboard');
    }).catch((err) => {
      toast.error(err && err.message);
      setLoader(false);
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
            {loader ? <ProcessSpinner /> : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
