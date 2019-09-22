import React from 'react';

const btnClass = `
  block mx-4 p-1
  text-white text-3xl hover:text-pink-300
`;
const activeBtnClass = `
  block mx-4 p-1
  text-deeppink text-shadow text-3xl
`;

const Nav = ({ onClickNav, tab }) => (
  <nav className="flex justify-between font-metal w-full md:w-auto">
    <button
      onClick={onClickNav}
      value="songs"
      className={
        tab === 'songs' ? activeBtnClass : btnClass
      }
    >
      Songs
    </button>
    <button
      onClick={onClickNav}
      value="gigs"
      className={
        tab === 'gigs' ? activeBtnClass : btnClass
      }
    >
      Gigs
    </button>
    <button
      onClick={onClickNav}
      value="sharks"
      className={
        tab === 'sharks' ? activeBtnClass : btnClass
      }
    >
      Sharks
    </button>
  </nav>
);

export default Nav;
