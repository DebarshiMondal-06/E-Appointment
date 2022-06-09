/* eslint-disable react-hooks/exhaustive-deps  */
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getData } from '../Utils/API';
import { createGlobalContext } from '../Utils/GlobalContext';
import ProcessSpinner from './Spinners/ProcessSpinner';

const ViewData = ({ reloadData }) => {
  const [cookie] = useCookies();
  const { user_role } = cookie.user_data || {}
  const { jwtToken } = cookie.token || {}
  const { viewModal, setViewModal, viewData, get_hospital_assign, deleteLoader, deleteItem, setViewData } = useContext(createGlobalContext);
  const { speciality, contact, district, address, pincode, emailid, hospitalId, dob, phone, given_state, hospitalassign,
    doctor_assign, appoint_id, concern, description, status, category, user_id, appoint_status, prescription } = viewData;
  const [hospitaldata, setHospitalData] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  const { pathname } = useLocation();
  const [assignLoader, setAssignLoader] = useState(false);
  const [assignDoctorLoader, setAssignDoctorLoader] = useState(false);


  let handleClose = () => {
    setViewModal(false);
    setViewData({});
    setHospitalData([]);
  };


  useEffect(() => {
    if (pathname === '/dashboard/doctors' && hospitalassign) {
      setAssignLoader(true);
      get_hospital_assign(hospitalassign).then((res) => {
        let { message } = res.data;
        if (message) setHospitalData(message);
        setAssignLoader(false);
      })
    }
  }, [hospitalassign]);

  useEffect(() => {
    if (pathname.includes('appointments') && user_id) {
      setAssignLoader(true);
      getData(`/users/profile?id=${user_id}`, 'GET', jwtToken).then((res) => {
        let { message: { Item } } = res.data;
        if (Item) setUserData(Item);
        setAssignLoader(false);
      }).catch(() => toast.error('Something went wrong!'))
    }
  }, [user_id]);

  useEffect(() => {
    if (pathname.includes('appointments') && doctor_assign) {
      setAssignDoctorLoader(true);
      getData(`/users/profile?id=${doctor_assign}`, 'GET', jwtToken).then((res) => {
        let { message: { Item } } = res.data;
        if (Item) setDoctorData(Item);
        setAssignDoctorLoader(false);
      })
    }
  }, [doctor_assign]);


  return <Modal show={viewModal} size="lg" className='view--modal' onHide={handleClose} backdrop="static"
    keyboard={false} centered>
    <Modal.Header>
      <Modal.Title>
        {!pathname.includes('appointments') ?
          <section className='delete--section'>
            {(user_role === 'admin' && !hospitalId) ? <>
              <button onClick={() => deleteItem(emailid, reloadData)} className='btn btn-danger btn--delete'>
                {deleteLoader ? <ProcessSpinner padding={'2px 15px'} size={18} border={'3px'} /> : 'Delete'}
              </button> &nbsp; </>
              : null}
          </section> : null
        }
        {viewData.fullname}
        {concern}
        <br />
        {hospitalId ? <p>Hospital ID: <span style={{ textTransform: "lowercase" }}>{hospitalId}</span></p> : null}
        {appoint_id ? <p>Appoint ID: <span style={{ textTransform: "lowercase" }}>{appoint_id}</span></p> : null}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <article>
        {emailid ? <p>Email: <span className='emailid'> {emailid}</span></p> : null}
        {phone ? <p>Phone: <span> {phone}</span></p> : null}
        {dob ? <p>DOB(Date of Birth): <span> {dob}</span></p> : null}

        {contact ? <p>Contact: <span> {contact}</span></p> : null}
        {district ? <p>District: <span> {district}</span></p> : null}
        {given_state ? <p>State: <span> {given_state}</span></p> : null}
        {address ? <p>Address: <span> {address}</span></p> : null}
        {pincode ? <p>Pincode: <span> {pincode}</span></p> : null}
        {speciality ? <p>Speciality: <span className='bg-info'>{speciality}</span></p> : null}
        {status ? <p>Status: <span> {status}</span></p> : null}
        {category ? <p>Category: <span> {category}</span></p> : null}
        {pathname === '/dashboard/doctors' ? <p className='mt-3'> <big>Hospital Assigned</big> </p> : null}
      </article>
      {description ? <p><b>Description</b>: <span> {description}</span></p> : null}
      {
        pathname === '/dashboard/doctors'
          ? assignLoader
            ? <ProcessSpinner color={'#00bfa6'} size={30} />
            : hospitaldata && hospitaldata.length > 0 ? <article>
              <p>Name: <span> {hospitaldata[0].fullname}</span></p>
              <p>Address: <span> {hospitaldata[0].address}</span></p>
              <p>Contact: <span> {hospitaldata[0].contact}</span></p>
            </article> : 'Not Yet Assigned!' : null
      }
      {pathname.includes('appointments') ? <p className='appoint--veiwuser'>User Details: </p> : null}
      {
        pathname.includes('appointments')
          ? assignLoader
            ? <ProcessSpinner color={'#00bfa6'} size={30} />
            :
            <article>
              <p>Name: <span> {userdata.fullname}</span></p>
              <p>Email: <span className='emailid'> {userdata.emailid}</span></p>
              <p>DOB: <span> {userdata.dob}</span></p>
              <p>Age: <span>{moment().year() - moment(userdata.dob).year()}+</span></p>
            </article> : null
      }
      {(pathname.includes('appointments') && doctor_assign) ? <p className='appoint--veiwuser'>Doctor Details: </p> : null}
      {
        (pathname.includes('appointments') && doctor_assign)
          ? assignDoctorLoader
            ? <ProcessSpinner color={'#00bfa6'} size={30} />
            :
            <article>
              <p>Name: <span> {doctorData.fullname}</span></p>
              <p>Email: <span className='emailid'> {doctorData.emailid}</span></p>
            </article> : null
      }

      {(appoint_status === 'complete' && prescription) ? <p className='appoint--veiwuser'>Prescription </p> : null}
      <article>
        <p>{prescription}</p>
      </article>

      < br />
    </Modal.Body>
    <Modal.Footer>
      <Button className='close--btn' variant="dark" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
}

export default ViewData