// Importing React related modules
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Importing the instance of the Context API
import { Consumer } from '../Context';

const PrivateRoute = ({ component: Component, ...rest }) => {   // Renames the component prop into Component and pass all further variables to the variable rest
    return (
        <Consumer>
            { context => (      // Subscribes the Private Route to Context 
                <Route
                { ...rest }     // Destructures and passes all elements of the variable 'rest' to the Private Route as props
                render={ props => 
                    context.authenticatedUser ?  // Checks if there is an authenticated user
                    ( <Component {...props} />  // If yes, renders the protected component
                    ) : (
                    <Redirect to='/signin' />   // If not, redirects the user to the 'signin' route
                    )
                } />
            )}
        </Consumer>
    );
};

export default PrivateRoute;