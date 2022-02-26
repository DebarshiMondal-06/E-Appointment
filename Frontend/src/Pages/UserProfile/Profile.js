/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import UpdatePassword from './UpdatePassword';
import { useCookies } from 'react-cookie';
import { getData } from '../../Utils/API';
import MainLoader from '../../Components/Spinners/MainLoader';
import { createGlobalContext } from '../../Utils/GlobalContext';
import EditProfile from './EditProfile';

const Profile = () => {
  const { setViewModal, setViewData, loader, setLoader, } = useContext(createGlobalContext)
  const [cookie] = useCookies();
  let { user_role, email } = cookie.user_data || {};
  const [data, setData] = useState({});


  let fetchData = async () => {
    setLoader(true);
    if (cookie.user_data) {
      await getData(`/users/profile?id=${cookie.user_data.email}`, 'GET').then((res) => {
        setLoader(false)
        let { message: { Item } } = res.data;
        if (Item) setData(Item);
      });
    };
  };

  useEffect(() => {
    fetchData();
  }, []);


  if (loader) return <MainLoader />
  return <section className='profile--section'>
    <EditProfile fetchData={fetchData} emailid={email} />
    {
      (user_role === 'patient' && !data.given_state) ? <div class="alert alert-warning" role="alert">
        Seems <b>Profile not updated!</b> please update your address in order to book appointment.
      </div> : null
    }
    <article>
      <h4>Profile</h4>
      <button onClick={() => {
        setViewData(data)
        setViewModal(true)
      }} className='btn--edit btn btn-danger'> <FaUserEdit /> </button>
    </article>


    <main className='card shadow-sm profile'>
      <p>Name: <span>{data.fullname}</span></p>
      <p className='email'>Email: <span>{data.emailid}</span></p>
      <p>Date of Birth: <span>{data.dob} </span></p>
      <p>Phone: <span>{data.phone} </span></p>
      <p>District: <span>{data.district || '--'}</span> </p>
      <p>State: <span> {data.given_state || '--'}  </span></p>
      <p>Pincode: <span> {data.pincode || '--'} </span> </p>
      <p className='role'>Role: <span> {data.user_role} </span> </p>
      <p></p>
    </main>

    <h3>Update Password</h3>
    <main className='card update--password shadow'>
      <UpdatePassword />
    </main>

  </section>
}

export default Profile