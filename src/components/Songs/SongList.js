import React from 'react';

class SongList extends React.Component {
  state = {
    displayedSongs: [],

  }

  return (
    <ul className={className || "songList"}>
      {songs.map(song => (
        <li key={song.name}>
          <button
            onClick={onClick}
            className={detailedSong === song ? "active" : ""}
          >
            {song.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

}
export default SongList;
