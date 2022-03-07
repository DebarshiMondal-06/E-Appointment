import React, { useContext, useState } from 'react';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Inputs from '../../Components/Inputs/Input';
import SelectBox from '../../Components/Inputs/SelectBox';
import { district_data, state_data, doctor_speacility } from '../../Utils/data';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';
import { toast } from 'react-toastify';
import { exception_handler } from '../../Utils/Exception';
import { sendData } from '../../Utils/API';
import random from 'randomstring';
import { createGlobalContext } from '../../Utils/GlobalContext';


const AddHospital = () => {
  const { handleSubmit, formState: { errors }, register, watch, setValue } = useForm();
  const { viewData } = useContext(createGlobalContext);
  const { fullname, address, contact, hospitalId, speciality, district } = viewData || {};
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let getState = watch('state');
  if (!getState) setValue('district', null);


  const submit_data = (data) => {
    setLoader(true);
    data.hospitalId = `E-${random.generate({ length: 7, capitalization: "uppercase" })}`;
    let { pincode } = district_data.find((items) => items.district === data.district || district);
    let { fullname, address, contact } = data;
    let operation = pathname.includes('edit')
      ? sendData('/hospital/edit', 'PUT', { fullname, address, contact, hospitalId, speciality })
      : sendData('/hospital/add', 'POST', { ...data, pincode })
    operation.then(() => {
      pathname.includes('edit') ? toast.success('Updated Successfully!') : toast.success('Added Successfully!');
      setLoader(false);
      setTimeout(() => {
        navigate('/dashboard/hospital');
      }, 1800);
    }).catch((err) => {
      setLoader(false);
      toast.error(exception_handler(err));
    })
  };



  return <div>
    <h4><Link to="/dashboard/hospital"><HiOutlineArrowNarrowLeft className="back--icon" /></Link>  &nbsp;
      <center>{pathname.includes('edit') ? 'Edit' : 'Add'} Hospital</center>
    </h4>
    <main className='add--doctor--section'>
      <form className="doctors--add--form card shadow-sm" onSubmit={handleSubmit(submit_data)}>
        <section className='row'>
          {<Inputs value={fullname} errors={errors} register={register} name1={'Hospital Name'} register1={'fullname'} />}
          {<Inputs value={contact} errors={errors} register={register} name1={'Contact'} register1={'contact'}
            pattern1={/^[0-9]{10}$/} message1={'Not a valid Contact'} />}
        </section>

        {!pathname.includes('edit') ? <section className="row">
          {<SelectBox errors={errors} register={register} name1={'Speciality'} register1={'speciality'}
            data={[doctor_speacility, 'type']} />}
          {<SelectBox errors={errors} register={register} name1={'State'} register1={'state'}
            data={[state_data, 'state']} />}
        </section> : null}

        <section className="row">
          {!pathname.includes('edit') ? < SelectBox errors={errors} register={register} name1={'District'} register1={'district'}
            data={[district_data, 'district']} /> : null}
          {<Inputs value={address} errors={errors} register={register} name1={'Address'} register1={'address'} />}
        </section>

        <div className='btns--operate'>
          <Link to="/dashboard/hospital"><button className='btn btn--cancel'>Cancel</button></Link>
          <button className='btn btn--add'> {loader ? <ProcessSpinner padding={'4px 20px'} /> : pathname.includes('edit') ? 'Update' : 'Add'}</button>
        </div>
      </form>
    </main>
  </div>;
};

export default AddHospital;
