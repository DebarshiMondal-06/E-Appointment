import React, { useState } from 'react'
import ProcessSpinner from '../Spinners/ProcessSpinner';
import { Inputs, TextBox } from '../Inputs/Input';
import { useForm } from 'react-hook-form';



const FooterContact = () => {
  const { handleSubmit, formState: { errors }, register } = useForm();
  const [load] = useState(false);


  const submit_data = (e) => {

  }



  return <form className="doctors--add--form card shadow" onSubmit={handleSubmit(submit_data)}>
    <h2 className='mb-3'>Contact Here</h2>

    <section className='row' style={{ marginBottom: -25 }}>
      {<Inputs col={12} isreadable={false} errors={errors} register={register} name1={'Email'} register1={'concern'} />}
    </section>

    <section className='row'>
      {<TextBox errors={errors} register={register} name1={'Description'} register1={'description'} />}
    </section>

    <button className="btn contact--btn">
      {
        load ? <ProcessSpinner /> : 'Submit'
      }
    </button>
  </form>
}

export default FooterContact;