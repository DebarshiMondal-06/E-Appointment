/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { RiEdit2Fill, RiEyeFill } from 'react-icons/ri';
import { BiPlusMedical } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { getData } from '../../Utils/API';
import MainLoader from '../../Components/Spinners/MainLoader';
import { toast } from 'react-toastify';
import { exception_handler } from '../../Utils/Exception';
import { createGlobalContext } from '../../Utils/GlobalContext';
import ViewData from '../../Components/ViewData';
import ViewDoctor from './ViewDoctor';


const Hospital = () => {
  const [data, setData] = useState([]);
  const [doctorModal, setDoctorModal] = useState(false);
  const { loader, setLoader, setViewModal, setViewData } = useContext(createGlobalContext);

  const getHospital = async () => {
    setLoader(true);
    try {
      let result = await getData('/hospital', 'GET');
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
    <ViewDoctor modal={doctorModal} setModal={setDoctorModal} />
    <article>
      <h4>Hospitals</h4>
      <Link to="/dashboard/hospital_add"><button className='btn--add btn shadow'>Add <BiPlusMedical /> </button></Link>
    </article>
    <main className='table-responsive'>
      <table className="table table-striped mt-5">
        <thead>
          <tr className='table--head'>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Specality</th>
            <th scope="col">District</th>
            <th scope="col">Contact</th>
            <th scope="col">Doctors</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className='table--body'>
          {
            data && data.map((items, i) => {
              let { fullname, speciality, contact, district, hospitalId } = items;
              return <tr key={i}  >
                <td><b>{i + 1}</b></td>
                <td>{fullname} <span style={{ cursor: 'pointer' }}><RiEdit2Fill size={18} color='red' /></span> </td>
                <td>{speciality}</td>
                <td>{district}</td>
                <td>{contact}</td>
                <td> <span onClick={() => {
                  setViewData({ fullname, hospitalId });
                  setDoctorModal(true);
                }} className='check--doctors'>check</span> </td>
                <td>
                  <button onClick={() => {
                    setViewData(items);
                    setViewModal(true)
                  }} className='btn btn-info' type='button'>
                    <RiEyeFill size={18} className='eye' />
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