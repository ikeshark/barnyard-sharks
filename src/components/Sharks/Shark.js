import React from 'react';

import SetList from '../Gigs/SetList';
import { AllSongs, DetailWrapper, Modal } from '../common/';

import { DragDropContext } from "react-beautiful-dnd";

const INITIAL_STATE = {
  name: '',
  sharkSince: 0,
  favSongs: [],

  dateInput: '',

  isAddSong: false,
  hasChanged: false,
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const styles = {
  wrapper: 'grid-shark overflow-y-scroll h-full w-full p-4',
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

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const favSongs = reorder(
      this.state.favSongs,
      result.source.index,
      result.destination.index
    );

    this.setState({ favSongs, hasChanged: true });
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
      <DragDropContext onDragEnd={this.onDragEnd}>
        <DetailWrapper
          handleExit={this.props.exit}
          classNames="sharkWrapper"
          isUnmounting={this.props.isUnmounting}
        >
          <div className={styles.wrapper}>
            <label className={styles.label}>
              Name
              <input
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
                disabled={!validated}
                className="block text-lg w-full"
              />
            </label>
            <label className={styles.label}>
              Shark Since
              <input
                name="date"
                onChange={this.handleDateChange}
                value={this.processDate(this.state.sharkSince) || this.state.dateInput}
                disabled={!validated}
                placeholder="mm/dd/yyyy"
                className="block text-lg w-full"
              />
            </label>
            <div className="overflow-y-scroll relative" style={{ gridArea: 'favs' }}>
              <h3 className="font-futura font-bold text-center text-2xl underline">
                A SHARK’S <br />DOZEN
              </h3>
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
                  className={styles.addSong}
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
                className={styles.btnSubmit}
                type="submit"
                style={{ gridArea: 'submit' }}
                onClick={this.handleEdit}
                disabled={!this.state.hasChanged || !validated}
              >
                save edits
              </button>
            }
          </div>
          {
            this.state.isAddSong &&
            <Modal>
              <div
                id="modalBG"
                className={styles.modalBG}
                onClick={this.closeModal}
              >
                <AllSongs
                  isFilterShowing={false}
                  className={styles.modalInner}
                  onClick={this.onPushToFavSongs}
                  songs={Object.values(this.props.songs)}
                  sharks={this.props.sharks}
                />
              </div>
            </Modal>
          }
          <button
            id="detailExit"
            type="button"
            onClick={this.props.exit}
            className={styles.btnClose}
          >
            >
          </button>
        </DetailWrapper>
      </DragDropContext>
    );
  }
}

export default Shark;
