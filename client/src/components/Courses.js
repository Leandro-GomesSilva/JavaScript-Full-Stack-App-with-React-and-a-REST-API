// Importing React related libraries and objects
import React, { Component } from 'react';
//import { Route } from 'react-router-dom';

// Importing components
import Context from '../Context';

/*
 *  Courses Component
 *  This is a class component. It lists the Courses by retrieving them from the REST API.
 *  It also renders a link to the "Create Course" screen.
 * 
 */

class Courses extends Component {

  static contextType = Context;

  state = {
    courses: [],
  }

  componentDidMount() {
    this.context.data.getCourses()
      .then(data => data.map( course => this.setState( prevState => ({ courses: [ ...prevState.courses, course ] })) ));
  }

  render() {  
    const courseContainers = this.state.courses.map( course => {
      return (
        <a className="course--module course--link" href="course-detail.html" key={course.id}>
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </a>
      )
    });
    
    return (
      <div className="wrap main--grid">
        
        {courseContainers}

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