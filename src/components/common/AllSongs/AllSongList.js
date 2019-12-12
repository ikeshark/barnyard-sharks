import React from 'react';
import { connect } from 'react-redux';

const buttonClassName = `
  w-full mb-1 p-1
  bg-offwhite shadow-spread
  border border-gray border-b-3
  leading-tight text-left text-xl
  hover:bg-deeppink hover:text-white hover:border-transparent
`;

const AllSongList = ({
  songs,
  sortType,
  isCoverFilter,
  statusFilter,
  vocalsFilter,
  sharksFilter,
  setList,
  onClick,
  detailedSong
}) => {

  const filterSongs = songs => {
    let filteredSongs = Object.values(songs);

    // no covers is default
    if (!isCoverFilter) {
      filteredSongs = filteredSongs.filter(song => song.isCover === undefined || song.isCover === false);
    }
    // duplicates in setLists aren't allowed
    if (setList) {
      filteredSongs = filteredSongs.filter(song => setList.indexOf(song.name) === -1 );
    }
    if (sharksFilter) {
      const sharksFilterArray = sharksFilter.split(', ');
      filteredSongs = filteredSongs.filter(song => {
        let isKeeper = true;
        // for each shark who isn't here
          // we see if the song requires them to be here
        sharksFilterArray.forEach(shark => {
          const test = new RegExp(shark);
          if (test.test(song.reqSharks)) {
            isKeeper = false;
          }
        });
        return isKeeper;
      });
    }
    if (statusFilter) {
      filteredSongs = filteredSongs.filter(song => song.status === statusFilter);
    }
    if (vocalsFilter) {
      const test = new RegExp(vocalsFilter);
      filteredSongs = filteredSongs.filter(song => test.test(song.vox));
    }
    if (sortType) {
      if (sortType === 'newest') {
        filteredSongs = filteredSongs.sort((a, b) => b.dob - a.dob);
      } else if (sortType === 'oldest') {
        filteredSongs = filteredSongs.sort((a, b) => a.dob - b.dob);
      }
    } else {
      filteredSongs = filteredSongs.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    return filteredSongs;
  }
  const filteredSongs = filterSongs(songs);
  return (
    <ul className="p-3 overflow-y-scroll h-full lastItem-mb">
      {filteredSongs.map(song => (
        <li key={song.name}>
          <button
            type="button"
            onClick={onClick}
            className={
              detailedSong === song ?
              `active ${buttonClassName}` : buttonClassName
            }
          >
            {song.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

const mapStateToProps = (state) => {
  const {
    vocalsFilter,
    sharksFilter,
    statusFilter,
    sortType,
    isCoverFilter,
  } = state.filter;
  return {
    vocalsFilter,
    sharksFilter,
    statusFilter,
    sortType,
    isCoverFilter,
  };
};

export default connect(mapStateToProps)(AllSongList);
