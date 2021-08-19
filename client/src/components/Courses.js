// Importing React related libraries and objects
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing the instance of the Context API
import Context from '../Context';

/*
 *  Courses Component
 *      This is a stateful class component that retrieves a list of courses from the REST API, renders a list of courses
 *  linking them with the corresponding 'CourseDetail' component and finally renders a link to the 'CreateCourse'
 *  component.
 */

class Courses extends Component {

    static contextType = Context;   // Granting access to Context

    state = {
        courseObjects: [],
    }

    // Retrieving API data after the component mounts
    componentDidMount() {
        this.context.data.getCourses()
            .then(data => data.map( course => this.setState( prevState => ({ courseObjects: [ ...prevState.courseObjects, course ] })) ))
            .catch( () => {
                this.props.history.push("/error");      // If further errors happen, redirects to 'error'
            });
    }

    render() {  
        
        // Creates the JSX HTML elements for each course and stores them in an array of courses
        const courses = this.state.courseObjects.map( course => {
            return (
                <Link to={`/courses/${course.id}`} key={course.id} className="course--module course--link" > 
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </Link>
            )
        });
        
        return (
            <div className="wrap main--grid">
                
                {/* Renders the JXS elements of the courses */}
                {courses}

                {/* Renders the button to add a new course */}
                <Link to="/courses/create" className="course--module course--add--module">
                        <span className="course--add--title">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                                New Course
                        </span>
                </Link>
            </div>
        )
        
    }
}

export default Courses;     