import React from 'react';

import {
  AllSongs,
  Modal,
  DetailWrapper,
  EditOrCreate,
} from '../common';
import SetList from './SetList';

const INITIAL_STATE = {
  date: 0,
  dateInput: '',
  hasChanged: false,
  location: '',
  setList: [],
  isAddSong: false,
  isEditLocation: false,
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

    this.props.firebase.db.ref(`gigs/${this.props.gigId}`).update({
      date,
      location,
      setList,
    });

    this.setState({ hasChanged: false, isEditLocation: false });
  }

  onMoveUp = e => {
    const position = parseInt(e.target.value);
    let setList = this.state.setList;
    [setList[position], setList[position - 1]] =
      [setList[position - 1], setList[position]];
    this.setState({ setList, hasChanged: true });
  }
  onMoveDown = e => {
    const position = parseInt(e.target.value);
    let setList = this.state.setList;
    [setList[position], setList[position + 1]] =
      [setList[position + 1], setList[position]];
    this.setState({ setList, hasChanged: true });
  }
  onDelete = e => {
    const position = parseInt(e.target.value);
    let setList = this.state.setList;
    setList.splice(position, 1);
    this.setState({ setList, hasChanged: true });
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
      setList,
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
  toggleEditLocation = () => {
    if (this.props.authUser) {
      this.setState({ isEditLocation: true });
    }
  }

  render() {
    return (
      <DetailWrapper
        handleExit={this.props.exit}
        classNames="gigWrapper"
        isUnmounting={this.props.isUnmounting}
      >
        <label
          className="label gigLocation"

          onClick={this.toggleEditLocation}
        >
          {this.state.location ? "" : "location"}
          {(!this.state.location || this.state.isEditLocation) ?
            <input
              disabled={!this.props.authUser}
              name="location"
              onChange={this.onChange}
              value={this.state.location}
              className="input"
            /> :
            <p className="gigLocation">{this.state.location}</p>
          }

        </label>
        <label className="label gigDate">
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
        <div className="setListWrapper">
          <h3>setlist</h3>
            <SetList
              songs={this.props.songs}
              authUser={this.props.authUser}
              setList={this.state.setList}
              onMoveUp={this.onMoveUp}
              onMoveDown={this.onMoveDown}
              onDelete={this.onDelete}
            />
          {this.props.authUser &&
            <button
              onClick={this.onAddSong}
              type="button"
              disabled={!this.props.authUser}
              className="setListAddBtn"
            >
              Add Song
            </button>
          }
        </div>

        {this.props.authUser &&
          <EditOrCreate
            isEdit={!!this.props.gigId}
            className="gigSubmit"
            title="gig"
            handleCreate={this.onCreate}
            handleEdit={this.onEdit}
            createValidation={this.state.location}
            editValidation={this.state.hasChanged}
          />
        }

        {this.state.isAddSong &&
          <Modal>
            <div className="modalBG">
              <AllSongs
                isFilterShowing={false}
                className="modalAllSongs"
                onClick={this.onPushToSetList}
                songs={Object.values(this.props.songs)}
                sharks={this.props.sharks}
              />
            </div>
          </Modal>
        }

        <button onClick={this.props.exit} className="button exit">
          >
        </button>
       </DetailWrapper>
    );
  }

}



export default Gig;
