"use strict"

import React from 'react';
import {Modal} from 'react-bootstrap';

import {updateBooks} from '../actions/bookActions';

//Functional Component; handle set, close are for showing and cllsing modal
   export const UpdateButton = (props) => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
      event.preventDefault();

      let book = {
        bookId: props.book.bookId,
        title: event.target.title.value,
        authId: event.target.authId.value,
        pubId: event.target.pubId.value
      }
      console.log(book);
      updateBooks(book);
    }
       return (
        <React.Fragment>
            <button type="button" className="btn-primary" onClick={handleShow}>Update</button>
            <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Book</Modal.Title>
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
                                    <input type="number" name="authId" />
                                </label>
                                <br></br>
                                <label>
                                    Publisher Id  : 
                                    <input type="number" name="pubId" />
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
        