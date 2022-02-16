import React, { useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';
import { getData, sendData } from '../../Utils/API';
import { exception_handler } from '../../Utils/Exception';
import Swal from 'sweetalert2';


const ApproveReject = ({ emailid, load_pending_data, isVerified }) => {
  const [loading, setLoading] = useState({
    approve: false,
    reject: false
  });


  let approve = async (id) => {
    setLoading({ approve: true, disapprove: false });
    await sendData('/users/approve', 'POST', { emailid: id }).then(() => {
      load_pending_data();
    }).catch(err => toast.error(exception_handler(err)));
  };
  let disapprove = async (id) => {
    setLoading({ approve: false, disapprove: true });
    try {
      let result = await getData(`/users/delete_user?id=${id}`, 'DELETE');
      if (result) load_pending_data();
    } catch (error) {
      toast.error(exception_handler(error));
    }
  };

  let alert_box = (id) => {
    return Swal.fire({
      title: 'Are you Sure to Confirm!',
      text: "It's seems the Account is not verified!",
      allowOutsideClick: false,
      confirmButtonText: "Proceed",
      showCancelButton: true,
      icon: "warning"
    }).then((val) => {
      if (val.isConfirmed) approve(id);
    })
  };


  return <>
    <button onClick={() => !isVerified ? alert_box(emailid) : approve(emailid)} className='btn btn_approve'>
      {loading.approve ? <ProcessSpinner size={20} border={'3px'} /> : <FaCheck />}
    </button> &nbsp;&nbsp;

    <button onClick={() => disapprove(emailid)} className='btn btn_disapprove'>
      {loading.disapprove ? <ProcessSpinner size={20} border={'3px'} /> : <FaTimes />}
    </button>
  </>
}

export default ApproveReject;