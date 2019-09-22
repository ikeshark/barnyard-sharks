import React from 'react';

const styles = {
  base: 'border border-gray-700 px-2 mb-1 ml-1 text-left',
  grow: ' flex-grow',
  hide: ' hidden sm:block'
}

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
    <ol>
      {setList.map((song, i) => (
        <li key={song} className="flex">
          <button type="button" className={styles.base + styles.grow}>
            {i + 1}) {renderName(song)}
          </button>
          <button
            type="button"
            disabled={!authUser}
            value={i}
            onClick={onDelete}
            className={styles.base}
          >
            x
          </button>
          <button
            type="button"
            value={i}
            onClick={onMoveUp}
            className={styles.base + styles.hide}
            disabled={isDisabledUP(i)}
          >
            &uarr;
          </button>
          <button
            type="button"
            value={i}
            onClick={onMoveDown}
            className={styles.base + styles.hide}
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
