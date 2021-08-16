import React, { Component } from 'react';
import { withRouter } from 'react-router';

// Importing components
import Context from '../Context';

class UpdateCourse extends Component {
    
    static contextType = Context;   // Granting access to Context

    state = {
        courseTitle: '',
        estimatedTime: '',
        courseDescription: '',
        materialsNeeded: '',
        firstName: '',
        lastName: '',
        errors: [],
    }

    // If the user loads the page by directly inputing its address in the browser i.e. in case the data has not me fetched before, then it will be fetched here.
    // If the user loaded the page from the previous "CourseDetails" component, the course data will be passed to State via the 'location' props, in order to avoid an unnecessary data fetch.
    componentDidMount() {
        if (!this.props.locations) {
            this.context.data.getCourseById(this.props.id)
            .then(data => this.setState({ 
                courseTitle: data.title,
                estimatedTime: data.estimatedTime,
                courseDescription: data.description,
                materialsNeeded: data.materialsNeeded,
                firstName: data.User.firstName,
                lastName: data.User.lastName,
            }));
        } else {
            this.setState({
                courseTitle: this.props.location.state.title,
                estimatedTime: this.props.location.state.estimatedTime,
                courseDescription: this.props.location.state.courseDescription,
                materialsNeeded: this.props.location.state.materialsNeeded,
                firstName: this.props.location.state.User.firstName,
                lastName: this.props.location.state.User.lastName,
            });
        }
    }

    handleValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCancelButton = (e) => {
        e.preventDefault();
        this.props.history.goBack();
    }

    render() {
        // Storing state properties into variables
        const {
            courseTitle,
            estimatedTime,
            courseDescription,
            materialsNeeded,
            firstName,
            lastName,
            errors,
        } = this.state;

        return (
            <div className="wrap">
                <h2>Update Course</h2>
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
                    <button className="button" type="submit">Update Course</button>
                    <button className="button button-secondary" onClick={this.handleCancelButton}>Cancel</button>
                </form>
            </div>
        );
    }
}

export default withRouter(UpdateCourse);