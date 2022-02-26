import React, { useContext } from 'react'
import { createGlobalContext } from '../../Utils/GlobalContext';
import { Modal, Button } from 'react-bootstrap';
import Inputs from '../../Components/Inputs/Input';
import { useForm } from 'react-hook-form';
import SelectBox from '../../Components/Inputs/SelectBox';
import { district_data, state_data } from '../../Utils/data';
import { sendData } from '../../Utils/API';
import { toast } from 'react-toastify';
import moment from 'moment';


const EditProfile = ({ emailid }) => {
  const { viewData, viewModal, setViewModal } = useContext(createGlobalContext);
  let { fullname, phone, dob, given_state, district } = viewData || {};
  const { handleSubmit, formState: { errors }, register, watch, setValue } = useForm();
  let handleClose = () => {
    setViewModal(false);
  };


  let getState = watch('given_state');
  if (!getState) setValue('district', null);
  if (!getState && given_state) setValue('district', district);
  if (dob) setValue('dob', moment(dob).format('YYYY-MM-DD'));


  let submit = async (data) => {
    try {
      let { pincode } = district_data.find((items) => items.district === data.district);
      data.pincode = pincode;
      data.emailid = emailid;
      await sendData('/users/profile', 'PUT', data);
      toast.info('Profile Updated!');
      setTimeout(() => {
        window.location.reload();
      }, 1500)
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };


  return <Modal show={viewModal} size="lg" className='view--modal' onHide={handleClose} backdrop="static"
    keyboard={false} centered>
    <Modal.Header closeButton>
      <Modal.Title>Edit Profile
        <br />
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='edit--profile'>
      <section className='row'>
        {<Inputs value={fullname} errors={errors} register={register} name1={'Name'} register1={'fullname'} />}
        {<Inputs value={phone} errors={errors} register={register} name1={'Phone'} register1={'phone'} />}
      </section>
      <section className='row'>
        {<Inputs type={'date'} errors={errors} register={register} name1={'DOB'} register1={'dob'} />}
        {<SelectBox value={given_state} errors={errors} register={register} name1={'State'} register1={'given_state'}
          data={[state_data, 'state']} />}
      </section>
      <section className="row">
        {<SelectBox value={district} errors={errors} register={register} name1={'District'} register1={'district'}
          data={[district_data, 'district']} message={(!getState && !given_state) ? 'Choose State First' : null} />}
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