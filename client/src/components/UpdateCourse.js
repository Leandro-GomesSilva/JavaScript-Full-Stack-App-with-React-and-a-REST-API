// Importing React related modules
import React, { Component } from 'react';
import { withRouter } from 'react-router';

// Importing the instance of the Context API
import Context from '../Context';

/*
 *  UpdateCourse Component
 *      This is a stateful class component that renders a form to update a course.
 *      It also renders a button to send a PUT to the REST API.
 *      It is accessed via a Private Route. 
 */

class UpdateCourse extends Component {
    
    static contextType = Context;   // Granting access to Context

    state = {
        courseTitle: '',
        estimatedTime: '',
        courseDescription: '',
        materialsNeeded: '',
        firstName: '',
        lastName: '',
        userId: '',
        errors: [],
    }

    /*      If the user loads the page by directly inputing its address in the browser i.e. in case the data 
     *  has not been fetched before, then it will be fetched here.
     *      If the user loaded the page from the previous "CourseDetails" component, the course data will be 
     *  passed to State via the 'location.state' props, in order to avoid an unnecessary data fetch.
     */
    componentDidMount() {
        if (!this.props.location.state) {
            this.context.data.getCourseById(this.props.id)
            .then(data => {
                if (!data) {
                    this.props.history.push("/notfound");       // If no data is returned, redirects to 'notfound'

                } else if (this.context.authenticatedUser.id !== data.User.id ) {
                    this.props.history.push("/forbidden");      // If data is returned but the course's user ID does not match the authenticated user, redirects to 'forbidden'

                } else {
                    this.setState({                     // Stores data in the State
                        courseTitle: data.title,
                        estimatedTime: data.estimatedTime || "",
                        courseDescription: data.description,
                        materialsNeeded: data.materialsNeeded || "",
                        firstName: data.User.firstName,
                        lastName: data.User.lastName,
                        userId: data.User.id,
                    });
                }
            })
            .catch( () => {
                this.props.history.push("/error");      // If an unexpected error happen, redirects to 'error'
            });
        } else {
            this.setState({                             // If this component was accessed via the Link component of the CourseDetail route, the if statement lands here
                courseTitle: this.props.location.state.courseTitle,
                estimatedTime: this.props.location.state.estimatedTime || "",
                courseDescription: this.props.location.state.courseDescription,
                materialsNeeded: this.props.location.state.materialsNeeded || "",
                firstName: this.props.location.state.firstName,
                lastName: this.props.location.state.lastName,
                userId: this.props.location.state.userId,
            });
        }
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

        const updatedCourse = {         // Stores the update course data in an object
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
        
        this.context.data.updateCourse(this.props.id, updatedCourse, authenticatedUser)     // Calls the API route
            .then( errorsArray => {
                if (errorsArray.length === 0) {         // If no errors are returned, redirects to the course route
                    this.props.history.push(`/courses/${this.props.id}`);
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
                this.props.history.push("/error");      // If an unexpected error happen, redirects to 'error'
            });
    }

    render() {
        const {
            courseTitle,
            estimatedTime,
            courseDescription,
            materialsNeeded,
            firstName,
            lastName,
            errors,
        } = this.state;     // Storing state properties into variables

        return (
            <div className="wrap">
                <h2>Update Course</h2>

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

                            <p>{`By ${firstName} ${lastName}`}</p>

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
                    <button className="button" type="submit" onClick={ (e) => this.handleSubmit(e) }>Update Course</button>
                    <button className="button button-secondary" onClick={this.handleCancelButton}>Cancel</button>
                </form>
            </div>
        );
    }
}

export default withRouter(UpdateCourse);