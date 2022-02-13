import React, { useContext, useEffect, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { createAuthContext } from "./AuthContext";
import { exception_handler } from "../Utils/Exception";
import { toast } from "react-toastify";
import ProcessSpinner from "../Components/Spinners/ProcessSpinner";
import { useForm } from 'react-hook-form';
import '../index.css';



const SignUp = () => {
  const { sign_up } = useContext(createAuthContext);
  const [btnTxt, setBtnTxt] = useState('Sign Up');
  const [hide, setHide] = useState({ verify: false, password: false });
  const [loader, setLoader] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);
  const { register, formState: { errors }, handleSubmit, watch } = useForm();




  const execute = (data) => {
    setLoader(true);
    let { firstname, lastname, password, username } = data;
    data.name = firstname + " " + lastname;
    sign_up({ username, password, user_role: "patient", isAdminApprove: 0, data_items: data }).then(() => {
      setLoader(false);
      toast.success('Account Registered!');
      setBtnTxt('Redirecting...');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }).catch((err) => {
      toast.error(exception_handler(err.code));
      setLoader(false);
    });
  };

  const password_org = watch('password');
  const confirm_pass = watch('verify');
  useEffect(() => {
    if (password_org && confirm_pass && password_org !== confirm_pass) {
      setConfirmPass(true);
    } else {
      setConfirmPass(false);
    }
  }, [confirm_pass, password_org]);



  return (
    <div className="section--login account" style={{ margin: '180px 0px' }}>
      <h1>Create Account</h1>
      <p>You are creating account as Patient.</p>
      <form className="login_card">
        <div className="col-8">
          <label className="form-label">First Name</label>
          <input {...register("firstname", { required: true })} type="text"
            className={`form-control ${errors.firstname ? 'border border-danger' : null}`} />
        </div>
        <div className="col-8 mt-3">
          <label className="form-label">Last Name</label>
          <input {...register("lastname", { required: true })} type="text"
            className={`form-control ${errors.lastname ? 'border border-danger' : null}`} />
        </div>
        <div className="col-8 mt-3">
          <label className="form-label">Email Address</label>
          <input {...register("username", { required: true, pattern: /\S+@\S+\.\S+/ })} type="email"
            className={`form-control ${errors.username ? 'border border-danger' : null}`} />
        </div>
        <div className="col-8 mt-3">
          <label className="form-label">Phone Number</label>
          <input {...register("phone", { required: true, pattern: /^\+[1-9]{1}[0-9]{3,14}$/ })} type="text"
            className={`form-control ${errors.phone ? 'border border-danger' : null}`} />
        </div>
        <div className="col-8 mt-3">
          <label className="form-label">Date of Birth</label>
          <input {...register("dob", { required: true })} type="date"
            className={`form-control ${errors.dob ? 'border border-danger' : null}`} />
        </div>
        <div className="col-8 mt-3 password">
          <label className="form-label">Password</label>
          <input {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })}
            type={`${hide.password ? "text" : "password"}`} className={`form-control ${errors.password ? 'border border-danger' : null}`} />
          <span onClick={() => setHide({ ...hide, password: !hide.password })} className="eye--password">
            {hide.password ? <RiEyeFill /> : <RiEyeOffFill />}
          </span>
        </div>
        <div className="col-8 mt-3 password">
          <label className="form-label">Verify</label>
          <input type={`${hide.verify ? "text" : "password"}`} {...register("verify", { required: true })}
            className={`form-control ${errors.verify && !confirmPass ? 'border border-danger' : null}`} />
          <span onClick={() => setHide({ ...hide, verify: !hide.verify })}
            className="eye--password">{hide.verify ? <RiEyeFill /> : <RiEyeOffFill />}
          </span>
        </div>
        <div className="col-8 signin--btn" onClick={!confirmPass ? handleSubmit(execute) : null}>
          <button type="button" className="btn">
            {loader ? <ProcessSpinner /> : btnTxt}
          </button>
        </div>
      </form>
      <br></br>
      <p>{Object.values(errors).some(val => val) ? <span className="text-danger">All feilds are required!</span> : null}</p>
      <p>{errors.password?.type === 'pattern' ? <span className="text-danger"> <b>Password:</b> Ateast contain 1 upper, 1 lower, 1 digit, 1 special & 8 char</span> : null}</p>
      <p>{errors.username?.type === 'pattern' ? <span className="text-danger"> <b>Email:</b> Must be a Valid Email</span> : null}</p>
      <p>{errors.phone?.type === 'pattern' ? <span className="text-danger"> <b>Phone:</b> Must be a Valid Phone Number.</span> : null}</p>
      <p>{confirmPass ? <span className="text-danger"> <b>Verify:</b> Password didn't matches</span> : null}</p>
    </div>
  );
};

export default SignUp;
