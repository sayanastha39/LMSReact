"use strict"

import React from 'react';
import {Modal} from 'react-bootstrap';
import {deleteBooks} from '../actions/bookActions';

//Functional Component
   export const DeleteButton = (props) => {

    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("hkhehf");
      console.log(props.bookId);
      deleteBooks(props.bookId);
    }

       return (
        <React.Fragment>
            <button type="button" className="btn-danger" onClick={handleShow}>Delete</button>
            <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Book</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <form onSubmit = {handleSubmit}>
                          Are you sure you want to delete?
                          <br></br>
                          <br></br>
                          <button variant="secondary" onClick={handleClose}>
                         YES
                        </button>
                        </form>
                          </Modal.Body>
                      <Modal.Footer>
                        
                      </Modal.Footer>
                    </Modal>
                    </React.Fragment>
        );
        }