// Importing React related modules
import React, { Component } from 'react';

// Importing the instance of the Context API
import Context from '../Context';

export default class CreateCourse extends Component {
    
    static contextType = Context;   // Granting access to Context

    state = {
        courseTitle: '',
        courseDescription: '',
        estimatedTime: '',
        materialsNeeded: '',
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

    // The following method sends a POST request to the REST API
    handleSubmit = (e) => {
        e.preventDefault();

        const newCourse = { 
            title: this.state.courseTitle,
            description: this.state.courseDescription,
            estimatedTime: this.state.estimatedTime,
            materialsNeeded: this.state.materialsNeeded,
            userId: this.context.authenticatedUser.id,
        }

        const authenticatedUser = {
            username: this.context.authenticatedUser.emailAddress,
            password: this.context.authenticatedUser.password,
        }
        
        this.context.data.createCourse(newCourse, authenticatedUser)
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
    }

    render() {
        // Storing state properties into variables
        const {
            courseTitle,
            courseDescription,
            estimatedTime,
            materialsNeeded,
            errors,
        } = this.state;
        
        return (
            <div className="wrap">
                <h2>Create Course</h2>
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
                            <p>PLACEHOLDER</p>
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