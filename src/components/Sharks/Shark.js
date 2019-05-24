import React from 'react';

import SetList from '../Gigs/SetList';
import { AllSongs, DetailWrapper, Modal } from '../common/';

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
    this.props.firebase.db.ref(`sharks/active/${this.props.sharkId}`).update({
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
    this.setState({ favSongs, hasChanged: true, });
  }
  onMoveDown = e => {
    const position = parseInt(e.target.value);
    let favSongs = this.state.favSongs;
    [favSongs[position], favSongs[position + 1]] =
      [favSongs[position + 1], favSongs[position]];
    this.setState({ favSongs, hasChanged: true, });
  }
  onDelete = e => {
    const position = parseInt(e.target.value);
    let favSongs = this.state.favSongs;
    favSongs.splice(position, 1);
    this.setState({ favSongs, hasChanged: true, });
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
    const validated = this.props.authUser && this.props.authUser.uid === this.props.sharkId;
    return (
      <DetailWrapper
        handleExit={this.props.exit}
        classNames="sharkWrapper"
        isUnmounting={this.props.isUnmounting}
      >
        <label className="label l-95w sharkName">
          Name
          <input
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            disabled={!validated}
            className="input"
          />
        </label>
        <label className="label l-95w sharkSince">
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
        <div className="sharksFavWrapper">
          <h3>A Shark’s <br />Dozen</h3>
          <SetList
            songs={this.props.songs}
            authUser={this.props.authUser}
            setList={this.state.favSongs}
            onMoveUp={this.onMoveUp}
            onMoveDown={this.onMoveDown}
            onDelete={this.onDelete}
          />
          {validated &&
            <button
              className="sharksFavAddBtn"
              onClick={this.onAddSong}
              disabled={!this.props.authUser}
              type="button"
            >
              Add Song
            </button>
          }
        </div>
        {validated &&
          <button
            className="sharkSubmit"
            type="submit"
            onClick={this.handleEdit}
            disabled={!this.state.hasChanged || !validated}
          >
            save edits
          </button>
        }

        {
          this.state.isAddSong &&
          <Modal>
            <div className="modalBG">
              <AllSongs
                isFilterShowing={false}
                className="modalAllSongs"
                onClick={this.onPushToFavSongs}
                songs={Object.values(this.props.songs)}
                sharks={this.props.sharks}
              />
            </div>
          </Modal>
        }
        <button
          type="button"
          onClick={this.props.exit}
          className="button exit"
        >
          >
        </button>

    </DetailWrapper>
    );
  }
}

export default Shark;
