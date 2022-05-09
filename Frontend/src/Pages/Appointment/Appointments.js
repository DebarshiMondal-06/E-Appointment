/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { BiPlusMedical } from 'react-icons/bi';
import { RiEdit2Fill } from 'react-icons/ri';
import NoData from '../../Components/Images/NoData.png';
import { getData } from '../../Utils/API';
import MainLoader from '../../Components/Spinners/MainLoader';
import { toast } from 'react-toastify';
import { exception_handler } from '../../Utils/Exception';
import { createGlobalContext } from '../../Utils/GlobalContext';
import ViewData from '../../Components/ViewData';
import { useCookies } from 'react-cookie';


const Appointments = () => {
  const [data, setData] = useState([]);
  const [cookie] = useCookies();
  const [loader, setLoader] = useState(false);
  const { setViewModal, setViewData } = useContext(createGlobalContext);
  const { email } = cookie.user_data || {};

  
  const getHospital = async () => {
    setLoader(true);
    try {
      let result = await getData(`/appointment/user?user_id=${email}`, 'GET');
      let { message } = result.data;
      if (message) {
        setData(message);
        setLoader(false);
      }
    } catch (err) {
      toast.error(exception_handler(err));
    }
  };

  useEffect(() => {
    getHospital();
  }, []);


  if (loader) return <MainLoader />
  return <div className='doctors text-center'>
    <ViewData />
    <article>
      <h4>Appointments</h4>
      <Link to="/dashboard/book"><button className='btn--add btn'>Book <BiPlusMedical /> </button></Link>
    </article>
    {
      !data.length > 0
        ? <article className='no--data'><img src={NoData} alt="" /> No Appointments Found! </article>
        : <main className='table-responsive'>
          <table className="table table-striped mt-5">
            <thead>
              <tr className='table--head'>
                <th scope="col">#</th>
                <th scope="col">Concern</th>
                <th scope="col">Appoint ID</th>
                <th scope="col">Contact</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className='table--body'>
              {
                data && data.map((items, i) => {
                  let { concern, appoint_id, contact, status } = items;
                  return <tr key={i}>
                    <td><b>{i + 1}</b></td>
                    <td>{concern}</td>
                    <td>
                      <span onClick={() => {
                        setViewData(items);
                        setViewModal(true)
                      }} className='text-primary check--appointId'>{appoint_id}</span>
                    </td>
                    <td>{contact}</td>
                    <td><span className={`badge bg-${status === 'pending' ? 'warning' :
                      status === 'active' ? 'primary' : 'success'}`}>
                      Pending
                    </span></td>
                    <td>
                      <Link to="/dashboard/book_edit" onClick={() => setViewData(items)}>
                        <button className='btn btn-info' type='button'>
                          <span><RiEdit2Fill size={18} color="#fff" /></span>
                        </button>
                      </Link>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </main>
    }
  </div >;
};

export default Appointments;
