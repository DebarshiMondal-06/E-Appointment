/* eslint-disable react-hooks/exhaustive-deps  */
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';
import { getData } from '../../Utils/API';
import { createGlobalContext } from '../../Utils/GlobalContext';


const ViewDoctor = ({ setModal, modal }) => {
  const [doctors, setDoctors] = useState([]);
  const { viewData } = useContext(createGlobalContext);
  const [loader, setLoader] = useState(false);
  let { hospitalId, fullname } = viewData || {};

  let handleClose = () => {
    setModal(false);
    setTimeout(() => setDoctors([]), 400);
  };

  const get_doctors_to_hospital = (id) => {
    setLoader(true);
    getData(`/hospital/doctors?hospitalId=${id}`, 'GET').then((res) => {
      setLoader(false);
      let { message } = res.data;
      if (message && message.length > 0) setDoctors(message);
    }).catch(() => {
      setLoader(false);
      toast.error('Something went wrong!');
    })
  };

  useEffect(() => {
    if (hospitalId) get_doctors_to_hospital(hospitalId);
  }, [hospitalId]);



  return <Modal show={modal} size="lg" className='view--modal' onHide={handleClose} backdrop="static"
    keyboard={false} centered>
    <Modal.Header>
      <Modal.Title>
        {fullname}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p><big>Avialable Doctors: <span className='text-danger'>{doctors.length}</span></big></p>
      <article>
        {
          loader
            ? <ProcessSpinner color={'#00bfa6'} size={30} />
            : (doctors && doctors.length > 0) ? doctors.map((item, i) => {
              let { emailid, fullname } = item;
              return <>
                <p> {i + 1}. Name: <span>{fullname} </span></p>
                <p> Email: <span className='emailid'>{emailid} </span></p>
              </>
            }) : <div className="alert alert-warning" role="alert">
              Seems No Doctor Found!
            </div>
        }
      </article>
    </Modal.Body>
    <Modal.Footer>
      <Button className='close--btn' variant="dark" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
}

export default ViewDoctor;