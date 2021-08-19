// Importing React related modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing the instance of the Context API
import Context from '../Context';

class UserSignIn extends Component {
    
    static contextType = Context;   // Granting access to Context

    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    // This method handles the behavior of the submit event of the form
    handleSubmit = (e) => {
        e.preventDefault();

        this.context.actions.signIn(this.state.emailAddress, this.state.password)
            .then( user => {
                if (user === null) {
                    this.setState(() => {
                        return { errors: [ 'Sign-in failed' ] };
                    });
                    console.log(this.props)
                } else {
                    this.props.location.state ?
                        this.props.history.push(this.props.location.state.previousLocation)
                        :
                        this.props.history.goBack();

                    console.log(`Success! ${this.context.authenticatedUser.firstName} ${this.context.authenticatedUser.lastName} is logged in.`);
                }
            })
            .catch( () => {
                this.props.history.push("/error");
            });
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
    
    render() {
        // Storing state properties into variables
        const {
            emailAddress,
            password,
            errors,
        } = this.state;

        return (
            <div className="form--centered">
                <h2>Sign In</h2>
                <form onSubmit={this.handleSubmit}>
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
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={this.handleCancelButton}>Cancel</button>
                </form>
                { 
                    errors.length > 0 ?
                    <div className="validation--errors"><h3>{errors}</h3></div>
                    :
                    null
                }
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            
            </div>
        );
    }
}

export default UserSignIn;