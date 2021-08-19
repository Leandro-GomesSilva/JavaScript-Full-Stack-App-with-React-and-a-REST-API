// Importing React related modules
import React from 'react';

/*
 *  Forbidden Component
 *      This is a stateless functional component that renders a user friendly message
 *  saying the user may not access a page.
 */

const Forbidden = () => {
    
    return (
        <div className="wrap">
            <h2>Forbidden</h2>
            <p>Oh oh! You can't access this page.</p>
        </div>
    )
}

export default Forbidden;