import React, { useState } from 'react';
import { connect } from 'react-redux';

import { detailedSongChanged } from '../../actions';
import Song from './Song';
import { AllSongs, delayUnmounting} from '../common';

const DelayedSong = delayUnmounting(Song);

const Songs = ({ detailedSongChanged, detailedSong, authUser }) => {
  const [isDetail, toggleDetail] = useState(false);

  const exitDetail = e => {
    const modalBG = document.querySelector('#halfModalBG');
    const exitBtn = document.querySelector('#detailExit');

    if (!e || e.target === modalBG || e.target === exitBtn) toggleDetail(false);
  }
  const enterDetail = value => {
    detailedSongChanged(value);
    toggleDetail(true);
  }
  const addNewSong = () => {
    detailedSongChanged({
      audio: '',
      dob: '',
      id: '',
      isCover: false,
      lyrics: '',
      name: '',
      reqSharks: '',
      status: '',
      vox: '',
    })
    toggleDetail(true);
  }
  return (
    <main className="h-mainWrapper flex bg-tan shadow-inset">
      <AllSongs onClick={e => enterDetail(e.target.value)}>
        {authUser && navigator.onLine &&
          <button
            className="absolute top-0 right-0 mt-2 mr-2 h-16 w-16 rounded-full p-1 bg-tan border border-black leading-none shadow-slategray"
            onClick={addNewSong}
          >
            new song
          </button>
        }
      </AllSongs>

      <DelayedSong
        delayTime={300}
        isMounted={isDetail}
        exit={exitDetail}
      />
    </main>
  );
}

const mapStateToProps = state => {
  const { detailedSong } = state.songs;
  return { detailedSong }
}


export default connect(mapStateToProps, { detailedSongChanged })(Songs);
