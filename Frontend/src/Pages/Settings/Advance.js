import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import SelectBox from '../../Components/Inputs/SelectBox';
import { TextBox } from '../../Components/Inputs/Input';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';
import { Link } from 'react-router-dom';


const Advance = () => {
  const { handleSubmit, formState: { errors }, register } = useForm();
  const [loader] = useState(false);

  let delete_reason = [
    { id: 1, reason: "I've a duplicate account" },
    { id: 1, reason: "I have a privacy concern" },
    { id: 1, reason: "No value from service" },
    { id: 1, reason: "Other" },
  ]

  const delete_account = (data) => {
    console.log(data);
  }


  return <section className='delete--setting'>
    <p className='text--top'>Advance Setting</p>
    <article className='card shadow user--delete--section'>
      <div className='text'>
        <h4>Delete Your Account!</h4>
        <h6>We're sorry to see you go.</h6>
      </div>
      <div className='before--you--go'>
        <h5>Before you go -</h5>
        <ul>
          <li className='mb-1'><b style={{ color: "#000" }}>We'll only retain your data for 30days</b> and then it will be permanently delete.</li>
          <li>You can reactivate your account at any point within 30days by logging back in.</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(delete_account)} >
        <section className='row'>
          {<SelectBox col={4} errors={errors} register={register} name1={'Reason'} register1={'reason'}
            data={[delete_reason, 'reason']} />}
        </section>
        <section className='row'>
          {<TextBox errors={errors} register={register} register1={'feedback'}
            name1={`Your Feedback matters. Is there anything else you'd like us to know?`} />}
        </section>
        <div className='btns--operate'>
          <Link to="/dashboard"><button className='btn btn--keep'>No, Keep account!</button></Link>
          <button className='btn btn--delete'>{loader ? <ProcessSpinner padding={'4px 20px'} /> : 'Yes, Delete account!'}</button>
        </div>
      </form>
    </article>
  </section >
}

export default Advance;