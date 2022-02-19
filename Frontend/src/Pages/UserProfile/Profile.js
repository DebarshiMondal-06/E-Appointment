/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaUserEdit } from 'react-icons/fa'
import UpdatePassword from './UpdatePassword';
import { useCookies } from 'react-cookie';
import { getData } from '../../Utils/API';
import MainLoader from '../../Components/Spinners/MainLoader';

const Profile = () => {
  const [cookie] = useCookies();
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);


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
    <article>
      <h4>Profile</h4>
      <Link to="/dashboard/doctors_add"><button className='btn--edit btn btn-danger'> <FaUserEdit /> </button></Link>
    </article>

    <main className='card shadow-sm profile'>
      <p>Name: <span>{data.name}</span></p>
      <p className='email'>Email: <span>{data.emailid}</span></p>
      <p>Date of Birth: <span>{data.dob} </span></p>
      <p>Phone: <span>{data.phone} </span></p>
      <p>District: <span>{data.district || '--'}</span> </p>
      <p>State: <span> {data.state || '--'}  </span></p>
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