import React, { useState } from 'react';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Inputs from '../../Components/Inputs/Input';
import SelectBox from '../../Components/Inputs/SelectBox';
import { district_data, state_data, doctor_speacility } from '../../Utils/data';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';
import { toast } from 'react-toastify';
import { exception_handler } from '../../Utils/Exception';
import { sendData } from '../../Utils/API';
import random from 'randomstring';


const AddHospital = () => {
  const { handleSubmit, formState: { errors }, register, watch, setValue } = useForm();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  let getState = watch('state');
  if (!getState) setValue('district', null);


  const submit_data = (data) => {
    setLoader(true);
    let { pincode } = district_data.find((items) => items.district === data.district);
    data.hospitalId = `E-${random.generate({ length: 7, capitalization: "uppercase" })}`;
    sendData('/hospital/add', 'POST', { ...data, pincode }).then(() => {
      toast.success('Added Successfully!');
      setLoader(false);
      setTimeout(() => {
        navigate('/dashboard/hospital');
      }, 2000);
    }).catch((err) => {
      setLoader(false);
      toast.error(exception_handler(err));
    })
  };



  return <div>
    <h4><Link to="/dashboard/hospital"><HiOutlineArrowNarrowLeft className="back--icon" /></Link>  &nbsp;
      <center>Add Hospitals</center>
    </h4>
    <main className='add--doctor--section'>
      <form className="doctors--add--form card shadow-sm" onSubmit={handleSubmit(submit_data)}>
        <section className='row'>
          {<Inputs errors={errors} register={register} name1={'Hospital Name'} register1={'name'} />}
          {<Inputs errors={errors} register={register} name1={'Contact'} register1={'contact'}
            pattern1={/^[0-9]{10}$/} message1={'Not a valid Contact'} />}
        </section>

        <section className="row">
          {<SelectBox errors={errors} register={register} name1={'Speciality'} register1={'speciality'}
            data={[doctor_speacility, 'type']} />}
          {<SelectBox errors={errors} register={register} name1={'State'} register1={'state'}
            data={[state_data, 'state']} />}
        </section>

        <section className="row">
          {<SelectBox errors={errors} register={register} name1={'District'} register1={'district'}
            data={[district_data, 'district']} message={''} />}
          {<Inputs errors={errors} register={register} name1={'Address'} register1={'address'} />}
        </section>

        <div className='btns--operate'>
          <Link to="/dashboard/hospital"><button className='btn btn--cancel'>Cancel</button></Link>
          <button className='btn btn--add'> {loader ? <ProcessSpinner padding={'4px 20px'} /> : 'Add'}</button>
        </div>
      </form>
    </main>
  </div>;
};

export default AddHospital;
