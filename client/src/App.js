// Importing React related libraries and objects
import React, { Component } from 'react';
/* import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; */

// Importing components
import Header from './components/Header';
import Courses from './components/Courses';

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
      <React.Fragment>
        <Header />
        <Courses />
      </React.Fragment>
    );
  }
}

export default App;
