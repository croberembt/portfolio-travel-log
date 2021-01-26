import React from 'react'; 
import { Form, Input, FormGroup, Button, Label } from 'reactstrap'; 
import { useForm } from 'react-hook-form'; 
import { createLogEntry } from '../api'; 

const LogEntryComponent = ({ location }) => {

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      data.latitude = location.latitude;
      data.longitude = location.longitude; 
      const created = await createLogEntry(data);
      console.log(created); 
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <form onSubmit={handleSubmit(onSubmit)} className='log-entry-form'>
              <input type='text' name='title' id='form-title' placeholder='Put your vacation title here.' required ref={register} />
              <input type='textarea' name='description' required rows={4} placeholder='Describe your vacation here...' ref={register} />
              <input type='number' name='vacation_rating' placeholder='Rate your vacation with a number 1-10.' ref={register} />
              <input type='text' name='image' placeholder='Input a link to your vacation photo here... ' ref={register} />
            <button color='success'>Submit New Entry</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogEntryComponent;