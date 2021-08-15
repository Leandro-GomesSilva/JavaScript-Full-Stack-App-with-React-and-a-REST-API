// Importing React related libraries and objects
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Importing components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

// Redeclaring the App Component as a Class Component
class App extends Component {
    
    /* Testing CORS i.e. the connection between the client and the API with an IIFE (Immediately-invoked Function Expression)
    componentDidMount() {
        ( async function () {
            const response = await fetch('http://localhost:5000/api/courses');
            response.json().then(data => console.log("It is working!", data));
        })()
    };  */
    
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={ () => <Courses /> } />
                    <Route path="/courses/create" component={ () => <CreateCourse /> } />
                    <Route path="/courses/:query" component={ () => <CourseDetails /> } />
                    <Route path="/courses/:query/update" component={ () => <UpdateCourse /> } />
                    <Route path="/signin" component={ () => <UserSignIn /> } />
                    <Route path="/signup" component={ () => <UserSignUp /> } />
                    <Route path="/signout" component={ () => <UserSignOut /> } />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
