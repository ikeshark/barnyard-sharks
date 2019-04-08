import React from 'react';

const Nav = ({ onClickNav, tab }) => (
  <nav>
    <button
      onClick={onClickNav}
      value="songs"
      className={tab === 'songs' ? "active" : ""}
    >
      Songs
    </button>
    <button
      onClick={onClickNav}
      value="gigs"
      className={tab === 'gigs' ? "active" : ""}
    >
      Gigs
    </button>
    <button
      value="sharks"
      className={tab === 'sharks' ? "active" : ""}
    >
      Sharks
    </button>
  </nav>
);

export default Nav;
