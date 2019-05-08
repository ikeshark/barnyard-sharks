import React from 'react';

import Filter from './Filter';

class SongList extends React.Component {

  state = {
    displayedSongs: [],
    statusFilter: '',
    vocalistFilter: '',
    sharksFilter: '',
    sortType: '',
    isCover: false,
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
  handleCoverFilter = () => {
    this.setState(prevState => ({
      isCover: !prevState.isCover }), this.displaySongs
    );
  }
  handleSharksFilter = e => {
    const value = e.target.value;
    let sharksFilter = this.state.sharksFilter;
    if (e.target.checked) {
      this.setState({
        sharksFilter: sharksFilter ? `${sharksFilter}, ${value}` : value
      }, this.displaySongs);
    } else if (!e.target.checked) {
      const test = new RegExp(',');
      // if there is a comma, ie multiple values
      if (test.test(sharksFilter)) {
        let sharksFilterArray = sharksFilter.split(', ');
        sharksFilterArray.splice(sharksFilterArray.indexOf(value), 1);
        sharksFilter = sharksFilterArray.join(', ');
      } else {
        sharksFilter = '';
      }
      this.setState({ sharksFilter }, this.displaySongs);
    }
  }

  displaySongs = (songs = this.props.songs) => {
    const { statusFilter, vocalistFilter, sharksFilter, sortType, isCover } = this.state;
    let displayedSongs = Object.values(songs);
    // no covers is default
    if (!isCover) {
      displayedSongs = displayedSongs.filter(song => song.isCover === undefined || song.isCover === false);
    }
    if (sharksFilter) {
      const sharksFilterArray = sharksFilter.split(', ');
      displayedSongs = displayedSongs.filter(song => {
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
      displayedSongs = displayedSongs.filter(song => song.status === statusFilter);
    }
    if (vocalistFilter) {
      const test = new RegExp(vocalistFilter);
      displayedSongs = displayedSongs.filter(song => test.test(song.vox));
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
                type="button"
                onClick={this.props.onClick}
                className={this.props.detailedSong === song ? "active" : ""}
              >
                {song.name}
              </button>
            </li>
          ))}
        </ul>
        <Filter
          handleCoverFilter={this.handleCoverFilter}
          isCover={this.state.isCover}
          isOpen={this.state.isFilterShowing}
          onToggleFilter={this.onToggleFilter}
          filterByStatus={this.filterByStatus}
          filterByVocals={this.filterByVocals}
          statusFilter={this.state.statusFilter}
          handleSharksFilter={this.handleSharksFilter}
          vocalistFilter={this.state.vocalistFilter}
          sharksFilter={this.state.sharksFilter}
          onSort={this.onSort}
          sortType={this.state.sortType}
          sharks={this.props.sharks}
        />
      </div>
    );
  }
}


export default SongList;
