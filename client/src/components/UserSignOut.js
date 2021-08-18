// Importing React related modules
import React from 'react';
import { Redirect } from 'react-router-dom';

// Importing the Consumer object from the instance of the Context API
import { Consumer } from '../Context';

const UserSignOut = () => {
    return (
        <Consumer>
        { context => {
            context.actions.signOut();    // Call the signOut method from the Context API
    
            return (
                <Redirect to="/" />     // And then redirects user to the default route
            );
        }}    
        </Consumer>
    )
}

export default UserSignOut;