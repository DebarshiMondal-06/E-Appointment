import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import ProcessSpinner from "../Components/Spinners/ProcessSpinner";
import { createAuthContext } from "./AuthContext";
import { exception_handler } from "../Utils/Exception";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";



const SignIn = () => {
  const { sign_in, verify_modal, resetCode } = useContext(createAuthContext);
  const [hide, setHide] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [needVerify, setNeedVerify] = useState(false);
  const [, setCookie] = useCookies();



  const { formState: { errors }, register, handleSubmit } = useForm();


  const authenicate = (data) => {
    setLoader(true);
    sign_in(data.email, data.password).then((result) => {
      let { name, user_role, email } = result;
      setLoader(false);
      setCookie('user_data', JSON.stringify({ email, name, user_role }), { path: '/' });
      navigate('/dashboard');
    }).catch((err) => {
      if (err.code === 'UserNotConfirmedException') setNeedVerify(true);
      toast.error(exception_handler(err.code));
      setLoader(false);
    });
  };

  const verify_email = async () => {
    return Swal.fire({
      title: 'Type Email',
      input: 'email',
      inputLabel: 'Enter your registered email ID',
      inputPlaceholder: 'Enter email Id here',
      confirmButtonColor: '#00bfa6',
      confirmButtonText: 'Proceed',
      allowOutsideClick: false,
      showCancelButton: true,
      preConfirm: (value) => {
        return resetCode(value).catch(() => Swal.showValidationMessage('Something Went Wrong!'));
      }
    }).then(async (val) => {
      if (val.isConfirmed) await verify_modal(val.value).then(() => {
        toast.info('SignIn to Continue!');
      });
      else Swal.close();
    });
  }


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
        {needVerify ? <p className="mt-3">Seems! You haven't Verified <Link onClick={() => verify_email()}
          to="#!"> &nbsp; Wanna Verify?</Link> </p> : null}
      </form>
      <br></br><br></br>
      <p>{Object.values(errors).some(val => val) ? <span className="text-danger">All feilds must be valid!</span> : null}</p>
      <p>{errors.email?.type === 'pattern' ? <span className="text-danger"> <b>Email:</b> Must be a Valid Email</span> : null}</p>
    </div>
  );
};

export default SignIn;
