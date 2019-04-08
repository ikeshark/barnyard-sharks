import React from 'react';

import Song from './Song';
import Filter from './Filter';
import SongList from './SongList';

const INITIAL_STATE = {
  displayedSongs: [],

  statusFilter: '',
  vocalistFilter: '',
  sortType: '',
  isFilterShowing: true,

  detailedSong: {},
  detailedSongID: '',
  isDetail: false,

  loading: false,
  error: null,
}

class Songs extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.displaySongs();
  }
  componentWillUpdate(nextProps, nextState) {
    const newSongLength = Object.values(nextProps.songs).length;
    const oldSongLength = Object.values(this.props.songs).length;
    if (newSongLength !== oldSongLength) {
      this.displaySongs(nextProps.songs);
    }
  }

  displaySongs = (songs = this.props.songs) => {
    const { statusFilter, vocalistFilter, sortType } = this.state;
    let displayedSongs = Object.values(songs);
    if (statusFilter) {
      displayedSongs = displayedSongs.filter(song => song.status === statusFilter);
    }
    if (vocalistFilter) {
      displayedSongs = displayedSongs.filter(song => song.vox === vocalistFilter);
    }
    if (sortType) {
      if (sortType === 'newest') {
        displayedSongs = displayedSongs.sort((a, b) => b.dob - a.dob);
      } else if (sortType === 'oldest') {
        displayedSongs = displayedSongs.sort((a, b) => a.dob - b.dob);
      }
    } else {
      displayedSongs = displayedSongs.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    this.setState({ displayedSongs });
  }

  filterByStatus = e => {
    const statusFilter = this.state.statusFilter === e.target.value ?
      '' : e.target.value;
    this.setState({ statusFilter }, this.displaySongs);
  }
  filterByVocals = e => {
    const vocalistFilter = this.state.vocalistFilter === e.target.value ?
      '' : e.target.value;
    this.setState({ vocalistFilter }, this.displaySongs);
  }

  onSort = e => {
    if (e.target.value === this.state.sortType) {
        this.setState({ sortType: '' }, this.displaySongs);
        return;
    }
    this.setState({ sortType: e.target.value }, this.displaySongs);
  }

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
    this.setState({ isDetail: false });
  }
  addNewSong = () => {
    this.setState({
      detailedSong: {name: '', dob: '', status: '', vox: ''},
      detailedSongID: '',
      isDetail: true
    });
  }
  onToggleFilter = () => {
    this.setState(prevState => ({
      isFilterShowing: !prevState.isFilterShowing
    }));
  }

  render() {
    const {
      displayedSongs,
      isDetail,
      detailedSong,
      isFilterShowing
    } = this.state;
    return (
      <main>
        <div className="mainWrapper">
          <SongList
            onClick={this.showDetail}
            songs={displayedSongs}
            detailedSong={detailedSong}
          />
          <Filter
            isOpen={isFilterShowing}
            onToggleFilter={this.onToggleFilter}
            filterByStatus={this.filterByStatus}
            filterByVocals={this.filterByVocals}
            statusFilter={this.state.statusFilter}
            vocalistFilter={this.state.vocalistFilter}
            onSort={this.onSort}
            sortType={this.state.sortType}
          />
        </div>

        <button className="newSongBtn" onClick={this.addNewSong}>
          new song
        </button>

        {
          isDetail &&
          <Song
            id={this.state.detailedSongID}
            firebase={this.props.firebase}
            song={detailedSong}
            exit={this.exitDetail}
          />
        }
      </main>
    );
  }
}

export default Songs;
