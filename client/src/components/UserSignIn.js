import React, { Component } from 'react';

export default class UserSignIn extends Component {
    state = {
        userEmail: '',
        password: '',
        errors: [],
    }

    render() {
        // Storing state properties into variables
        const {
            userEmail,
            password,
            errors,
        } = this.state;

        return (
            <div className="form--centered">
                <h2>Sign In</h2>
                
                <form>
                    <label>Email Address</label>
                    <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="email" 
                        value={userEmail} />
                    <label>Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={password} />
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>
            
            </div>
        );
    }
}