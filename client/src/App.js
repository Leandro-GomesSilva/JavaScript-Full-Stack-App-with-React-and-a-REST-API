// Importing React related libraries and objects
import React, { Component } from 'react';
/* import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; */

// Importing components
    /*********/

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
      <div className="App">
        <header className="App-header">
          <img className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
