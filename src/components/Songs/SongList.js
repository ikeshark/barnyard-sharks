import React from 'react';

import Filter from './Filter';

class SongList extends React.Component {

  state = {
    displayedSongs: [],
    statusFilter: '',
    vocalistFilter: '',
    sortType: '',
    isFilterShowing: true,
  }

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
  onToggleFilter = () => {
    this.setState(prevState => ({
      isFilterShowing: !prevState.isFilterShowing
    }));
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
  render() {
    return (
      <div className={this.props.className || "mainWrapper"}>
        <ul className="songList">
          {this.state.displayedSongs.map(song => (
            <li key={song.name}>
              <button
                onClick={this.props.onClick}
                className={this.props.detailedSong === song ? "active" : ""}
              >
                {song.name}
              </button>
            </li>
          ))}
        </ul>
        <Filter
          isOpen={this.state.isFilterShowing}
          onToggleFilter={this.onToggleFilter}
          filterByStatus={this.filterByStatus}
          filterByVocals={this.filterByVocals}
          statusFilter={this.state.statusFilter}
          vocalistFilter={this.state.vocalistFilter}
          onSort={this.onSort}
          sortType={this.state.sortType}
        />
      </div>
    );
  }
}


export default SongList;
