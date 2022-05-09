/*  eslint-disable react-hooks/exhaustive-deps  */
import React, { useContext, useEffect, useState } from 'react'
import { createGlobalContext } from '../../Utils/GlobalContext';
import { Modal, Button } from 'react-bootstrap';
import { Inputs } from '../../Components/Inputs/Input';
import { useForm } from 'react-hook-form';
import SelectBox from '../../Components/Inputs/SelectBox';
import { district_data, state_data } from '../../Utils/data';
import { sendData } from '../../Utils/API';
import { toast } from 'react-toastify';
import moment from 'moment';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';


const EditProfile = ({ emailid }) => {
  const { viewData, viewModal, setViewModal } = useContext(createGlobalContext);
  let { fullname, phone, dob, given_state, district } = viewData || {};
  const [updateLoader, setUpdateLoader] = useState(false);
  const { handleSubmit, formState: { errors }, register, setValue, watch } = useForm();
  let handleClose = () => {
    setViewModal(false);
  };


  // if (!getState && given_state) setValue('district', district);
  let getState = watch('given_state');
  if (!getState) setValue('district', null);
  if (dob) setValue('dob', moment(dob).format('YYYY-MM-DD'));
  useEffect(() => {
    if (given_state && district) {
      setValue('given_state', given_state);
      setValue('district', district);
    }
  }, [given_state, district])


  let submit = async (data) => {
    let { pincode } = district_data.find((items) => items.district === data.district || district);
    data.pincode = pincode;
    data.emailid = emailid;
    data.given_state = 'Odisha';
    if (district) data.district = district;
    try {
      setUpdateLoader(true);
      await sendData('/users/profile', 'PUT', data);
      setUpdateLoader(false);
      toast.info('Profile Updated!');
      setTimeout(() => {
        window.location.reload();
      }, 1500)
    } catch (error) {
      setUpdateLoader(false);
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
      {
        viewData && (!given_state && !district) ? <section className="row">
          {<SelectBox value={given_state} errors={errors} register={register} name1={'State'} register1={'given_state'}
            data={[state_data, 'state']} />}
          {<SelectBox errors={errors} register={register} name1={'District'} register1={'district'}
            data={[district_data, 'district']} message={(!getState && !given_state) ? 'Choose State First' : null} />}
        </section> : null
      }
      <section className='row'>
        {<Inputs type={'date'} errors={errors} register={register} name1={'DOB'} register1={'dob'} />}
      </section>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="dark" onClick={handleClose}>
        Close
      </Button>
      <Button variant="success" onClick={handleSubmit(submit)}>
        {updateLoader ? <ProcessSpinner padding={'0px 25px'} size={'22px'} border={'3px'} /> : 'Update'}
      </Button>
    </Modal.Footer>
  </Modal>
}

export default EditProfile