import React from 'react';

import Filter from './Filter';

const buttonClassName = `
  w-full mb-1 p-1
  bg-offwhite shadow-spread
  border border-gray border-b-3
  leading-tight text-left text-xl
  hover:bg-deeppink hover:text-white hover:border-transparent
`;

class AllSongs extends React.Component {

  state = {
    displayedSongs: [],
    statusFilter: '',
    vocalsFilter: '',
    sharksFilter: '',
    sortType: '',
    isCover: false,
    isFilterShowing: true,
  }

  componentDidMount() {
    this.displaySongs();
    if (!this.props.isFilterShowing) {
      this.setState({ isFilterShowing: false });
    }
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
    const vocalsFilter = this.state.vocalsFilter === e.target.value ?
      '' : e.target.value;
    this.setState({ vocalsFilter }, this.displaySongs);
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

    const re = new RegExp(value);
    if (!re.test(sharksFilter)) {
      this.setState({
        sharksFilter: sharksFilter ? `${sharksFilter}, ${value}` : value
      }, this.displaySongs);
    } else {
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
    const { statusFilter, vocalsFilter, sharksFilter, sortType, isCover } = this.state;
    const setList = this.props.setList;

    let displayedSongs = Object.values(songs);
    // no covers is default
    if (!isCover) {
      displayedSongs = displayedSongs.filter(song => song.isCover === undefined || song.isCover === false);
    }
    // duplicates in setLists aren't allowed
    if (setList) {
      displayedSongs = displayedSongs.filter(song => setList.indexOf(song.name) === -1 );
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
    if (vocalsFilter) {
      const test = new RegExp(vocalsFilter);
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
      <>
      <div className={this.props.className || "relative w-full md:w-1/2"}>
        <ul className="p-3 overflow-y-scroll h-full lastItem-mb">
          {this.state.displayedSongs.map(song => (
            <li key={song.name}>
              <button
                type="button"
                onClick={this.props.onClick}
                className={
                  this.props.detailedSong === song ?
                  `active ${buttonClassName}` : buttonClassName
                }
              >
                {song.name}
              </button>
            </li>
          ))}
        </ul>
        {this.props.children}

      </div>
        <Filter
          handleCoverFilter={this.handleCoverFilter}
          isCover={this.state.isCover}
          isOpen={this.state.isFilterShowing}
          onToggleFilter={this.onToggleFilter}
          filterByStatus={this.filterByStatus}
          filterByVocals={this.filterByVocals}
          statusFilter={this.state.statusFilter}
          handleSharksFilter={this.handleSharksFilter}
          vocalsFilter={this.state.vocalsFilter}
          sharksFilter={this.state.sharksFilter}
          onSort={this.onSort}
          sortType={this.state.sortType}
          sharks={this.props.sharks}
        />
      </>
    );
  }
}


export default AllSongs;
