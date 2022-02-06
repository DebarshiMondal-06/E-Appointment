import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { getData } from '../../Utils/API';

const Doctor = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  const get_doctors = async () => {
    setLoader(true);
    try {
      let result = await getData('/users/get_doctors', 'GET', null);
      let { Items } = result.data.message;
      if (Items) setData(Items);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => get_doctors(), []);


  if (loader) return <section className='text-center mt-5'><h2>Loading...</h2></section>

  return <div className='doctors'>
    <article>
      <h4>Doctors</h4>
      <Link to="/dashboard/doctors_add"><button className='btn--add btn btn-info'>Add</button></Link>
    </article>
    <main className='table-responsive'>
      <table className="table table-striped  mt-5">
        <thead>
          <tr className='table--head'>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date of Birth(DOB)</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className='table--body'>
          {
            data && data.map((items, i) => {
              let { name, dob, emailid, phone } = items;
              return <tr key={i}>
                <td><b>{i + 1}</b></td>
                <td>{name}</td>
                <td>{emailid}</td>
                <td>{phone}</td>
                <td>{dob}</td>
                <td><button className='btn btn-danger'> <MdDelete /> </button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </main>
  </div>;
};

export default Doctor;
