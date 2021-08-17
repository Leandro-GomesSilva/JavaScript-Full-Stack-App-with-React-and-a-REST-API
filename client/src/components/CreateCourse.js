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
    createCourse (e, courseTitle, courseDescription, estimatedTime, materialsNeeded) {
        e.target.preventDefault();

        const newCourse = { 
            title: courseTitle,
            description: courseDescription,
            estimatedTime,
            materialsNeeded
        }
        this.context.data.createCourse(newCourse);
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
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div>
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
                    <button className="button" type="submit" onClick={(e) => this.createCourse(e, courseTitle, courseDescription, estimatedTime, materialsNeeded)}>Create Course</button>
                    <button className="button button-secondary" onClick={this.handleCancelButton}>Cancel</button>
                </form>
            </div>
        );
    }
}