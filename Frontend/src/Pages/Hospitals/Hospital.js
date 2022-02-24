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

const Hospital = () => {
  const [data, setData] = useState([]);
  const { loader, setLoader } = useContext(createGlobalContext);

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
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className='table--body'>
          {
            data && data.map((items, i) => {
              let { name, speciality, contact, district } = items;
              return <tr key={i}  >
                <td><b>{i + 1}</b></td>
                <td>{name} <span style={{ cursor: 'pointer' }}><RiEdit2Fill size={18} color='red' /></span> </td>
                <td>{speciality}</td>
                <td>{district}</td>
                <td>{contact}</td>
                <td>
                  <button onClick={() => ''} className='btn btn-info'>
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