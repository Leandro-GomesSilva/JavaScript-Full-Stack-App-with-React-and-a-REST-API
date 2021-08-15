// Importing React related libraries and objects
import React, { Component } from 'react';
//import { Route } from 'react-router-dom';

// Importing components
import Context from '../Context';

/*
 *  CourseDetails Component
 *  This is a stateful class component. 
 *  It retrieves the details of the selected Course from the API and displays it.
 *   
 */

class CourseDetails extends Component {

    static contextType = Context;

    state = {
        courseInformation: [],
        user: [],
    }

    componentDidMount() {
        this.context.data.getCourseById(1)
            .then(data => this.setState({ 
                courseInformation: data,
                user: data.User,
            }) )
    }

    render() {  
        const {
            courseInformation,
            user,
        } = this.state;

        return (
            <React.Fragment>
                <div className="actions--bar">
                        <div className="wrap">
                                <a className="button" href="update-course.html">Update Course</a>
                                <a className="button" href="/">Delete Course</a>
                                <a className="button button-secondary" href="index.html">Return to List</a>
                        </div>
                </div>
                
                <div className="wrap">
                        <h2>Course Detail</h2>
                        <form>
                                <div className="main--flex">
                                        <div>
                                                <h3 className="course--detail--title">Course</h3>
                                                <h4 className="course--name">{courseInformation.title}</h4>
                                                <p>{`By ${this.state.user.firstName} ${user.lastName}`}</p>
                                                <p>{courseInformation.description}</p>
                                        </div>
                                        <div>
                                                <h3 className="course--detail--title">Estimated Time</h3>
                                                <p>{courseInformation.estimatedTime}</p>

                                                <h3 className="course--detail--title">Materials Needed</h3>
                                                <ul className="course--detail--list">
                                                        {courseInformation.materialsNeeded}
                                                </ul>
                                        </div>
                                </div>
                        </form>
                </div>
            </React.Fragment>
        )
    }
}

export default CourseDetails;     



