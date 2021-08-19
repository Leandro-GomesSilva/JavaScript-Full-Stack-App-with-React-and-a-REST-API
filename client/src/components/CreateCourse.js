// Importing React related modules
import React, { Component } from 'react';

// Importing the instance of the Context API
import Context from '../Context';

/*
 *  CreateCourse Component
 *      This is a stateful class component that renders a form to create a new course.
 *      It also renders a button to send a POST request to the REST API and another
 *  button tha returns the user to the main route.
 *      It is accessed via a Private Route.
 */

export default class CreateCourse extends Component {
    
    static contextType = Context;   // Granting access to Context

    state = {
        courseTitle: '',
        courseDescription: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
    }

    // Handles 'value' changes for the 4 input and textarea tags of this component
    handleValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    // Handles the 'cancel' button, sending the user back to the main route
    handleCancelButton = (e) => {
        e.preventDefault();
        this.props.history.push("/");
    }

    // Sends a POST request to the REST API
    handleSubmit = (e) => {
        e.preventDefault();

        const newCourse = {             // Stores the new course data in an object
            title: this.state.courseTitle,
            description: this.state.courseDescription,
            estimatedTime: this.state.estimatedTime,
            materialsNeeded: this.state.materialsNeeded,
            userId: this.context.authenticatedUser.id,
        }

        const authenticatedUser = {     // Stores user data in an object
            username: this.context.authenticatedUser.emailAddress,
            password: this.context.authenticatedUser.password,
        }
        
        this.context.data.createCourse(newCourse, authenticatedUser)    // Calls the API route
            .then( errorsArray => {
                if (errorsArray.length === 0) {         // If no errors are returned, redirects to main route
                    this.props.history.push("/");
                } else {                                // If the API return an errors array...
                    const errors = errorsArray.map( (error, index) => {
                        return (
                        <li key={index}>{error}</li>    // ... builds corresponding JSX HTML li elements for each error in the array...
                        );
                    });
                    this.setState({ errors });          // ... and stores the error messages array in the State
                }
            })
            .catch( () => {
                this.props.history.push("/error");      // If any errors happen, redirects to 'error'
            });
    }

    render() {
        const {
            courseTitle,
            courseDescription,
            estimatedTime,
            materialsNeeded,
            errors,
        } = this.state;     // Storing state properties into variables
        
        return (
            <div className="wrap">
                <h2>Create Course</h2>
                
                {/** If there are errors in the errors array, displays an errors list */}
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
                <form>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input 
                                id="courseTitle" 
                                name="courseTitle" 
                                type="text" 
                                value={courseTitle}
                                onChange={this.handleValueChange} />
                            <p>By {`${this.context.authenticatedUser.firstName} ${this.context.authenticatedUser.lastName}`}</p>
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={courseDescription} onChange={this.handleValueChange}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                                id="estimatedTime" 
                                name="estimatedTime" 
                                type="text" 
                                value={estimatedTime}
                                onChange={this.handleValueChange} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={this.handleValueChange}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit" onClick={ (e) => this.handleSubmit(e) }>Create Course</button>
                    <button className="button button-secondary" onClick={this.handleCancelButton}>Cancel</button>
                </form>
            </div>
        );
    }
}