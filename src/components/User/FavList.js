import React from 'react';

const FavList = ({ favs }) => {
  return (
    <ul>
      {favs.map(fav => (
        <li key={fav}>
          {fav}
        </li>
      ))}
    </ul>

  );
};

export default FavList;
