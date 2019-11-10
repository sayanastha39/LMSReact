"use strict"

import React from 'react';
import {Modal} from 'react-bootstrap';
import {createBooks} from '../actions/bookActions';
//Functional Component
   export const CreateButton = () => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
      event.preventDefault();

    let book = {
      title: event.target.title.value,
      authId: event.target.authId.value,
      pubId: event.target.pubId.value
    }
    console.log(book);
    createBooks(book);
  }

    return(
            <React.Fragment> 
            <button type="button" className="btn-success" onClick={handleShow}>+ Click to Create</button>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Create Book</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <form onSubmit = {handleSubmit}>
                                <label>
                                    Title  :  
                                    <input type="text" name="title" />
                                </label>
                                <br></br>
                                <label>
                                    Author Id  :  
                                    <input type="text" name="authId" />
                                </label>
                                <br></br>
                                <label>
                                    Publisher Id  : 
                                    <input type="text" name="pubId" />
                                </label>
                                <br></br>
                                <br></br>

                                <button variant="primary" onClick={handleClose}>
                          Save Changes
                        </button>
                            </form>

                          </Modal.Body>
                      <Modal.Footer>
                       
                      </Modal.Footer>
                    </Modal>
                    </React.Fragment>
    
        );
        }