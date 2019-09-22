import React from 'react';

import Nav from './Nav';
import SignInOrOutButton from '../User/SignInOrOutButton';

const Header = ({ onClickNav, tab, firebase, onShowSignIn, authUser }) => (
  <header className="w-full px-5 py-1 bg-darkgray flex justify-between items-center shadow-slategray relative">
    <h1 className="hidden md:block p-i text-4xl text-deeppink font-metal tracking-widest text-shadow">
      Sharkapp
    </h1>
    <Nav
      onClickNav={onClickNav}
      tab={tab}
    />
    <SignInOrOutButton
      firebase={firebase}
      onShowSignIn={onShowSignIn}
      authUser={authUser}
    />
  </header>
)

export default Header;
