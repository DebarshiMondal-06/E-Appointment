import React from 'react'
import { Link } from 'react-router-dom';
import { FaUserEdit } from 'react-icons/fa'
import UpdatePassword from './UpdatePassword';



const Profile = () => {



  return <section className='profile--section'>
    <article>
      <h4>Profile</h4>
      <Link to="/dashboard/doctors_add"><button className='btn--edit btn btn-danger'> <FaUserEdit /> </button></Link>
    </article>

    <main className='card shadow-sm profile'>
      <p>Name: <span>Debarshi Mondal</span></p>
      <p>Email: <span>debopiku1122@gmail.com</span></p>
      <p>Date of Birth: <span>06-11-1999 </span></p>
      <p>Phone: <span>9090909090 </span></p>
      <p>District: <span>Konark</span> </p>
      <p>City: <span> Odisha  </span></p>
      <p>Pincode: <span>700899 </span> </p>
      <p></p>
    </main>

    <h3>Update Password</h3>
    <main className='card update--password'>
      <UpdatePassword />
    </main>

  </section>
}

export default Profile