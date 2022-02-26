import React, { useContext } from 'react'
import { createGlobalContext } from '../../Utils/GlobalContext';
import { Modal, Button } from 'react-bootstrap';
import Inputs from '../../Components/Inputs/Input';
import { useForm } from 'react-hook-form';
import SelectBox from '../../Components/Inputs/SelectBox';
import { district_data, state_data } from '../../Utils/data';


const EditProfile = () => {
  const { viewData, viewModal, setViewModal } = useContext(createGlobalContext);
  let { emailid, name, phone, dob, state, district, pincode } = viewData || {};
  const { handleSubmit, formState: { errors }, register, watch, setValue } = useForm();
  let handleClose = () => {
    setViewModal(false);
  };


  let getState = watch('state');
  if (!getState) setValue('district', null);

  let submit = (data) => {
    console.log(data);
  }

  return <Modal show={viewModal} size="lg" className='view--modal' onHide={handleClose} backdrop="static"
    keyboard={false} centered>
    <Modal.Header closeButton>
      <Modal.Title>Edit Profile
        <br />
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='edit--profile'>
      <section className='row'>
        {<Inputs value={name} errors={errors} register={register} name1={'Name'} register1={'name'} />}
        {<Inputs value={phone} errors={errors} register={register} name1={'Phone'} register1={'phone'} />}
      </section>
      <section className='row'>
        {<Inputs value={dob} errors={errors} register={register} name1={'DOB'} register1={'dob'} />}
        {<SelectBox errors={errors} register={register} name1={'State'} register1={'state'}
          data={[state_data, 'state']} />}
      </section>
      <section className="row">
        {<SelectBox errors={errors} register={register} name1={'District'} register1={'district'}
          data={[district_data, 'district']} message={!getState ? 'Choose State First' : null} />}
      </section>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="dark" onClick={handleClose}>
        Close
      </Button>
      <Button variant="success" onClick={handleSubmit(submit)}>
        Update
      </Button>
    </Modal.Footer>
  </Modal>
}

export default EditProfile