import React from 'react';
import { Redirect } from 'react-router-dom';

const UserSignOut = ({ context }) => {
  context.actions.signOut();
  
  // Redirects user to the default route
  return (
    <Redirect to="/" />
  );
}

export default UserSignOut;