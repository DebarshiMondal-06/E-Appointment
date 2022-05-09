import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Inputs, TextBox } from '../../Components/Inputs/Input';
import SelectBox from '../../Components/Inputs/SelectBox';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';
import { district_data, health_category, state_data } from '../../Utils/data';
import { useCookies } from 'react-cookie';
import { sendData } from '../../Utils/API';
import { toast } from 'react-toastify';
import { exception_handler } from '../../Utils/Exception';
import random from 'randomstring';
import { createGlobalContext } from '../../Utils/GlobalContext';


const Book = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [cookie] = useCookies();
  const { handleSubmit, formState: { errors }, register, watch, setValue } = useForm();
  const { viewData } = useContext(createGlobalContext);
  const { appoint_id, concern, description, contact, user_id } = viewData || {};
  const [loader, setLoader] = useState(false);
  const { email } = cookie.user_data || {};

  let getState = watch('given_state');
  if (!getState) setValue('district', null);

  const submit_data = (data) => {
    setLoader(true);
    const { district, contact, description } = data;
    if (!pathname.includes('edit')) {
      data.appoint_id = `eapp-${random.generate({ length: 8, capitalization: "lowercase" })}`;
      let { pincode } = district_data.find((items) => items.district === district);
      data.pincode = pincode;
      data.user_id = email;
      data.status = 'pending';
    };
    let operation = pathname.includes('edit')
      ? sendData('/appointment/edit', 'PUT', { description, contact, appoint_id, user_id })
      : sendData('/appointment/add', 'POST', data)
    operation.then(() => {
      toast.success('Data Uploaded Successfully!');
      setLoader(false);
      setTimeout(() => {
        navigate('/dashboard/appointments');
      }, 1800);
    }).catch((err) => {
      setLoader(false);
      toast.error(exception_handler(err));
    })
  };


  return <div>
    <h4><Link to="/dashboard/appointments"><HiOutlineArrowNarrowLeft className="back--icon" /></Link>  &nbsp;
      <center>{pathname === '/dashboard/book_edit' ? 'Edit' : 'Book'} Appointment</center>
    </h4>
    <main className='add--doctor--section'>
      <form className="doctors--add--form card shadow-sm" onSubmit={handleSubmit(submit_data)}>
        {
          pathname !== '/dashboard/book_edit' ? <section className='row'>
            {<Inputs isreadable={false} errors={errors} register={register} name1={'Concern'} register1={'concern'} />}
            {<SelectBox errors={errors} register={register} name1={'Category'} register1={'category'}
              data={[health_category, 'type']} />}
          </section> : <section className='appoint--edit--details mb-3 mt-3'>
            <p><b>Concern</b> - {concern} - <span className='badge bg-info'>#{appoint_id}</span></p>
          </section>
        }
        {
          pathname !== '/dashboard/book_edit' ? <section className="row">
            {<SelectBox errors={errors} register={register} name1={'State'} register1={'given_state'}
              data={[state_data, 'state']} />}
            {<SelectBox errors={errors} register={register} name1={'District'} register1={'district'}
              data={[district_data, 'district']} message={!getState ? 'Choose State First' : null} />}
          </section> : null
        }

        <section className='row'>
          {<TextBox value={description} errors={errors} register={register} name1={'Description'} register1={'description'} />}
        </section>

        <section className='row'>
          <Inputs value={contact} errors={errors} register={register} name1={'Contact'} register1={'contact'}
            pattern1={/^[0-9]{10}$/} message1={'Not a valid Phone no'} />
        </section>

        <div className='btns--operate'>
          <Link to="/dashboard/appointments"><button className='btn btn--cancel'>Cancel</button></Link>
          <button className='btn btn--add'>{loader
            ? <ProcessSpinner padding={'4px 20px'} />
            : pathname === '/dashboard/book_edit' ? 'Save' : 'Book'}
          </button>
        </div>
      </form>
    </main>
  </div>;
};

export default Book;
