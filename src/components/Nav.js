import React from 'react';

const Nav = ({ onClickNav, tab }) => (
  <nav>
    <h1 className="hideForS">sharkApp</h1>
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
      onClick={onClickNav}
      value="sharks"
      className={tab === 'sharks' ? "active" : ""}
    >
      Sharks
    </button>
  </nav>
);

export default Nav;
