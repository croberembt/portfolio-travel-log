import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'; 

const LogModalComponent = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <Modal>
            <ModalHeader>
                <Button type="button" data-dismiss="modal" aria-label="close modal" onClick={hide}>x</Button>
            </ModalHeader>
            <ModalBody>
                <p>Hello I am a modal</p>
            </ModalBody>
        </Modal>
    </React.Fragment>, document.body
  ) : null;

export default LogModalComponent; 