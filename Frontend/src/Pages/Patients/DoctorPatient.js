/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SelectBox from '../../Components/Inputs/SelectBox';
import MainLoader from '../../Components/Spinners/MainLoader';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';
import { getData } from '../../Utils/API';
import { exception_handler } from '../../Utils/Exception';
import moment from 'moment';

const DoctorPatient = () => {
  const { handleSubmit, formState: { errors }, register } = useForm();
  const [loader, setLoader] = useState({
    pageLoader: false,
    btnLoader: false,
  });
  const [user, setUserDetails] = useState({});
  const { pageLoader, btnLoader } = loader;
  const [cookie] = useCookies();
  const { email } = cookie.user_data || {};
  const [appointment, setAppointment] = useState([]);


  const getAppointment = async () => {
    setLoader({ ...loader, pageLoader: true });
    try {
      let result = await getData(`/appointment/doctor?doctor_id=${email}`, 'GET');
      let { message } = result.data;
      if (message) {
        setAppointment(message);
        setLoader({ ...loader, pageLoader: false });
      }
    } catch (err) {
      setLoader({ pageLoader: false });
      toast.error(exception_handler(err));
    }
  };
  useEffect(() => {
    getAppointment();
  }, []);


  const get_user = (user_id) => {
    setLoader({ ...loader, btnLoader: true });
    getData(`/users/profile?id=${user_id}`).then((res) => {
      let { message: { Item } } = res.data;
      if (Item) setUserDetails(Item);
      setLoader({ ...loader, btnLoader: false });
    })
  };


  const submit_data = (data) => {
    if (data.user) return get_user(data.user);
  };


  if (pageLoader) return <MainLoader />
  return <section>
    <article>
      <h4>Patient <sub style={{ fontSize: "medium" }}>(appointed)</sub> </h4>
    </article>
    <main className='add--doctor--section'>
      <form className="doctors--add--form card shadow-sm" onSubmit={handleSubmit(submit_data)}>
        <section className="row">
          {<SelectBox className={'text-lowercase'} errors={errors} register={register} name1={'User (Patient)'} register1={'user'}
            data={[appointment, 'user_id']} />}
          <div className="col-md-12" style={{ marginTop: -20 }}>
            <button className='btn btn-info text-white'>{btnLoader
              ? <ProcessSpinner padding={'2px 20px'} size={'20px'} />
              : 'Search'}
            </button> &nbsp;
            <button onClick={() => window.location.reload()} className='btn btn-dark text-white'>Reset</button>
          </div>
        </section>

        {
          user.phone ? <article className='doctor--patient mt-5'>
            <p><b>Name:</b> <span> {user.fullname}</span></p>
            <p><b>DOB</b>(date of birth): <span> {user.dob}</span></p>
            <p><b>Age:</b> <span>{moment().year() - moment(user.dob).year()}+</span></p>
            <p><b>Email:</b> <span className='emailid text-info'> {user.emailid}</span></p>
            <p><b>Phone:</b> <span> {user.phone}</span></p>
            <p><b>Distirct:</b> <span className='text-uppercase'> {user.district}</span></p>
          </article> : null
        }

      </form>
    </main>
  </section>
}

export default DoctorPatient;