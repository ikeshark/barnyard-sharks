import React from 'react';

const SetList = ({ authUser, songs, setList, onDelete, onMoveUp, onMoveDown }) => {
  const renderName = songID => {
    let name;
    Object.entries(songs).forEach(song => {
      if (song[0] === songID) {
        name = song[1].name;
      }
    });
    return name;
  }
  if (typeof setList.map !== "function") {
    setList = [];
  }
  const isDisabledUP = i => {
    if (authUser) {
      if (i === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  return (
    <ol className="gigList">
      {setList.map((song, i) => (
        <li key={song}>
          <button type="button">{i + 1}) {renderName(song)}</button>
          <button
            type="button"
            disabled={!authUser}
            value={i}
            onClick={onDelete}
          >
            x
          </button>
          <button
            type="button"
            value={i}
            onClick={onMoveUp}
            className="hideForS"
            disabled={isDisabledUP(i)}
          >
            &uarr;
          </button>
          <button
            type="button"
            value={i}
            onClick={onMoveDown}
            className="hideForS"
            disabled={authUser === null || i === setList.length - 1}
          >
            &darr;
          </button>
        </li>
      ))}
    </ol>
  );
}

export default SetList;