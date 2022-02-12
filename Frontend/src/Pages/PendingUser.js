import React, { useEffect, useState } from 'react';
import { FaUserMd, FaHospitalUser, FaTimes, FaCheck } from 'react-icons/fa';
import { getData } from '../Utils/API';


const PendingUser = () => {
  const [data, setData] = useState(false);
  const [, setLoader] = useState(false);


  let load_pending_data = async () => {
    setLoader(true);
    await getData('/users', 'GET').then((res) => {
      setLoader(false);
      let { message: { Items } } = res.data;
      if (Items) setData(Items);
      console.log(Items);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    load_pending_data();
  }, []);



  return <div className='doctors text-center'>
    <article>
      <h4>Pending Users</h4>
    </article>
    <main className='table-responsive'>
      <table className="table table-striped table-hover mt-5">
        <thead>
          <tr className='table--head'>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Verified</th>
            <th scope="col">Approve</th>
          </tr>
        </thead>
        <tbody className='table--body'>
          {
            data && data.map((items, i) => {
              let { name, isVerified, emailid, user_role } = items;
              return <tr key={i}>
                <td><b>{i + 1}</b></td>
                <td>{name}</td>
                <td>{emailid}</td>
                <td className='text-capitalize'> {user_role}
                  &nbsp; {user_role === 'patient' ? <FaHospitalUser className='user--role--icon' /> : <FaUserMd className='user--role--icon' />}
                </td>
                <td> <span className={`badge ${isVerified ? 'bg-success' : 'bg-warning'} `}>
                  {isVerified ? 'Yes' : 'No'}
                </span> </td>
                <td className='approve--btns'>
                  <button onClick={() => ''} className='btn btn_approve'><FaCheck className='icon-1' /></button>
                  <button onClick={() => ''} className='btn btn_disapprove'><FaTimes /></button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </main>
  </div>
}

export default PendingUser