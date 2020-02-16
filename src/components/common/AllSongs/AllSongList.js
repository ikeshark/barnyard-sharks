import React from 'react';
import { connect } from 'react-redux';

import {
  mainList as styles,
} from '../../../classLists';



const AllSongList = ({
  songs,
  sortType,
  isCoverFilter,
  statusFilter,
  vocalsFilter,
  sharksFilter,
  setList,
  onClick,
}) => {

  const filterSongs = songs => {
    let filteredSongs = Object.values(songs);

    // no covers is default
    if (!isCoverFilter) {
      filteredSongs = filteredSongs.filter(song => song.isCover === undefined || song.isCover === false);
    }
    // duplicates in setLists aren't allowed
    if (setList) {
      filteredSongs = filteredSongs.filter(song => setList.indexOf(song.id) === -1 );
    }
    if (statusFilter) {
      filteredSongs = filteredSongs.filter(song => statusFilter.indexOf(song.status) !== -1);
    }
    if (sharksFilter) {
      // to do: improve this
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
    if (vocalsFilter) {
      filteredSongs = filteredSongs.filter(song => song.vox.indexOf(vocalsFilter) !== -1);
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
    <ul className={styles.wrapper}>
      {filteredSongs.map(song => (
        <li key={song.name}>
          <button
            type="button"
            onClick={onClick}
            value={song.id}
            className={styles.btn}
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
  const { songs } = state.songs;
  return {
    vocalsFilter,
    sharksFilter,
    statusFilter,
    sortType,
    isCoverFilter,
    songs,
  };
};

export default connect(mapStateToProps)(AllSongList);
