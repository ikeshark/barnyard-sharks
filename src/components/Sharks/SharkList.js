import React from 'react';

const SharkList = ({ sharks, detailedShark, showDetail }) => {
  const activeSharks = Object.entries(sharks.active);
  const retiredSharks = Object.entries(sharks.retired);
  return (

    <ul className="AllSongs">
      <h3>ACTIVE</h3>
      {activeSharks.map(shark => (
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
      <h3>RETIRED</h3>
      {retiredSharks.map(shark => (
        <li key={shark[0]}>
          <button
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
