import React, { Component } from 'react';
import Data from './Data';

// Creating a Context instance
const Context = React.createContext();
export default Context;

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