import React from 'react'; 
import { Form, Input, FormGroup } from 'reactstrap'; 

const LogEntryComponent = () => {
    return (
        <Form>
            <FormGroup>
                <Input type='text' name='form-title' id='form-title' placeholder='Put your vacation title here.' />
                <Input type='textarea' name='form-description' placholder='Describe your vacation here...' />
                <Input type='number' name='form-rating' placeholder='Rate your vacation with a number 1-10.' />
                <Input type='text' name='form-image' placeholder='Input a link to your vacation photo here... ' />
            </FormGroup>
        </Form>
    );
};

export default LogEntryComponent;