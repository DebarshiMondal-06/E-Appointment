import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { createGlobalContext } from '../../Utils/GlobalContext';

const View = () => {
  const { viewModal, setViewModal, viewData } = useContext(createGlobalContext);

  let handleClose = () => {
    setViewModal(false);
  };

  return <Modal show={viewModal} size="lg" className='view--modal' onHide={handleClose} backdrop="static"
    keyboard={false} centered>
    <Modal.Header closeButton>
      <Modal.Title>{viewData.name} Hospital
        <br />
        <p>Hospital ID: <span>{viewData.hospitalId}</span></p>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <article>
        <p>Speciality: <span>{viewData.speciality}</span></p>
        <p>Contact: <span> {viewData.contact}</span></p>
        <p>District: <span>{viewData.district}</span></p>
        <p>Address: <span>{viewData.address}</span></p>
        <p>Pincode: <span> {viewData.pincode}</span></p>
      </article>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
}

export default View