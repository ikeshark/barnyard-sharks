import React from 'react';

import Filter from './Filter';
import AllSongList from './AllSongList';

const AllSongs = ({ className, setList, onClick, children }) => (
  <>
    <div className={className || 'relative w-full md:w-1/2'}>
      <AllSongList
        setList={setList}
        onClick={onClick}
      />
      {children}
    </div>
    <Filter />
  </>
);

export default AllSongs;
