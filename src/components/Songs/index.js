import React from 'react';

import Song from './Song';
import SongList from './SongList';

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
    this.setState({ isDetail: false, isFilterShowing: false }, () => {
      this.setState({
        detailedSong: song[1],
        detailedSongID: song[0],
        isDetail: true
      });
    })
  }
  exitDetail = () => {
    this.setState({ isDetail: false, detailedSong: '' });
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
      <main>
        <SongList
          onClick={this.showDetail}
          songs={this.props.songs}
          detailedSong={detailedSong}
          sharks={this.props.sharks}
        />


        {
          this.props.authUser &&
          <button className="newSongBtn" onClick={this.addNewSong}>
            new song
          </button>
        }

        {
          isDetail &&
          <Song
            id={this.state.detailedSongID}
            firebase={this.props.firebase}
            songs={this.props.songs}
            song={detailedSong}
            exit={this.exitDetail}
            sharks={this.props.sharks}
            authUser={this.props.authUser}
          />
        }
      </main>
    );
  }
}

export default Songs;
