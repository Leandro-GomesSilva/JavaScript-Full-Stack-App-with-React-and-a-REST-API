// Importing React related modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// Importing the instance of the Context API
import Context from '../Context';

/*
 *  CourseDetails Component
 *  This is a stateful class component. 
 *  It retrieves the details of the selected Course from the API and displays it.
 *   
 */

class CourseDetails extends Component {

    static contextType = Context;   // Granting access to Context

    state = {
        courseInformation: [],
        user: [],
    }

    componentDidMount() {
        this.context.data.getCourseById(this.props.id)
            .then(data => this.setState({ 
                courseInformation: data,
                user: data.User,
            }));
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
                                <Link to={{
                                    pathname: `/courses/${this.props.id}/update`,
                                    state: {
                                        courseTitle: courseInformation.title,
                                        estimatedTime: courseInformation.estimatedTime,
                                        courseDescription: courseInformation.description,
                                        materialsNeeded: courseInformation.materialsNeeded,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                    }
                                }} className="button">Update Course</Link>
                                <Link to={`/courses/${this.props.id}/update`} className="button">Delete Course</Link>
                                <Link to='/' className="button button-secondary">Return to List</Link>
                        </div>
                </div>
                
                <div className="wrap">
                        <h2>Course Detail</h2>
                        <form>
                                <div className="main--flex">
                                        <div>
                                                <h3 className="course--detail--title">Course</h3>
                                                <h4 className="course--name">{courseInformation.title}</h4>
                                                <p>{`By ${user.firstName} ${user.lastName}`}</p>
                                                <ReactMarkdown>{courseInformation.description}</ReactMarkdown>
                                        </div>
                                        <div>
                                                <h3 className="course--detail--title">Estimated Time</h3>
                                                <p>{courseInformation.estimatedTime}</p>

                                                <h3 className="course--detail--title">Materials Needed</h3>
                                                <ReactMarkdown className="course--detail--list">
                                                    {courseInformation.materialsNeeded}
                                                </ReactMarkdown>
                                        </div>
                                </div>
                        </form>
                </div>
            </React.Fragment>
        )
    }
}

export default CourseDetails;     



