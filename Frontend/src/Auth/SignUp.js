import React, { useContext, useEffect, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { createAuthContext } from "./AuthContext";
import { exception_handler } from "../Utils/Exception";
import { toast } from "react-toastify";
import ProcessSpinner from "../Components/Spinners/ProcessSpinner";
import { useForm } from 'react-hook-form';
import '../index.css';
import Input from "../Components/Inputs/Input";



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
    data.fullname = firstname + " " + lastname;
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
        {<Input col="8" errors={errors} register={register} name1={'First Name'} register1={'firstname'} />}
        {<Input col="8" errors={errors} register={register} name1={'Last Name'} register1={'lastname'} />}

        {<Input col="8" errors={errors} register={register} name1={'Email Address'} register1={'username'}
          pattern1={/\S+@\S+\.\S+/} message1={'Not a valid Email'} />}
        {<Input col="8" errors={errors} register={register} name1={'Phone'} register1={'phone'}
          pattern1={/^[0-9]{10}$/} message1={'Not a valid Phone no'} />}

        {<Input col="8" errors={errors} register={register} name1={'DOB'} register1={'dob'} type={'date'} />}


        <div className="col-8 mb-4 password">
          <label className="form-label">Password</label>
          <input {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })}
            type={`${hide.password ? "text" : "password"}`} className="form-control" />
          <p className="error--lines">{errors.password ? errors.password?.type === 'pattern'
            ? <span className="text-danger"> Ateast contain 1 upper, 1 lower, 1 digit, 1 special & 8 char</span>
            : <span className="text-danger">This field is required!</span> : null}</p>
          <span onClick={() => setHide({ ...hide, password: !hide.password })} className="eye--password">
            {hide.password ? <RiEyeFill /> : <RiEyeOffFill />}
          </span>
        </div>
        <div className="col-8 mb-4 password">
          <label className="form-label">Verify</label>
          <input type={`${hide.verify ? "text" : "password"}`} {...register("verify", { required: true })}
            className="form-control" />
          {confirmPass ? <p className="error--lines"> <span className="text-danger"> Password didn't match</span></p> : null}
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
    </div>
  );
};

export default SignUp;
