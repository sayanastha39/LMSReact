"use strict"

import React from 'react';
import {Link} from 'react-router-dom';


//header is logo and two links books and home 
export class Header extends React.Component{
    render() {
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul className="list-inline">
                        <li className="list-inline-item"> 
                            <Link to="/" className="navbar-brand">
                                <img width="90px" height="30px" src="images/LMS.png" />
                            </Link>
                        </li>
                        <li className="list-inline-item"><Link to="/" replace>Home</Link></li>
                        <li className="list-inline-item"><Link to="/books" replace>Books</Link></li>
                        <li className="list-inline-item"><Link to="/authors" replace>Authors</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}