import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

// Creating and exporting a Context instance of the Context API
const Context = React.createContext();
export default Context;

// Creating and export a Provider Component
export class Provider extends Component {
    
    // Storing the authenticatedUser information in the app's global state
    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null     // If there is a Cookie of an authenticated user, it will be passed to the global state.
    }
    
    constructor() {
        super();    // Using the super keyword to have access to this object's parent
        this.data = new Data();   // Defining the property 'data' with a new 'Data' object
    }

    // Writing the method to sign-in a user
    signIn = async (username, password) => {
        const userCredentials = { username, password };     // Defining an object with the user credentials
        const user = await this.data.getUser(userCredentials);      // Calling the 'getUser' GET route

        // Checks if the API answered with a response status 401 (Unauthorized) i.e. returned "null"
        if (user != null) {
            // If it did not return 'null', passes the user to the Global State
            user.password = password;
            this.setState( () => {
                return {
                    authenticatedUser: user,
                }
            });
            // Setting a cookie
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });     // Setting cookie expiring date as one day from now
        }        
        return user;    // Returning the user data
    }

    // Writing the method to sign-in a user
    signOut = async () => {
        this.setState({ authenticatedUser: null });     // Removes the user object from the global State
        Cookies.remove('authenticatedUser');    // Cleans the cookie
    }

    render() {
        const value = {
            data: this.data,
            authenticatedUser: this.state.authenticatedUser,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
            },
        }
        
        return (
            <Context.Provider value={value}>
                { this.props.children }
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;