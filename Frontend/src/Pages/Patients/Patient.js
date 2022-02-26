/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { RiEyeFill } from 'react-icons/ri';
import { getData } from '../../Utils/API';
import NoData from '../../Components/Images/NoData.png';
import MainLoader from '../../Components/Spinners/MainLoader';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';
import { toast } from 'react-toastify';
import { exception_handler } from '../../Utils/Exception';
import { useCookies } from 'react-cookie';
import { createGlobalContext } from '../../Utils/GlobalContext';
import ViewData from '../../Components/ViewData';



const Patient = () => {
  const [cookie] = useCookies();
  const { loader, setLoader, setViewModal, setViewData } = useContext(createGlobalContext);
  const [data, setData] = useState([]);
  const [processLoader, setProcessLoader] = useState({
    index: 0,
    loader: false
  });


  const get_patients = async () => {
    setLoader(true);
    try {
      let result = await getData('/users/get_user_role?role=patient', 'GET', null);
      let { Items } = result.data.message;
      if (Items) setData(Items);
      setLoader(false);
    } catch (err) {
      toast.error(exception_handler(err));
    }
  };
  useEffect(() => get_patients(), []);


  const delete_patient = async (id, index) => {
    try {
      setProcessLoader({ loader: true, index });
      let result = await getData(`/users/delete_user?id=${id}`, 'DELETE');
      if (result) {
        toast.success('Deleted Successfully!');
        setProcessLoader({ loader: false, index: 0 });
        get_patients();
      }
    } catch (err) {
      setProcessLoader({ loader: false, index: 0 });
      toast.error(exception_handler(err));
    };
  };


  if (loader) return <MainLoader />
  return <div className='doctors text-center'>
    <ViewData />
    <article>
      <h4>Patient</h4>
    </article>
    {
      !data.length > 0
        ? <article className='no--data'><img src={NoData} alt="" /> No Patient Found! </article>
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
                  let { name, dob, emailid, phone } = items;
                  return <tr key={i}>
                    <td><b>{i + 1}</b></td>
                    <td>{name}</td>
                    <td>{emailid}</td>
                    <td>{phone}</td>
                    <td>{dob}</td>
                    <td>
                      {(cookie.user_data && cookie.user_data.user_role === 'admin') ? <>
                        <button onClick={() => delete_patient(emailid, i)} className='btn btn-danger'>
                          {(processLoader.loader && i === processLoader.index)
                            ? <ProcessSpinner size={18} border={'3px'} />
                            : <BsFillTrashFill />
                          }
                        </button> &nbsp; </>
                        : null}
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

export default Patient;
