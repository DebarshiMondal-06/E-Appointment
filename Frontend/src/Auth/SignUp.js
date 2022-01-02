import { CognitoUser, CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js";
import React, { useContext, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import '../index.css';
import Swal from 'sweetalert2';
import ProcessSpinner from "../Components/Spinners/ProcessSpinner";
import { createAuthContext } from "./AuthContext";


const SignUp = () => {
  const { sign_up } = useContext(createAuthContext);
  const [hide, setHide] = useState({
    verify: false,
    password: false,
  });
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState({
    username: '', password: '', phone: '', dob: '', verify: '', firstname: '', lastname: ''
  });
  const { username, password, verify, firstname, lastname, phone, dob } = value;






  const execute = () => {
    setLoader(true);
    sign_up(username, password, phone, firstname, lastname, dob).then(() => {
      setLoader(false);
      setValue({ username: '', password: '', phone: '', dob: '', verify: '', firstname: '', lastname: '' });
    }).catch((err) => {
      console.log(err);
    })
  };




  return (
    <div className="section--login account" style={{ margin: '100px 0px' }}>
      <h1>Create Account</h1>
      <p>You are creating account as Patient.</p>
      <form className="login_card">
        <div className="col-8">
          <label className="form-label">First Name</label>
          <input value={firstname} onChange={(e) => setValue({ ...value, firstname: e.target.value })}
            type="text" className="form-control" />
        </div>
        <div className="col-8 mt-3">
          <label className="form-label">Last Name</label>
          <input value={lastname} onChange={(e) => setValue({ ...value, lastname: e.target.value })}
            type="text" className="form-control" />
        </div>
        <div className="col-8 mt-3">
          <label className="form-label">Email Address</label>
          <input value={username} onChange={(e) => setValue({ ...value, username: e.target.value })}
            type="email" className="form-control" />
        </div>
        <div className="col-8 mt-3">
          <label className="form-label">Phone Number</label>
          <input value={phone} onChange={(e) => setValue({ ...value, phone: e.target.value })}
            type="text" className="form-control" />
        </div>
        <div className="col-8 mt-3">
          <label className="form-label">Date of Birth</label>
          <input value={dob} onChange={(e) => setValue({ ...value, dob: e.target.value })}
            type="date" className="form-control" />
        </div>
        <div className="col-8 mt-3 password">
          <label className="form-label">Password</label>
          <input value={password} onChange={(e) => setValue({ ...value, password: e.target.value })}
            type={`${hide.password ? "text" : "password"}`} className="form-control" />
          <span onClick={() => setHide({ ...hide, password: !hide.password })} className="eye--password">
            {hide.password ? <RiEyeFill /> : <RiEyeOffFill />}
          </span>
        </div>
        <div className="col-8 mt-3 password">
          <label className="form-label">Verify</label>
          <input value={verify} onChange={(e) => setValue({ ...value, verify: e.target.value })}
            type={`${hide.verify ? "text" : "password"}`} className="form-control" />
          <span onClick={() => setHide({ ...hide, verify: !hide.verify })}
            className="eye--password">{hide.verify ? <RiEyeFill /> : <RiEyeOffFill />}
          </span>
        </div>
        <div className="col-8 signin--btn" onClick={() => execute()}>
          <button type="button" className="btn">
            {loader ? <ProcessSpinner /> : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
