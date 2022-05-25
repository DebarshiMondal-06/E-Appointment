/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { BiPlusMedical } from 'react-icons/bi';
import NoData from '../../Components/Images/NoData.png';
import { getData } from '../../Utils/API';
import MainLoader from '../../Components/Spinners/MainLoader';
import { toast } from 'react-toastify';
import { exception_handler } from '../../Utils/Exception';
import { createGlobalContext } from '../../Utils/GlobalContext';
import ViewData from '../../Components/ViewData';
import { useCookies } from 'react-cookie';
import ApproveReject from './Approve_Reject';
import ApproveAppoint from './ApproveAppointment';
import UserOperation from './UserOperation';


const Appointments = () => {
  const [data, setData] = useState([]);
  const [cookie] = useCookies();
  const [loader, setLoader] = useState(false);
  const { setViewModal, setViewData } = useContext(createGlobalContext);
  const [modalAssign, setModalAssign] = useState(false);
  const { email, user_role } = cookie.user_data || {};


  const getAppointment = async () => {
    setLoader(true);
    let url = user_role.includes('admin') ? '/appointment' : `/appointment/user?user_id=${email}`;
    try {
      let result = await getData(url, 'GET');
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
    getAppointment();
  }, []);


  if (loader) return <MainLoader />
  return <div className='doctors text-center'>
    <ViewData />
    <ApproveAppoint modalAssign={modalAssign} setModalAssign={setModalAssign} reloadData={getAppointment} />
    <article>
      <h4>Appointments</h4>
      {user_role && user_role.includes('patient')
        ? <Link to="/dashboard/book"><button className='btn--add btn'>Book <BiPlusMedical /> </button></Link>
        : null}
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
                  let { concern, appoint_id, contact, appoint_status } = items;
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
                    <td><span className={`badge bg-${appoint_status === 'pending' ? 'warning' :
                      appoint_status === 'active' ? 'info' : 'danger'}`}>
                      {appoint_status}
                    </span></td>
                    <td>
                      {
                        user_role && user_role.includes('admin')
                          ? appoint_status === 'active'
                            ? <span className='text-dark badge border border-info'>Approved</span>
                            : appoint_status === 'reject'
                              ? <span className='text-dark badge border border-danger'>Rejected</span>
                              : <ApproveReject
                                setModalAssign={setModalAssign}
                                setViewData={setViewData}
                                items={items}
                                reloadData={getAppointment}
                              />
                          : <UserOperation
                            items={items}
                            loader={loader}
                            setLoader={setLoader}
                            reloadData={getAppointment}
                          />
                      }
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
