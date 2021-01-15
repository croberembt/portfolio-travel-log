import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { Button } from 'reactstrap'; 

const LogModalComponent = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-wrapper" aria-modal aria-hidden role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <Button type="button" data-dismiss="modal" aria-label="close modal" onClick={hide}>
                    <span aria-hidden="true">x</span>
                    </Button>
                </div>
                <div className='modal-body'>
                    <p>Hello I am a modal</p>
                </div>
            </div>
        </div>
    </React.Fragment>, document.body
  ) : null;

export default LogModalComponent; 