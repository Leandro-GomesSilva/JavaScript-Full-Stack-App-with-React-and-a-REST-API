// Importing React related modules
import React from 'react';

/*
 *  NotFound Component
 *      This is a stateless functional component that renders a user friendly message
 *  in case a requested page cannot be found.
 */

const NotFound = () => {
    
    return (
        <div className="wrap">
            <h2>Not Found</h2>
            <p>Sorry! We couldn't find the page you're looking for.</p>
        </div>
    )
}

export default NotFound;