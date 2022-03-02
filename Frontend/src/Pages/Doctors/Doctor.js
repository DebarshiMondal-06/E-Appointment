/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../../Utils/API';
import MainLoader from '../../Components/Spinners/MainLoader';
import { toast } from 'react-toastify';
import { exception_handler } from '../../Utils/Exception';
import NoData from '../../Components/Images/NoData.png';
import { RiEyeFill } from 'react-icons/ri';
import { BiPlusMedical } from 'react-icons/bi';
import { createGlobalContext } from '../../Utils/GlobalContext';
import ViewData from '../../Components/ViewData';
import { FaUserNurse } from 'react-icons/fa';
import AssignHospital from './AssignHospital';



const Doctor = () => {
  const { loader, setLoader, setViewModal, setViewData } = useContext(createGlobalContext);
  const [data, setData] = useState([]);
  const [modalAssign, setModalAssign] = useState(false);



  const get_doctors = async () => {
    setLoader(true);
    try {
      let result = await getData('/users/get_user_role?role=doctor', 'GET');
      let { Items } = result.data.message;
      if (Items) setData(Items);
      setLoader(false);
    } catch (err) {
      toast.error(exception_handler(err));
    }
  };
  useEffect(() => get_doctors(), []);





  if (loader) return <MainLoader />
  return <div className='doctors text-center'>
    <ViewData reloadData={get_doctors} />
    <AssignHospital modalAssign={modalAssign} setModalAssign={setModalAssign} reloadData={get_doctors} />
    <article>
      <h4>Doctors</h4>
      <Link to="/dashboard/doctors_add"><button className='btn--add btn'>Add <BiPlusMedical /> </button></Link>
    </article>
    {
      !data.length > 0
        ? <article className='no--data'><img src={NoData} alt="" /> No Doctors Found! </article>
        : <main className='table-responsive'>
          <table className="table table-striped mt-5">
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
                  let { fullname, dob, emailid, phone, pincode, hospitalassign } = items;
                  return <tr key={i}>
                    <td><b>{i + 1}</b></td>
                    <td>{fullname}</td>
                    <td>{emailid}</td>
                    <td>{phone}</td>
                    <td>{dob}</td>
                    <td>
                      {
                        (hospitalassign === 'yes') ? null : <> <button onClick={() => {
                          setViewData({ fullname, pincode, emailid });
                          setModalAssign(true);
                        }} className='btn assign--doctor' type='button'>
                          <FaUserNurse size={18} />
                        </button> &nbsp; </>
                      }
                      <button onClick={() => {
                        setViewData(items);
                        setViewModal(true);
                      }} className='btn btn-info'>
                        <RiEyeFill size={18} className='eye' />
                      </button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </main>
    }
  </div>;
};

export default Doctor;
