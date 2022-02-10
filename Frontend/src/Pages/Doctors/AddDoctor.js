import React from 'react';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Inputs from '../../Components/Inputs/Input';
import SelectBox from '../../Components/Inputs/SelectBox';

const AddDoctor = () => {

  const { handleSubmit, formState: { errors }, register } = useForm();


  const submit_data = () => {

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
          {<Inputs errors={errors} register={register} name1={'Contact'} register1={'contactno'}
            pattern1={/^[0-9]{10}$/} message1={'Not a valid Contact'} />}
        </section>

        <section className="row">
          {<Inputs errors={errors} register={register} name1={'DOB'} register1={'dob'} type={'date'} />}
          {<SelectBox errors={errors} register={register} name1={'Specality'} register1={'Specality'} />}
        </section>


        <section className="row">
          {<SelectBox errors={errors} register={register} name1={'Pincode'} register1={'pincode'} />}
          {<SelectBox errors={errors} register={register} name1={'District'} register1={'district'} />}
        </section>

        <section className='row'>
          {<Inputs errors={errors} register={register} name1={'Password'} register1={'password'} />}
          {<Inputs errors={errors} register={register} name1={'Verify Password'} register1={'confirmpass'} />}
        </section>


        <div className='btns--operate'>
          <button className='btn btn--cancel'>Cancel</button>
          <button className='btn btn--add'>Add</button>
        </div>
      </form>
    </main>
  </div>;
};

export default AddDoctor;
