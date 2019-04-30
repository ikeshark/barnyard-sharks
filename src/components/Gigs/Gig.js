import React from 'react';

import SetList from './SetList';
import SongList from './../Songs/SongList';

const INITIAL_STATE = {
  date: 0,
  dateInput: '',
  hasChanged: false,
  location: '',
  setList: [],
  isAddSong: false,
}

class Gig extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    let setList;
    if (this.props.gig.setList && this.props.gig.setList.length) {
      setList = this.props.gig.setList.split(',');

    }

    this.setState({
      date: this.props.gig.date,
      location: this.props.gig.location,
      setList: setList || [],
    });
  }
  // componentWillUpdate(nextProps, nextState) {
  //   console.log(nextState.setList);
  // }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      hasChanged: true
    });
  }

  onEdit = () => {
    const { date, location } = this.state;
    let setList = this.state.setList;

    setList = setList.join(',');

    this.props.firebase.db.ref(`gigs/${this.props.id}`).update({
      date,
      location,
      setList,
    });

    this.setState({ hasChanged: false });
  }

  onMoveUp = e => {
    const position = parseInt(e.target.value);
    let setList = this.state.setList;
    [setList[position], setList[position - 1]] =
      [setList[position - 1], setList[position]];
    this.setState({ setList });
  }
  onMoveDown = e => {
    const position = parseInt(e.target.value);
    let setList = this.state.setList;
    [setList[position], setList[position + 1]] =
      [setList[position + 1], setList[position]];
    this.setState({ setList });
  }
  onDelete = e => {
    const position = parseInt(e.target.value);
    let setList = this.state.setList;
    setList.splice(position, 1);
    this.setState({ setList });
  }
  onAddSong = () => {
    this.setState({
      isAddSong: true
    });
  }
  onPushToSetList = e => {
    const songName = e.target.innerText;
    let songID;
    Object.entries(this.props.songs).forEach(entry => {
      if (entry[1].name === songName) {
        songID = entry[0];
      }
    });
    let setList = this.state.setList;
    setList.push(songID);
    this.setState({
      setList: setList,
      isAddSong: false,
      hasChanged: true,
    });
  }

  onCreate = () => {
    const setList = this.state.setList.join(',');
    const newGig = {
      date: this.state.date,
      location: this.state.location,
      setList
    };
    this.props.firebase.doCreateGig(newGig);
    this.props.exit();
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
  onDateChange = e => {
    const re = /^[0-1][0-9]\/[0-3][0-9]\/[1-2][0-9][0-9][0-9]$/;
    if (re.test(e.target.value)) {
      const newDate = this.processDate(e.target.value);
      this.setState({
        date: newDate,
        hasChanged: true
      });
    } else {
      this.setState({
        date: '',
        dateInput: e.target.value
      })
    }
  }

  renderSaveOrCreate = () => {
    if (this.props.id === '') {
      return (
        <button onClick={this.onCreate} disabled={!this.state.location}>
          create new gig
        </button>
      );
    }
    return (
      <button
        className="button"
        onClick={this.onEdit}
        disabled={!this.state.hasChanged}
      >
        save edits
      </button>
    );
  }

  render() {
    return (
      <div className="wrapper gigWrapper">
        <label className="label">
          location
          <input
            disabled={!this.props.authUser}
            name="location"
            onChange={this.onChange}
            value={this.state.location}
            className="input"
          />
        </label>
        <label className="label">
          date
          <input
            disabled={!this.props.authUser}
            name="date"
            onChange={this.onDateChange}
            value={this.processDate(this.state.date) || this.state.dateInput}
            className="input"
            placeholder="mm/dd/yyyy"
          />
        </label>

        <SetList
          songs={this.props.songs}
          authUser={this.props.authUser}
          setList={this.state.setList}
          onMoveUp={this.onMoveUp}
          onMoveDown={this.onMoveDown}
          onDelete={this.onDelete}
        />

        <button
          onClick={this.onAddSong}
          disabled={!this.props.authUser}
        >
          Add Song
        </button>
        {this.renderSaveOrCreate()}

        {
          this.state.isAddSong &&
          <SongList
            className="modalSongList"
            onClick={this.onPushToSetList}
            songs={Object.values(this.props.songs)}
          />
        }

        <button onClick={this.props.exit} className="button exit">
          >
        </button>
       </div>
    );
  }

}



export default Gig;
