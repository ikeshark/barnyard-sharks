import React from 'react';

import Filter from './Filter';
import AllSongList from './AllSongList';

class AllSongs extends React.Component {

  render() {
    return (
      <>
      <div className={this.props.className || "relative w-full md:w-1/2"}>
        <AllSongList
          songs={this.props.songs}
          setList={this.props.setList}
        />
        {this.props.children}
      </div>
        <Filter
          sharks={this.props.sharks}
          onClick={this.props.onClick}
          detailedSong={this.props.detailedSong}
        />
      </>
    );
  }
}


export default AllSongs;
