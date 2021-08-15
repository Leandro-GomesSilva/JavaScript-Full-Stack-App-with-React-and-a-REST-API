import React, { Component } from 'react';

export default class CreateCourse extends Component {
    state = {
        courseTitle: '',
        estimatedTime: '',
        errors: [],
    }

    render() {
        // Storing state properties into variables
        const {
            courseTitle,
            estimatedTime,
            errors,
        } = this.state;

        return (
            <div class="wrap">
                <h2>Create Course</h2>
                <div class="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div>
                <form>
                    <div class="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input 
                                id="courseTitle" 
                                name="courseTitle" 
                                type="text" 
                                value={courseTitle} />
                            <p>By Joe Smith</p>
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription"></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                                id="estimatedTime" 
                                name="estimatedTime" 
                                type="text" 
                                value={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                        </div>
                    </div>
                    <button class="button" type="submit">Create Course</button>
                    <button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
            </div>
        );
    }
}