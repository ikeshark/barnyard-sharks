import React from 'react';

const SignOutButton = ({ firebase, className }) => (
  <button type="button" className={className} onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default SignOutButton;
