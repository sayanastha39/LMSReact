"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import {UpdateButton} from './update';
import {DeleteButton} from './delete';
import {CreateButton} from './create';

export class BookList extends React.Component{

    createBookRow(book){
        return (
            <tr key={book.bookId}>
                <td> {book.bookId} </td>
                <td> {book.title} </td>
                <td> {book.authId} </td>
                <td> {book.pubId} </td>
                <td> <UpdateButton book={book}></UpdateButton>  <DeleteButton bookId={book.bookId}/></td>
            </tr>
        );
    }


    // we have for read only cuz 
    //when they go to the book they want to always see the book table i.e. GET/ READ
    componentDidMount(){
        BookActions.readBooks();
    }

    render() {
        
        let content = '';
        
        //if pending show spiiner until loads
        if(this.props.book.readState.pending || this.props.book.createState.pending || this.props.book.updateState.pending || this.props.book.deleteState.pending){
           
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }
        

        //if success show table with content
        // is getting book data from DB {this.props.book.bookList.map(this.createBookRow, this)}
        if(this.props.book.readState.success){
            content = 
                (<table className="table table-dark table-hover" >
                    <thead>
                        <tr>
                            <th >ID </th>
                            <th>Title</th>
                            <th>AuthorId</th>
                            <th>PublisherId</th>
                            <th>Activities</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.book.bookList.map(this.createBookRow, this)}
                    </tbody>    
                </table>)
        }

        if(this.props.book.readState.failure){
            content = 
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading books!
                </div>
            )
        }

        return(
            <div>
                <h2> Books</h2>
                <h4><CreateButton></CreateButton></h4>
                {content}
            </div>
        );
    }
}

//for dveelopers to know these are props taht needs to be provided to render properly
BookList.propTypes = {
    book: PropTypes.object.isRequired
};



