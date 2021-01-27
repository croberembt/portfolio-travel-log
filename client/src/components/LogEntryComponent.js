import React, { useState } from 'react'; 
import { useForm } from 'react-hook-form'; 
import { createLogEntry } from '../api'; 

const LogEntryComponent = ({ location, onClose }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true); 
      data.latitude = location.latitude;
      data.longitude = location.longitude; 
      const created = await createLogEntry(data);
      console.log(created); 
      onClose(); 
    } catch (error) {
      console.error(error); 
      setError(error.message); 
      setLoading(false);
    } 
  };

  return (
    <div className='container'>
      <div className='row'>
          <form onSubmit={handleSubmit(onSubmit)} className='log-entry-form'>
            {
              error ? 
              <div className='col-12'>
                <h4 className='error'>{error}</h4>
              </div>
              :
              null
            }
            <div className='col-12'>
              <div className='form-group'>
                <input className='form-control' style={{marginTop: '2rem'}} type='text' name='title' placeholder='Name your vacation...' required ref={register} />
              </div>
            </div>
            <div className='col-12'>
              <div className='form-group'>
                <textarea className='form-control' name='description' rows='4' placeholder='Describe your vacation in three sentences or less...' required ref={register} />
              </div>
            </div>
            <div className='col-12'>
              <div className='form-group'>
                <input className='form-control' type='number' name='vacation_rating' placeholder='Rate your vacation 1-10...' ref={register} />
              </div>
            </div>
            <div className='col-12'>
              <div className='form-group'>
                <input className='form-control' style={{marginBottom: '2rem'}} type='text' name='image' placeholder='Link to your vacation photo here...' ref={register} />
              </div>
            </div>
            <div className='col-12 text-center'>
              <button disabled={loading} className='btn btn-success' style={{marginBottom: '1rem'}}>
                { 
                  loading ? 
                  'Loading...'
                  :
                  'Submit New Entry'
                }
              </button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default LogEntryComponent;