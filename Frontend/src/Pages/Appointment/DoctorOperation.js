import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { createGlobalContext } from '../../Utils/GlobalContext';

const DoctorOperation = ({ setDoctorOperation, doctorOperation }) => {
  const { viewData } = useContext(createGlobalContext);
  const { handleSubmit } = useForm();


  const approve_appoint = () => {

  };

  const handleClose = () => {
    setDoctorOperation(false);
  };


  return <Modal show={doctorOperation} size="lg" className='view--modal' backdrop="static"
    keyboard={false} centered>
    <Modal.Header>
      <Modal.Title>
        Checkout Appointment
        <p>Appoint ID: <span style={{ textTransform: "lowercase" }}>{viewData.appoint_id}</span></p>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='edit--profile'>


    </Modal.Body>
    <Modal.Footer>
      <Button className='close--btn' variant="dark" onClick={() => handleClose()}>
        Close
      </Button>
      <Button className="assign--btn" onClick={handleSubmit(approve_appoint)}>
        Checkout
      </Button>
    </Modal.Footer>
  </Modal >
}

export default DoctorOperation;