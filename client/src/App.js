// Importing React related libraries and objects
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Importing components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import PrivateRoute from './components/PrivateRoute';

// Importing error handling components;
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

// Redeclaring the App Component as a Class Component
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={ Courses } />
                    <Route exact path="/courses" component={ Courses } />
                    <PrivateRoute path="/courses/create" component={ CreateCourse } />
                    <Route exact path="/courses/:id" component={ (props) => <CourseDetail {...props} id = {props.match.params.id}/> } />
                    <PrivateRoute path="/courses/:id/update" component={ (props) => <UpdateCourse {...props} id = {props.match.params.id}/> } />
                    <Route path="/signin" component={ UserSignIn } />
                    <Route path="/signup" component={ UserSignUp } />
                    <Route path="/signout" component={ UserSignOut } />
                    <Route path="/notfound" component={ NotFound } />
                    <Route path="/forbidden" component={ Forbidden } />
                    <Route path="/error" component={ UnhandledError } />
                    <Route component={ NotFound } />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
