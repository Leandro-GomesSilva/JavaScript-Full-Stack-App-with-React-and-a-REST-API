// Importing React related modules
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Importing the Consumer object from the instance of the Context API
import Context from '../Context';

const UserSignOut = () => {
    
    /*  Using this Hook in order to avoid the error
        'React Hook "useEffect" cannot be called inside a callback'
        that happens when implementing the useEffect Hook inside
        the callback function of:
        <Consumer>
        { context => {
            useEffect( () =>  context.actions.signOut() );
    */
    const context = useContext(Context);
    
    /*  Using this Hook to avoid the error
        'Cannot update during an existing state transition (such as within `render`)...'
    */
    useEffect( () => context.actions.signOut() );  // Call the signOut method from the Context API

    return (
        <Redirect to="/" />     // Redirects user to the default route
    );
}

export default UserSignOut;