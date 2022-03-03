import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SelectBox from '../../Components/Inputs/SelectBox';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';
import { getData, sendData } from '../../Utils/API';
import { createGlobalContext } from '../../Utils/GlobalContext';


const AssignHospital = ({ modalAssign, setModalAssign, reloadData }) => {
  const [loader, setLoader] = useState(false);
  const { viewData, setViewData } = useContext(createGlobalContext);
  const [hospital, setHospital] = useState([]);
  const { handleSubmit, formState: { errors }, register, setValue } = useForm();

  let handleClose = () => {
    setViewData({});
    setValue('hospitalname', null);
    setModalAssign(false);
  };

  const get_possible_hospital = async (pincode) => {
    try {
      setLoader(true);
      const result = await getData(`/hospital/pincode?pincode=${pincode}`);
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
  useEffect(() => {
    if (viewData.pincode) get_possible_hospital(viewData.pincode);
  }, [viewData.pincode]);


  const assign_hospital = async (data) => {
    try {
      let { hospitalname } = data;
      let { hospitalId } = hospital.find((items) => items.fullname === hospitalname);
      let Item = { hospitalId, doctorId: viewData.emailid }
      const result = await sendData('/hospital/assign', 'POST', Item);
      if (result) {
        toast.info('Successfully Assigned!');
        setModalAssign(false);
        setTimeout(() => {
          reloadData();
        }, 500);
      };
    } catch (error) {
      toast.error('Something Went Wrong!');
    }
  };


  return <Modal show={modalAssign} size="lg" className='view--modal' onHide={handleClose} backdrop="static"
    keyboard={false} centered>
    <Modal.Header>
      <Modal.Title>
        Assign Hospital
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='edit--profile'>
      <article>
        <p>Username: <span> {viewData.fullname}</span></p>
        <p>Pincode: <span> {viewData.pincode}</span></p>
        <p><big><u>Hospital</u></big></p>
      </article>
      {
        loader ? <ProcessSpinner color={'#00bfa6'} size={30} />
          : <>
            <section className='row'>
              <p>Avialable: <span className='text-danger'> {hospital.length}</span></p>
              {<SelectBox errors={errors} register={register} name1={'Select'} register1={'hospitalname'}
                data={[hospital, 'fullname']} />}
            </section></>
      }
    </Modal.Body>
    <Modal.Footer>
      <Button className='close--btn' variant="dark" onClick={handleClose}>
        Close
      </Button>
      <Button className="assign--btn" onClick={handleSubmit(assign_hospital)}>
        Submit
      </Button>
    </Modal.Footer>
  </Modal>
}

export default AssignHospital;