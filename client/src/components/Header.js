// Importing React related modules
import React from 'react';
import { NavLink } from 'react-router-dom';

// Importing the Consumer object from the instance of the Context API
import { Consumer } from '../Context';

/*
 *  Header Component
 *      This is a stateless functional component that renders the header of the application,
 *  containing the sign-in and sign-up buttons (if there's not an authenticated user) or the 
 *  user's name and the sign-out button (if there's an authenticated user).
 */

const Header = () => {
    return (
        <Consumer>
            { context => {
                return (
                    <header>
                        <div className="wrap header--flex">
                            <h1 className="header--logo"><NavLink to="/">Courses</NavLink></h1>
                            <nav>
                                { context.authenticatedUser ? (
                                    <ul className="header--signedin">
                                        <li>{`Welcome, ${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`}</li>
                                        <li><NavLink to="/signout">Sign Out</NavLink></li>
                                    </ul>
                                ) : (
                                    <ul className="header--signedout">
                                        <li><NavLink to="/signup">Sign Up</NavLink></li>
                                        <li><NavLink to="/signin">Sign In</NavLink></li>
                                    </ul>
                                )}
                            </nav>
                        </div>
                    </header>
                );
            }}
        </Consumer>
    )
}

export default Header;