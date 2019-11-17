import React from 'react';

import Song from './Song';
import { AllSongs, delayUnmounting} from '../common';

const DelayedSong = delayUnmounting(Song);

const INITIAL_STATE = {
  displayedSongs: [],

  detailedSong: {},
  detailedSongID: '',
  isDetail: false,

  loading: false,
  error: null,
}

class Songs extends React.Component {
  state = { ...INITIAL_STATE };

  showDetail = e => {
    const name = e.target.innerText;
    const song = Object.entries(this.props.songs)
      .filter(song => song[1].name === name)[0];
    this.setState({ isDetail: false }, () => {
      this.setState({
        detailedSong: song[1],
        detailedSongID: song[0],
        isDetail: true
      });
    })
  }
  exitDetail = e => {
    const modalBG = document.querySelector('#halfModalBG');
    const exitBtn = document.querySelector('#detailExit');

    if (
      !e ||
      e.target === modalBG ||
      e.target === exitBtn
    ) {
      this.setState({ isDetail: false, detailedSong: '' });
    }
  }
  addNewSong = () => {
    this.setState({
      detailedSong: {name: '', dob: '', status: '', vox: ''},
      detailedSongID: '',
      isDetail: true
    });
  }

  render() {
    const {
      isDetail,
      detailedSong
    } = this.state;
    return (
      <main className="h-mainWrapper flex bg-tan shadow-inset">
        <AllSongs
          onClick={this.showDetail}
          songs={this.props.songs}
          detailedSong={detailedSong}
          sharks={this.props.sharks}
          isFilterShowing={true}
        >
          {
            this.props.authUser && navigator.onLine &&
            <button
              className="absolute top-0 right-0 mt-2 mr-2 h-16 w-16 rounded-full p-1 bg-tan border border-black leading-none shadow-slategray"
              onClick={this.addNewSong}
            >
              new song
            </button>
          }
        </AllSongs>

        <DelayedSong
          delayTime={300}
          isMounted={isDetail}
          songId={this.state.detailedSongID}
          firebase={this.props.firebase}
          songs={this.props.songs}
          gigs={this.props.gigs}
          song={detailedSong}
          exit={this.exitDetail}
          sharks={this.props.sharks}
          authUser={this.props.authUser}
        />

      </main>
    );
  }
}

export default Songs;
