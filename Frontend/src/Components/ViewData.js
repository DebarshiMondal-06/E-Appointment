import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { createGlobalContext } from '../Utils/GlobalContext';

const ViewData = () => {
  const { viewModal, setViewModal, viewData } = useContext(createGlobalContext);
  const { speciality, contact, district, address, pincode, emailid, hospitalId, dob, phone, state } = viewData;

  let handleClose = () => {
    setViewModal(false);
  };

  return <Modal show={viewModal} size="lg" className='view--modal' onHide={handleClose} backdrop="static"
    keyboard={false} centered>
    <Modal.Header closeButton>
      <Modal.Title>{viewData.name}
        <br />
        {hospitalId ? <p>Hospital ID: <span>{hospitalId}</span></p> : null}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <article>
        {emailid ? <p>Email: <span> {emailid}</span></p> : null}
        {phone ? <p>Phone: <span> {phone}</span></p> : null}
        {dob ? <p>DOB(Date of Birth): <span> {dob}</span></p> : null}

        {speciality ? <p>Speciality: <span className='bg-info'>{speciality}</span></p> : null}
        {contact ? <p>Contact: <span> {contact}</span></p> : null}
        {district ? <p>District: <span> {district}</span></p> : null}
        {state ? <p>State: <span> {state}</span></p> : null}
        {address ? <p>Address: <span> {address}</span></p> : null}
        {pincode ? <p>Pincode: <span> {pincode}</span></p> : null}
      </article>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="dark" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
}

export default ViewData