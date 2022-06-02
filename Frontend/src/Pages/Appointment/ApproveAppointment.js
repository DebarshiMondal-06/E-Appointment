/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SelectBox from '../../Components/Inputs/SelectBox';
import { getData, sendData } from '../../Utils/API';
import { createGlobalContext } from '../../Utils/GlobalContext';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';
import { useCookies } from 'react-cookie';

const ApproveAppoint = ({ modalAssign, setModalAssign, reloadData }) => {
  const { viewData, setViewData } = useContext(createGlobalContext);
  const { handleSubmit, formState: { errors }, register, watch, setValue } = useForm();
  const [hospital, setHospital] = useState([]);
  const [doctor, setDoctors] = useState([]);
  const [pincode, setPincode] = useState('');
  const [loader, setLoader] = useState(false);
  const [cookie] = useCookies();
  let handleClose = () => {
    setViewData({});
    setModalAssign(false);
    setPincode('');
    setValue('hospital_assign', null);
  };
  const get_hospital_id = watch('hospital_assign');
  const { jwtToken } = cookie.token;


  const get_possible_hospital = async (pincode) => {
    try {
      setValue('doctor_assign', null);
      setLoader(true);
      const result = await getData(`/hospital/pincode?pincode=${pincode}`, 'GET', jwtToken);
      let { message: { Items } } = result.data || {};
      if (Items) {
        setLoader(false);
        setHospital(Items)
      }
    } catch (error) {
      setLoader(false);
      toast.error('Something Went Wrong!');
    }
  };

  const get_doctors_to_hospital = (id) => {
    setLoader(true);
    getData(`/hospital/doctors?hospitalId=${id}`, 'GET', jwtToken).then((res) => {
      setLoader(false);
      let { message } = res.data;
      if (message && message.length > 0) setDoctors(message);
    }).catch(() => {
      setLoader(false);
      toast.error('Something went wrong!');
    })
  };

  useEffect(() => {
    if (viewData.user_id) {
      setLoader(true);
      getData(`/users/profile?id=${viewData.user_id}`, 'GET', jwtToken).then((res) => {
        let { message: { Item } } = res.data;
        if (Item) setPincode(Item.pincode);
        setLoader(false);
      })
    }
  }, [viewData.user_id]);

  useEffect(() => {
    if (pincode) get_possible_hospital(pincode);
    if (get_hospital_id) get_doctors_to_hospital(get_hospital_id);
  }, [pincode, get_hospital_id]);


  const approve_appoint = (data) => {
    let { emailid } = doctor.find((items) => items.fullname === data.doctor_assign);
    data.doctor_assign = emailid;
    data.user_id = viewData.user_id;
    data.appoint_id = viewData.appoint_id;
    data.appoint_status = 'active';
    sendData('/appointment/approve', 'PUT', data, jwtToken).then(() => {
      reloadData();
      toast.success('Successfully Updated!');
      handleClose();
    }).catch((err) => {
      console.log(err);
      toast.error('Something went wrong!');
    })
  }

  return <Modal show={modalAssign} size="lg" className='view--modal' backdrop="static"
    keyboard={false} centered>
    <Modal.Header>
      <Modal.Title>
        Approve Appointment
        <p>Appoint ID: <span style={{ textTransform: "lowercase" }}>{viewData.appoint_id}</span></p>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='edit--profile'>
      {
        loader ? <ProcessSpinner padding={'4px 20px'} size={'30px'} border={'3px'} color={'#00bfa6'} /> : <>
          <article>
            <p>Conern: <span> {viewData.concern}</span></p>
            <p>Pincode: <span> {pincode}</span></p>
            <p><big><u> Assign Hospital & Doctor</u></big></p>
          </article>

          {(!loader && !hospital.length > 0) ? <h5 className='mb-3 p-2 badge bg-info'>No Hospital Data Found!</h5> : null}
          {(get_hospital_id && !doctor.length > 0) ? <h5 className='mb-3 p-2 badge bg-info'>No Doctors Found!</h5> : null}

          <section className='row'>
            {<SelectBox errors={errors} register={register} name1={'Hospital'} register1={'hospital_assign'}
              data={[hospital, 'hospitalId']} />}
            {<SelectBox errors={errors} register={register} name1={'Doctor'} register1={'doctor_assign'}
              data={[doctor, 'fullname']} />}
          </section></>
      }


    </Modal.Body>
    <Modal.Footer>
      <Button className='close--btn' variant="dark" onClick={() => handleClose()}>
        Close
      </Button>
      <Button className="assign--btn" onClick={handleSubmit(approve_appoint)}>
        Approve
      </Button>
    </Modal.Footer>
  </Modal >
}

export default ApproveAppoint;