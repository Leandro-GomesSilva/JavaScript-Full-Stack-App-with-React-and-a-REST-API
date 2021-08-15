// Importing React related libraries and objects
import React, { Component } from 'react';
//import { Route } from 'react-router-dom';

// Importing components
import Context from '../Context';

/*
 *  Courses Component
 *  This is a stateful class component. 
 *  It lists the Courses by retrieving them from the REST API.
 *   
 */

class Courses extends Component {

    // To grant access to Context
    static contextType = Context;

    state = {
        courseObjects: [],
    }

    // Retrieving API data after the component mounts
    componentDidMount() {
        this.context.data.getCourses()
            .then(data => data.map( course => this.setState( prevState => ({ courseObjects: [ ...prevState.courseObjects, course ] })) ));
    }

    render() {  
        
        // Creates the JSX HTML elements for each course and stores them in an array of courses
        const courses = this.state.courseObjects.map( course => {
            return (
                <a key={course.id} className="course--module course--link" href={`/courses/${course.id}`}>
                    <h2 className="course--label">Course</h2>
                    <h3 className="course--title">{course.title}</h3>
                </a>
            )
        });
        
        return (
            <div className="wrap main--grid">
                
                {/* Renders the JXS elements of the courses */}
                {courses}

                {/* Renders the button to add a new course */}
                <a className="course--module course--add--module" href="create-course.html">
                        <span className="course--add--title">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                                New Course
                        </span>
                </a>
            </div>
        )
        
    }
}

export default Courses;     