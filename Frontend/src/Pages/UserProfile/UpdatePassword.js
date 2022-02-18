import React from 'react'
import { useForm } from 'react-hook-form';
import Inputs from '../../Components/Inputs/Input';


const UpdatePassword = () => {
  const { handleSubmit, formState: { errors }, register, watch, setValue } = useForm();

  let updatePass = (data) => {
    console.log(data);
  };



  return <form className='password--form' onSubmit={handleSubmit(updatePass)}>
    <section className='row'>
      {<Inputs errors={errors} register={register} name1={'Current Password'} register1={'current'} />}
      {<Inputs errors={errors} register={register} name1={'New Password'} register1={'password'} />}
      {<Inputs errors={errors} register={register} name1={'Verify Password'} register1={'veirfy'} />}
    </section>
    <button className='btn update--btn'>
      Update
    </button>
  </form>
}

export default UpdatePassword