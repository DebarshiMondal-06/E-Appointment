import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { getData } from '../../Utils/API';
import NoData from '../../Components/Images/NoData.png';


const Patient = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  const get_patients = async () => {
    setLoader(true);
    try {
      let result = await getData('/users/get_user_role?role=patient', 'GET', null);
      let { Items } = result.data.message;
      if (Items) setData(Items);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => get_patients(), []);

  const delete_patient = async (id) => {
    try {
      let result = await getData(`/users/delete_user?id=${id}`, 'DELETE');
      if (result) get_patients();
    } catch (error) {
      console.log(error);
    }
  }

  if (loader) return <section className='text-center mt-5'><h2>Loading...</h2></section>
  return <div className='doctors'>
    <article>
      <h4>Patient</h4>
      <Link to="/dashboard/doctors_add"><button className='btn--add btn btn-info'>Add</button></Link>
    </article>
    {
      !data
        ? <article className='no--data'><img src={<NoData />} alt="" /></article>
        : <main className='table-responsive'>
          <table className="table table-striped table-hover mt-5">
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
                    <td><button onClick={() => delete_patient(emailid)} className='btn btn-danger'>
                      <BsFillTrashFill />
                    </button></td>
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
