import React from 'react';

import SetList from '../Gigs/SetList';
import SongList from './../Songs/SongList';

const INITIAL_STATE = {
  name: '',
  sharkSince: 0,
  favSongs: [],

  dateInput: '',

  isAddSong: false,
  hasChanged: false,
}

class Shark extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    let favSongs;
    if (this.props.shark.favSongs && this.props.shark.favSongs.length) {
      favSongs = this.props.shark.favSongs.split(',');
    }

    this.setState({
      name: this.props.shark.name || '',
      sharkSince: this.props.shark.sharkSince || '',
      favSongs: favSongs || []
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      hasChanged: true,
    });
  }

  handleEdit = () => {
    let favSongs = this.state.favSongs;

    favSongs = favSongs.join(',');
    this.props.firebase.db.ref(`sharks/active/${this.props.id}`).update({
      name: this.state.name,
      sharkSince: this.state.sharkSince,
      favSongs,
    });
    this.setState({ hasChanged: false });
  }

  processDate = date => {
    if (date === '') {
      return ''
    }
    else if (typeof date === 'string') {
      return new Date(date).getTime()
    } else if (typeof date === 'number') {
      const dateObj = new Date(date);
      let month = dateObj.getMonth() + 1;
      month = (month.toString().length === 1) ? '0' + month : month;
      const year = dateObj.getFullYear();
      let day = dateObj.getDate();
      day = (day.toString().length === 1) ? '0' + day : day;
      return `${month}/${day}/${year}`
    }
  }
  handleDateChange = e => {
    const re = /^[0-1][0-9]\/[0-3][0-9]\/[1-2][0-9][0-9][0-9]$/;
    if (re.test(e.target.value)) {
      const newDate = this.processDate(e.target.value);
      this.setState({
        sharkSince: newDate,
        hasChanged: true
      });
    } else {
      this.setState({
        sharkSince: '',
        dateInput: e.target.value
      })
    }
  }


    onMoveUp = e => {
      const position = parseInt(e.target.value);
      let favSongs = this.state.favSongs;
      [favSongs[position], favSongs[position - 1]] =
        [favSongs[position - 1], favSongs[position]];
      this.setState({ favSongs });
    }
    onMoveDown = e => {
      const position = parseInt(e.target.value);
      let favSongs = this.state.favSongs;
      [favSongs[position], favSongs[position + 1]] =
        [favSongs[position + 1], favSongs[position]];
      this.setState({ favSongs });
    }
    onDelete = e => {
      const position = parseInt(e.target.value);
      let favSongs = this.state.favSongs;
      favSongs.splice(position, 1);
      this.setState({ favSongs });
    }
    onAddSong = () => {
      this.setState({
        isAddSong: true
      });
    }
    onPushToFavSongs = e => {
      const songName = e.target.innerText;
      let songID;
      Object.entries(this.props.songs).forEach(entry => {
        if (entry[1].name === songName) {
          songID = entry[0];
        }
      });
      let favSongs = this.state.favSongs;
      favSongs.push(songID);
      this.setState({
        favSongs: favSongs,
        isAddSong: false,
        hasChanged: true,
      });
    }


  render() {
    // if current user is the detailed shark, you are valid
    const validated = this.props.authUser && this.props.authUser.uid === this.props.id;
    return (
      <form className="wrapper">
        <label className="label l-95w">
          Name
          <input
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            disabled={!validated}
            className="input"
          />
        </label>
        <label className="label l-95w">
          Shark Since
          <input
            name="date"
            onChange={this.handleDateChange}
            value={this.processDate(this.state.sharkSince) || this.state.dateInput}
            disabled={!validated}
            placeholder="mm/dd/yyyy"
            className="input"
          />
        </label>

        <SetList
          songs={this.props.songs}
          authUser={this.props.authUser}
          setList={this.state.favSongs}
          onMoveUp={this.onMoveUp}
          onMoveDown={this.onMoveDown}
          onDelete={this.onDelete}
        />

        {validated &&
          <>
            <button
              onClick={this.onAddSong}
              disabled={!this.props.authUser}
              type="button"
            >
              Add Song
            </button>
            <button
              type="submit"
              onClick={this.handleEdit}
              disabled={!this.state.hasChanged || !validated}
            >
              save edits
            </button>
          </>
        }

        {
          this.state.isAddSong &&
          <SongList
            className="modalSongList"
            onClick={this.onPushToFavSongs}
            songs={Object.values(this.props.songs)}
            sharks={this.props.sharks}
          />
        }
        <button
          type="button"
          onClick={this.props.exit}
          className="button exit"
        >
          >
        </button>

      </form>
    );
  }
}

export default Shark;
