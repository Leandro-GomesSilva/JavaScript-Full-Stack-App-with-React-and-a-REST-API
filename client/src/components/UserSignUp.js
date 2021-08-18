// Importing React related modules
import React, { Component } from 'react';

// Importing the instance of the Context API
import Context from '../Context';

export default class UserSignIn extends Component {

    static contextType = Context;   // Granting access to Context

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: [],
    }

    // This method handles 'value' changes for the 4 input and textarea tags of this component
    handleValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // This method handles the 'cancel' button, sending the user back to the previous route.
    handleCancelButton = (e) => {
        e.preventDefault();
        this.props.history.goBack();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        if (this.state.password === this.state.confirmPassword) {
            const newUser = { 
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailAddress: this.state.emailAddress,
                password: this.state.password,
            }
            
            this.context.data.createUser(newUser)
                .then( errorsArray => {
                    if (errorsArray.length === 0) {
                        this.props.history.push("/");
                    } else {
                        const errors = errorsArray.map( (error, index) => {
                            return (
                            <li key={index}>{error}</li>
                            );
                        });
                        this.setState({ errors });
                    }
                })
        } else {
            this.setState({ errors: [ 'Passwords do not match' ] });
        }
    }

    render() {
        // Storing state properties into variables
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors,
        } = this.state;

        return (
            <div className="form--centered">
                <h2>Sign Up</h2>
                { errors.length > 0 ?
                    (
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            { errors }
                        </ul>
                    </div>
                    ) : ( null )
                }
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        id="firstName" 
                        name="firstName" 
                        type="text" 
                        value={firstName}
                        onChange={this.handleValueChange} />
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        id="lastName" 
                        name="lastName" 
                        type="text" 
                        value={lastName}
                        onChange={this.handleValueChange} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="email" 
                        value={emailAddress}
                        onChange={this.handleValueChange} />
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={password}
                        onChange={this.handleValueChange} />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        value={confirmPassword}
                        onChange={this.handleValueChange} />
                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={(e) => this.handleCancelButton(e)}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
            </div>
        );
    }
}