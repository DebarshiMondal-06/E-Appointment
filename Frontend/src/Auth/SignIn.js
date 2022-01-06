import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import ProcessSpinner from "../Components/Spinners/ProcessSpinner";
import { createAuthContext } from "./AuthContext";
import { exception_handler } from "../Exception";
import { useForm } from 'react-hook-form';



const SignIn = () => {
  const { sign_in } = useContext(createAuthContext);
  const [hide, setHide] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const { formState: { errors }, register, handleSubmit } = useForm();


  const authenicate = (data) => {
    setLoader(true);
    sign_in(data.email, data.password).then((el) => {
      setLoader(false);
      console.log(el);
      navigate('/dashboard');
    }).catch((err) => {
      toast.error(exception_handler(err && err.code));
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
          <input {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} type="email"
            className={`form-control ${errors.email ? 'border border-danger' : null}`} />
        </div>
        <div className="col-8 mt-3 password">
          <label className="form-label">Password<Link className="forgot" to="/forgot">Forgot?</Link></label>
          <input {...register("password", { required: true })} type={`${hide ? "text" : "password"}`}
            className={`form-control ${errors.email ? 'border border-danger' : null}`} />
          <span onClick={() => setHide(!hide)} className="eye--password">
            {hide ? <RiEyeFill /> : <RiEyeOffFill />}
          </span>
        </div>
        <div className="col-8 signin--btn" onClick={handleSubmit(authenicate)}>
          <button type="button" className="btn">
            {loader ? <ProcessSpinner /> : 'Sign In'}
          </button>
        </div>
      </form>
      <br></br><br></br>
      <p>{Object.values(errors).some(val => val) ? <span className="text-danger">All feilds are required!</span> : null}</p>
      <p>{errors.email?.type === 'pattern' ? <span className="text-danger"> <b>Email:</b> Must be a Valid Email</span> : null}</p>
    </div>
  );
};

export default SignIn;
