import React, { useEffect, useState } from 'react';
import { FaUserMd, FaHospitalUser, FaTimes, FaCheck } from 'react-icons/fa';
import { getData, sendData } from '../Utils/API';
import NoData from '../Components/Images/NoData.png';
import MainLoader from '../Components/Spinners/MainLoader';
import { toast } from 'react-toastify';
import { exception_handler } from '../Utils/Exception';

const PendingUser = () => {
  const [data, setData] = useState(false);
  const [loader, setLoader] = useState(false);


  let load_pending_data = async () => {
    setLoader(true);
    await getData('/users', 'GET').then((res) => {
      setLoader(false);
      let { message: { Items } } = res.data;
      if (Items) setData(Items);
    }).catch((err) => toast.error(exception_handler(err)));
  };
  useEffect(() => {
    load_pending_data();
  }, []);


  let approve = async (id) => {
    await sendData('/users/approve', 'POST', { emailid: id }).then(() => {
      load_pending_data();
    }).catch(err => toast.error(exception_handler(err)));
  };
  let disapprove = async (id) => {
    try {
      let result = await getData(`/users/delete_user?id=${id}`, 'DELETE');
      if (result) load_pending_data();
    } catch (error) {
      toast.error(exception_handler(error));
    }
  };


  if (loader) return <MainLoader />
  return <div className='doctors text-center'>
    <article>
      <h4>Pending Users</h4>
    </article>
    {
      !data.length > 0
        ? <article className='no--data'><img src={NoData} alt="" /> No Data Found </article>
        : <main className='table-responsive'>
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
                      <button onClick={() => approve(emailid)} className='btn btn_approve'><FaCheck /></button>
                      <button onClick={() => disapprove(emailid)} className='btn btn_disapprove'><FaTimes /></button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </main>
    }
  </div>
}

export default PendingUser