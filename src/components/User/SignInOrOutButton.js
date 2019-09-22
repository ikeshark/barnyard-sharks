import React from 'react';

const className = `
  fixed bottom-0 right-0 mb-12 mr-5
  h-16 w-16 rounded-full shadow-slategray p-1 bg-tan border border-black leading-none
  md:static md:m-1 md:bg-white md:h-12 md:w-12 md:text-sm md:shadow-none
  z-10
`;

const SignInButton = ({ onShowSignIn }) => (
  <button
    type="button"
    onClick={onShowSignIn}
    className={className}
  >
    Sign In
  </button>
);

const SignOutButton = ({ firebase }) => (
  <button
    type="button"
    className={className}
    onClick={firebase.doSignOut}
  >
    Sign Out
  </button>
);

const SignInOrOutButton = ({ authUser, firebase, onShowSignIn }) => {
  if (authUser) {
    return (
      <SignOutButton
        firebase={firebase}
      />
    );
  } else {
    return (
      <SignInButton
        onShowSignIn={onShowSignIn}
      />
    );
  }
};

export default SignInOrOutButton;
