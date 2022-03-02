/* eslint-disable react-hooks/exhaustive-deps  */
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import { createGlobalContext } from '../Utils/GlobalContext';
import ProcessSpinner from './Spinners/ProcessSpinner';

const ViewData = ({ reloadData }) => {
  const [cookie] = useCookies();
  const { user_role } = cookie.user_data || {}
  const { viewModal, setViewModal, viewData, get_doctor_assign, deleteLoader, deleteItem } = useContext(createGlobalContext);
  const { speciality, contact, district, address, pincode, emailid, hospitalId, dob, phone, given_state } = viewData;
  const [hospitalAssign, setHospitalAssign] = useState([]);
  const { pathname } = useLocation();
  const [assignLoader, setAssignLoader] = useState(false);


  let handleClose = () => {
    setViewModal(false);
  };


  useEffect(() => {
    if (emailid && pathname === '/dashboard/doctors') {
      setAssignLoader(true);
      get_doctor_assign(emailid).then((res) => {
        setAssignLoader(false);
        let { message } = res.data;
        if (message) setHospitalAssign(message[0]);
      })
    }
  }, [emailid, pathname]);


  return <Modal show={viewModal} size="lg" className='view--modal' onHide={handleClose} backdrop="static"
    keyboard={false} centered>
    <Modal.Header>
      <Modal.Title>
        <section className='delete--section'>
          {(user_role === 'admin' && !hospitalId) ? <>
            <button onClick={() => deleteItem(emailid, reloadData)} className='btn btn-danger btn--delete'>
              {deleteLoader ? <ProcessSpinner padding={'2px 15px'} size={18} border={'3px'} /> : 'Delete'}
            </button> &nbsp; </>
            : null}
        </section>
        {viewData.fullname}
        <br />
        {hospitalId ? <p>Hospital ID: <span>{hospitalId}</span></p> : null}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <article>
        {emailid ? <p>Email: <span> {emailid}</span></p> : null}
        {phone ? <p>Phone: <span> {phone}</span></p> : null}
        {dob ? <p>DOB(Date of Birth): <span> {dob}</span></p> : null}

        {contact ? <p>Contact: <span> {contact}</span></p> : null}
        {district ? <p>District: <span> {district}</span></p> : null}
        {given_state ? <p>State: <span> {given_state}</span></p> : null}
        {address ? <p>Address: <span> {address}</span></p> : null}
        {pincode ? <p>Pincode: <span> {pincode}</span></p> : null}
        {speciality ? <p>Speciality: <span className='bg-info'>{speciality}</span></p> : null}
        {pathname === '/dashboard/doctors' ? <p className='mt-3'> <big>Hospital Assigned</big> </p> : null}
      </article>
      {
        pathname === '/dashboard/doctors'
          ? assignLoader
            ? <ProcessSpinner color={'#00bfa6'} size={30} />
            : hospitalAssign ? <article>
              <p>Name: <span> {hospitalAssign.fullname}</span></p>
              <p>Address: <span> {hospitalAssign.address}</span></p>
            </article> : 'Not Yet Assigned!' : null
      }
      <br />
    </Modal.Body>
    <Modal.Footer>
      <Button className='close--btn' variant="dark" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
}

export default ViewData