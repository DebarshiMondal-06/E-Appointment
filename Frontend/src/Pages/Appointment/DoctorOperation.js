import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { TextBox } from '../../Components/Inputs/Input';
import { sendData } from '../../Utils/API';
import { exception_handler } from '../../Utils/Exception';
import { createGlobalContext } from '../../Utils/GlobalContext';

const DoctorOperation = ({ setDoctorOperation, doctorOperation, getAppointment }) => {
  const { viewData } = useContext(createGlobalContext);
  const { concern, appoint_id, user_id } = viewData;
  const [cookie] = useCookies();
  const { jwtToken } = cookie.token || {};

  const { handleSubmit, formState: { errors }, register } = useForm();


  const complete_appoint = (data) => {
    data.appoint_status = 'complete';
    sendData('/appointment/complete', 'PUT', { appoint_id, user_id, ...data }, jwtToken).then(() => {
      toast.success('Data Uploaded Successfully!');
      setTimeout(() => {
        setDoctorOperation(false);
        getAppointment();
      }, 1800);
    }).catch((err) => {
      toast.error(exception_handler(err));
    })
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
    <Modal.Body>
      <article>
        {concern ? <p>Concern: <span> {concern}</span></p> : null}
      </article>

      <section className='row'>
        {<TextBox placeholder="for ex: tablet" errors={errors} register={register} name1={'Description'}
          register1={'prescription'} />}
      </section>
    </Modal.Body>
    <Modal.Footer>
      <Button className='close--btn' variant="dark" onClick={() => handleClose()}>
        Close
      </Button>
      <Button className="assign--btn" onClick={handleSubmit(complete_appoint)}>
        Checkout
      </Button>
    </Modal.Footer>
  </Modal >
}

export default DoctorOperation;