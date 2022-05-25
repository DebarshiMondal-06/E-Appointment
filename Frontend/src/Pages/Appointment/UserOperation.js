import React, { useContext, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { RiEdit2Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner'
import { sendData } from '../../Utils/API'
import { createGlobalContext } from '../../Utils/GlobalContext'

const UserOperation = ({ items, reloadData }) => {
  const { setViewData } = useContext(createGlobalContext);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const delete_appointment = (user_id, appoint_id) => {
    setDeleteLoader(true);
    sendData('/appointment/delete', 'DELETE', { user_id, appoint_id }).then(() => {
      reloadData();
      setDeleteLoader(true);
      toast.success('Successfully Updated!');
    }).catch(() => {
      setDeleteLoader(false);
      toast.error('Something went wrong!');
    })
  }

  return <>

    {
      items.appoint_status === 'reject' ? <button className='btn btn-danger' type='button' onClick={() => delete_appointment(items.user_id, items.appoint_id)}>
        {deleteLoader
          ? <ProcessSpinner padding={'4px 20px'} size={15} border={'2.4px'} />
          : <FaTrashAlt size={16} color="#fff" />}
      </button> : <Link to="/dashboard/book_edit" onClick={() => setViewData(items)}>
        <button className='btn btn-info' type='button'>
          <span><RiEdit2Fill size={18} color="#fff" /></span>
        </button>
      </Link>
    }
  </>
}

export default UserOperation;