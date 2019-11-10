"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import AuthorActions from '../actions/authorActions';
import {UpdateButton} from './update';
import {DeleteButton} from './delete';
import {CreateButton} from './create';

export class AuthorList extends React.Component{

    createAuthorRow(author){
        return (
            <tr key={author.authorId}>
                  <td> {author.authorId} </td>
                <td> {author.authorName} </td>
                <td> <UpdateButton></UpdateButton> <DeleteButton></DeleteButton></td>
            </tr>
        );
    }

    componentDidMount(){
        AuthorActions.readAuthors();
    }

    render() {
        
        let content = '';

        if(this.props.author.readState.pending){
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }
        
        if(this.props.author.readState.success){
            content = 
                (<table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Author Name</th>
                            <th>Activities</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.author.authorList.map(this.createAuthorRow, this)}
                    </tbody>    
                </table>)
        }

        if(this.props.author.readState.failure){
            content = 
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading authors!
                </div>
            )
        }

        return(
            <div>
                <h2>Authors</h2>
                <h4><CreateButton></CreateButton></h4>
                {content}
            </div>
        );
    }
}

AuthorList.propTypes = {
    author: PropTypes.object.isRequired
};



