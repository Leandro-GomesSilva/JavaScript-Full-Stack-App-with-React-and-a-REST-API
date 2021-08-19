// Importing React related modules
import React from 'react';

/*
 *  UnhandledError Component
 *      This is a stateless functional component that renders a user friendly message
 *  letting the user know that an unexpected error happened.
 */

const UnhandledError = () => {
    
    return (
        <div className="wrap">
            <h2>Error</h2>
            <p>Sorry! We just encountered an unexpected error.</p>
        </div>
    )
}

export default UnhandledError;