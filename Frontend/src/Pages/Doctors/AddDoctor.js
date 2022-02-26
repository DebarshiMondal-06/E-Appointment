import React, { useContext, useState } from 'react';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Inputs from '../../Components/Inputs/Input';
import SelectBox from '../../Components/Inputs/SelectBox';
import { district_data, state_data, doctor_speacility } from '../../Utils/data';
import { createAuthContext } from '../../Auth/AuthContext';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';
import { toast } from 'react-toastify';
import { exception_handler } from '../../Utils/Exception';


const AddDoctor = () => {
  const { sign_up } = useContext(createAuthContext);
  const { handleSubmit, formState: { errors }, register, watch, setValue } = useForm();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  let getState = watch('state');
  if (!getState) setValue('district', null);


  const submit_data = (data) => {
    setLoader(true);
    let { emailid, password, firstname, lastname, district } = data;
    let { pincode } = district_data.find((items) => items.district === district);
    data.fullname = firstname + " " + lastname;
    data.pincode = pincode;
    sign_up({ username: emailid, password, isAdminApprove: 1, user_role: 'doctor', data_items: data }).then(() => {
      setLoader(false);
      toast.success('Added Successfully!');
      setTimeout(() => {
        navigate('/dashboard/doctors');
      }, 1500)
    }).catch((err) => {
      setLoader(false);
      toast.error(exception_handler(err));
    })
  };


  return <div>
    <h4><Link to="/dashboard/doctors"><HiOutlineArrowNarrowLeft className="back--icon" /></Link>  &nbsp;
      <center>Add Doctors</center>
    </h4>
    <main className='add--doctor--section'>
      <form className="doctors--add--form card shadow-sm" onSubmit={handleSubmit(submit_data)}>
        <section className='row'>
          {<Inputs errors={errors} register={register} name1={'First Name'} register1={'firstname'} />}
          {<Inputs errors={errors} register={register} name1={'Last Name'} register1={'lastname'} />}
        </section>

        <section className='row'>
          {<Inputs errors={errors} register={register} name1={'Email Address'} register1={'emailid'}
            pattern1={/\S+@\S+\.\S+/} message1={'Not a valid Email'} />}
          {<Inputs errors={errors} register={register} name1={'Contact'} register1={'phone'}
            pattern1={/^[0-9]{10}$/} message1={'Not a valid Contact'} />}
        </section>

        <section className="row">
          {<Inputs errors={errors} register={register} name1={'DOB'} register1={'dob'} type={'date'} />}
          {<SelectBox errors={errors} register={register} name1={'Speciality'} register1={'speciality'}
            data={[doctor_speacility, 'type']} />}
        </section>


        <section className="row">
          {<SelectBox errors={errors} register={register} name1={'State'} register1={'given_state'}
            data={[state_data, 'state']} />}
          {<SelectBox errors={errors} register={register} name1={'District'} register1={'district'}
            data={[district_data, 'district']} message={!getState ? 'Choose State First' : null} />}
        </section>

        <section className='row'>
          {<Inputs errors={errors} register={register} name1={'Password'} register1={'password'} />}
          {<Inputs errors={errors} register={register} name1={'Verify Password'} register1={'confirmpass'} />}
        </section>

        <div className='btns--operate'>
          <Link to="/dashboard/doctors"><button className='btn btn--cancel'>Cancel</button></Link>
          <button className='btn btn--add'>{loader ? <ProcessSpinner padding={'4px 20px'} /> : 'Add'}</button>
        </div>
      </form>
    </main>
  </div>;
};

export default AddDoctor;
