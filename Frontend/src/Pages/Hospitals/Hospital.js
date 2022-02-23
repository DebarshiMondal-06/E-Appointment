import React, { useState } from 'react'
import { RiEyeFill } from 'react-icons/ri';
import { BiPlusMedical } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Hospital = () => {
  const [data] = useState([]);

  return <div className='doctors text-center'>
    <article>
      <h4>Hospitals</h4>
      <Link to="/dashboard/doctors_add"><button className='btn--add btn'>Add <BiPlusMedical /> </button></Link>
    </article>
    <main className='table-responsive'>
      <table className="table table-striped table-hover mt-5">
        <thead>
          <tr className='table--head'>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Hospital Id</th>
            <th scope="col">Specality</th>
            <th scope="col">Contact</th>
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
                <td>
                  <button onClick={() => ''} className='btn btn-info'>
                    <RiEyeFill size={20} className='eye' />
                  </button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </main>
  </div>;
};


export default Hospital