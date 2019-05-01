import React from 'react';

const SharkList = ({ sharks, detailedShark, showDetail }) => {
  const sharkArray = Object.entries(sharks.active);
  return (
    <ul className="songList">
      {sharkArray.map(shark => (
        <li key={shark[0]}>
          <button
            onClick={showDetail}
            className={detailedShark === shark[1] ? "active" : ""}
            value={shark[0]}
          >
            {shark[1].name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SharkList;
