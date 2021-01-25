import React from 'react'; 
import { Form, Input, FormGroup, Button } from 'reactstrap'; 
import { useForm } from 'react-hook-form'; 

const LogEntryComponent = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup style={{marginTop: '1.5rem'}}>
                            <Input type='text' name='form-title' id='form-title' placeholder='Put your vacation title here.' required ref={register} />
                        </FormGroup>
                        <FormGroup>
                            <Input type='textarea' name='form-description' required rows={4} placeholder='Describe your vacation here...' ref={register} />
                        </FormGroup>
                        <FormGroup>
                            <Input type='number' name='form-rating' placeholder='Rate your vacation with a number 1-10.' ref={register} />
                        </FormGroup>
                        <FormGroup>
                            <Input type='text' name='form-image' placeholder='Input a link to your vacation photo here... ' ref={register} />
                        </FormGroup>
                        <Button color='success'>Submit New Entry</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LogEntryComponent;