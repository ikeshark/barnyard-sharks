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

const styles = {
  wrapper: 'grid-gig overflow-y-scroll h-full w-full p-4',
  label: 'border border-black shadow-card p-2 text-sm',
  addSong: `
    absolute top-0 right-0 mr-2
    h-12 w-12 p-1
    text-sm leading-none
    bg-tan shadow-slategray
    border border-black rounded-full
  `,
  btnSubmit: `
    block p-2 text-xl
    border-4 border-double border-black rounded-lg
    disabled:border-gray-500 disabled:text-gray-500
    songSubmit
  `,
  btnClose: `
    absolute bottom-0 left-0 mb-y-center -ml-6
    border border-black rounded-sm
    shadow-card p-2 bg-white leading-none
  `,
  modalBG: `
    fixed top-0 left-0
    w-full h-screen z-100
    bg-black-opaque
    flex
  `,
  modalInner: `
    w-full h-full
    bg-white shadow-inset
    p-2 text-lg
    flex flex-col
  `,
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
        <div className={styles.wrapper}>
          <label
            className={styles.label}
            style={{ gridArea: 'where' }}
            onClick={this.toggleEditLocation}
          >
            {this.state.location ? "" : "location"}
            {(!this.state.location || this.state.isEditLocation) ?
              <input
                disabled={!this.props.authUser}
                name="location"
                onChange={this.onChange}
                value={this.state.location}
                className="block text-lg w-full"
              /> :
              <span className="text-xl">{this.state.location}</span>
            }

          </label>
          <label className={styles.label} style={{ gridArea: 'when' }}>
            date
            <input
              disabled={!this.props.authUser}
              name="date"
              onChange={this.onDateChange}
              value={this.processDate(this.state.date) || this.state.dateInput}
              className="block text-lg w-full"
              placeholder="mm/dd/yyyy"
            />
          </label>
          <div className="overflow-y-scroll relative" style={{ gridArea: 'what' }}>
            <h3 className="font-futura font-bold text-center text-2xl underline">
              SETLIST
            </h3>
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
                className={styles.addSong}
              >
                Add Song
              </button>
            }
          </div>

          {this.props.authUser &&
            <EditOrCreate
              isEdit={!!this.props.gigId}
              className={styles.btnSubmit}
              title="gig"
              handleCreate={this.onCreate}
              handleEdit={this.onEdit}
              createValidation={this.state.location}
              editValidation={this.state.hasChanged}
            />
          }
        </div>
        {this.state.isAddSong &&
          <Modal>
            <div
              id="modalBG"
              className={styles.modalBG}
              onClick={this.closeModal}
            >
              <AllSongs
                isFilterShowing={false}
                className={styles.modalInner}
                onClick={this.onPushToSetList}
                songs={Object.values(this.props.songs)}
                sharks={this.props.sharks}
              />
            </div>
          </Modal>
        }

        <button id="detailExit" onClick={this.props.exit} className={styles.btnClose}>
          >
        </button>
       </DetailWrapper>
    );
  }

}



export default Gig;
