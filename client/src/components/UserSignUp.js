import React, { Component } from 'react';

export default class UserSignIn extends Component {
    state = {
        firstName: '',
        lastName: '',
        userEmail: '',
        password: '',
        confirmedPassword: '',
        errors: [],
    }

    render() {
        // Storing state properties into variables
        const {
            firstName,
            lastName,
            userEmail,
            password,
            confirmedPassword,
            errors,
        } = this.state;

        return (
            <div className="form--centered">
                <h2>Sign Up</h2>
                
                <form>
                    <label>First Name</label>
                    <input 
                        id="firstName" 
                        name="firstName" 
                        type="text" 
                        value={firstName} />
                    <label>Last Name</label>
                    <input 
                        id="lastName" 
                        name="lastName" 
                        type="text" 
                        value={lastName} />
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
                    <label>Confirm Password</label>
                    <input 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        value={confirmedPassword} />
                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
                <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
            </div>
        );
    }
}