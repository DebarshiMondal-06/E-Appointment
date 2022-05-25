import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';
import { sendData } from '../../Utils/API';


const Approve_Reject = ({ setModalAssign, setViewData, items, reloadData }) => {
  const [loader, setLoader] = useState(false);

  const reject_appoint = (appoint_id, user_id) => {
    let data = {}
    data.doctor_assign = null;
    data.user_id = user_id;
    data.appoint_id = appoint_id;
    data.hospital_assign = null;
    data.appoint_status = 'reject';
    sendData('/appointment/approve', 'PUT', data).then(() => {
      reloadData();
      toast.success('Successfully Updated!');
    }).catch(() => {
      toast.error('Something went wrong!');
    })
  };

  const reject_box = (appoint_id, user_id) => {
    setLoader(true);
    return Swal.fire({
      title: 'Are you Sure to Reject!',
      text: `Appoint Id: #${appoint_id}`,
      allowOutsideClick: false,
      confirmButtonText: "Proceed",
      showCancelButton: true,
      icon: "warning",
    }).then((val) => {
      if (val.isConfirmed) reject_appoint(appoint_id, user_id)
      else setLoader(false)
    })
  };


  return <>
    <button className='approve--appoint btn' type='button' onClick={() => {
      setViewData(items)
      setModalAssign(true)
    }}>
      <span>Approve</span>
    </button> &nbsp;
    <button className='reject--appoint btn' type='button' onClick={() => {
      reject_box(items.appoint_id, items.user_id)
    }}>
      {loader ? <ProcessSpinner padding={'4px 20px'} size={'15px'} border={'2.6px'} color={'red'} /> : 'Reject'}
    </button>
  </>
}

export default Approve_Reject;