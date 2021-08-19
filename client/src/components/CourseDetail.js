// Importing React related modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// Importing the instance of the Context API
import Context from '../Context';

/*
 *  CourseDetail Component
 *  This is a stateful class component. 
 *  It retrieves the details of the selected Course from the API and displays it.
 *   
 */

class CourseDetail extends Component {

    static contextType = Context;   // Granting access to Context

    state = {
        courseInformation: [],
        user: [],
    }

    componentDidMount() {
        this.context.data.getCourseById(this.props.match.params.id)
            .then(data => {
                if (data) {
                    this.setState({ 
                        courseInformation: data,
                        user: data.User,
                    });
                } else {
                    this.props.history.push("/notfound");
                }
            })
            .catch( () => {
                this.props.history.push("/error");
            });
    }

    handleDeleteCourse = () => {
        const authorizedUser = {
            username: this.context.authenticatedUser.emailAddress,
            password: this.context.authenticatedUser.password,
        }
        
        this.context.data.deleteCourse(this.props.match.params.id, authorizedUser)
            .then( () => {
                this.props.history.push("/");
            })
            .catch( () => {
                this.props.history.push("/error");
            });
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
                                { this.context.authenticatedUser && this.context.authenticatedUser.id === user.id ? (
                                    <React.Fragment>
                                        <Link to={{
                                            pathname: `/courses/${this.props.id}/update`,
                                            state: {
                                                courseTitle: courseInformation.title,
                                                estimatedTime: courseInformation.estimatedTime,
                                                courseDescription: courseInformation.description,
                                                materialsNeeded: courseInformation.materialsNeeded,
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                                userId: user.id,
                                            }
                                        }} className="button">Update Course</Link>
                                        <Link to="#" className="button" onClick={this.handleDeleteCourse}>Delete Course</Link>
                                    </React.Fragment>
                                ) : ( 
                                    null 
                                )}
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

export default CourseDetail;     



