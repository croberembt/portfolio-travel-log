import React from 'react'; 
import { Form, Input, FormGroup, Button } from 'reactstrap'; 

const LogEntryComponent = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Form>
                        <FormGroup style={{marginTop: '1.5rem'}}>
                            <Input type='text' name='form-title' id='form-title' placeholder='Put your vacation title here.' required />
                        </FormGroup>
                        <FormGroup>
                            <Input type='textarea' name='form-description' required rows={4} placeholder='Describe your vacation here...' />
                        </FormGroup>
                        <FormGroup>
                            <Input type='number' name='form-rating' placeholder='Rate your vacation with a number 1-10.' />
                        </FormGroup>
                        <FormGroup>
                            <Input type='text' name='form-image' placeholder='Input a link to your vacation photo here... ' />
                        </FormGroup>
                        <Button color='success'>Submit New Entry</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LogEntryComponent;