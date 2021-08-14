import React, { Component } from 'react';
import Data from './Data';

// Creating and exporting a Context instance of the Context API
const Context = React.createContext();
export default Context;

// Creating and export a Provider Component
export class Provider extends Component {
  
  state = {

  }
  
  constructor() {
    super();    // Using the super keyword to have access to this object's parent
    this.data = new Data();   // Defining the property 'data' with a new 'Data' object
  }

  render() {
    const value = {
      data: this.data,
      actions: {

      },
    }
    
    return (
      <Context.Provider value={value}>
        { this.props.children }
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;