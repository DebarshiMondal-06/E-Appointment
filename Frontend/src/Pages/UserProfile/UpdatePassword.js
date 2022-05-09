import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { createAuthContext } from '../../Auth/AuthContext';
import { Inputs } from '../../Components/Inputs/Input';
import { exception_handler } from '../../Utils/Exception';
import { toast } from 'react-toastify';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';


const UpdatePassword = () => {
  const { handleSubmit, formState: { errors }, register } = useForm();
  const { update_password, logout } = useContext(createAuthContext);
  const [btnTxt, setBtnTxt] = useState('Update');
  const [loader, setLoader] = useState(false);


  let updatePass = async (data) => {
    let { current, password, veirfy } = data;
    if (password !== veirfy) return toast.info('Password not match');
    setLoader(true);
    await update_password(current, password).then(() => {
      toast.success('Password Updated!');
      setLoader(false);
      setBtnTxt('Redirecting...');
      setTimeout(() => {
        logout();
      }, 2000);
    }).catch(err => {
      setLoader(false);
      err = err && JSON.parse(err);
      toast.error(exception_handler(err.code))
    });
  };



  return <form className='password--form' onSubmit={handleSubmit(updatePass)}>
    <section className='row'>
      {<Inputs errors={errors} register={register} name1={'Current Password'} register1={'current'} />}
      {<Inputs errors={errors} register={register} name1={'New Password'} register1={'password'}
        pattern1={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/}
        message1={'Ateast contain 1 upper, 1 lower, 1 digit, 1 special & 8 char'} />}
      {<Inputs errors={errors} register={register} name1={'Verify Password'} register1={'veirfy'} />}
    </section>
    <button className='btn update--btn'>
      {loader ? <ProcessSpinner size={20} border={'3px'} /> : btnTxt}
    </button>
  </form>
}

export default UpdatePassword