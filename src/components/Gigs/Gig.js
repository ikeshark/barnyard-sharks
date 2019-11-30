import React from 'react';
import { DragDropContext } from "react-beautiful-dnd";

import {
  AllSongs,
  Modal,
  Confirm,
  DetailWrapper,
  EditOrCreate,
} from '../common';
import What from './What';

const styles = {
  wrapper: 'grid-gig h-full w-full p-4',
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
    flex items-center justify-center
  `,
  modalInnerSm: `
    w-10/12 h-10/12
    bg-white shadow-inset
    p-2 text-lg
    flex flex-col
  `,
  modalInnerLg: `
    w-full h-full
    bg-white shadow-inset
    p-2 text-lg
    flex flex-col
  `,
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const INITIAL_STATE = {
  date: 0,
  dateInput: '',
  gigId: '',
  hasChanged: false,
  location: '',
  setList: [],
  media: [],
  mediaId: '',
  src: '',
  tab: 'media',
  isAddSong: false,
  isEditLocation: false,
  isEdit: false,
  isMediaConfirm: false,
  isConfirm: false,
  isDisabled: false,
}

class Gig extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    let setList;
    if (this.props.gig.setList && this.props.gig.setList.length) {
      setList = this.props.gig.setList.split(',');
    }

    this.setState({
      isEdit: !!this.props.gigId,
      gigId: this.props.gigId,
      date: this.props.gig.date,
      media: this.props.gig.media ? Object.entries(this.props.gig.media) : [],
      location: this.props.gig.location,
      setList: setList || [],
      tab: this.props.gig.media ? 'media' : 'setList',
    });
  }

  onChange = e => {
    // hacky line because i don't want adding media to signal a change
    const bool = e.target.name === 'src' ? false : true;
    this.setState({
      [e.target.name]: e.target.value,
      hasChanged: bool,
      error: '',
    });
  }

  onEdit = () => {
    const time = new Date().getTime();
    this.props.firebase.db.ref().update({ gigsLastUpdate: time });

    const { date, location } = this.state;
    let setList = this.state.setList;

    setList = setList.join(',');

    this.props.firebase.db.ref(`gigs/${this.state.gigId}`).update({
      date,
      location,
      setList,
    });

    this.setState({ hasChanged: false, isEditLocation: false });
  }

  onDeleteGig = e => {
    const time = new Date().getTime();
    this.props.firebase.db.ref().update({ gigsLastUpdate: time });
    this.setState({ isDisabled: true });
    this.props.firebase.db.ref(`gigs/${this.state.gigId}`).remove()
      .then(() => this.props.exit());
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const setList = reorder(
      this.state.setList,
      result.source.index,
      result.destination.index
    );

    this.setState({ setList, hasChanged: true });
  }

  onDeleteSong = e => {
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
  onAddMedia = () => {
    if (!this.state.gigId) {
      this.setState({ error: 'You must create the gig first before adding media' });
      return false;
    } else {
      this.setState({
        isAddMedia: true
      });
    }
  }
  onPushToMedia = e => {
    e.preventDefault();
    const duplicate = this.state.media.filter(media => media.src === this.state.src);

    if (duplicate.length) {
      this.setState({
        error: 'That media is already added',
        isAddMedia: false
      });
      return false;
    }

    const time = new Date().getTime();
    this.props.firebase.db.ref().update({ gigsLastUpdate: time });

    const mediaObj = {
      type: 'photo',
      src: this.state.src
    }

    const dbRef = this.props.firebase.db.ref(`gigs/${this.state.gigId}/media`);

    const newRef = dbRef.push(mediaObj, error => {if (error) console.log(error)});

    const mediaArr = [...this.state.media, [newRef.key, mediaObj]];
    this.setState({ src: '', media: mediaArr, isAddMedia: false })
  }
  onStartDeleteMedia = e => {
    this.setState({ mediaId: e.target.value, isMediaConfirm: true });
  }
  onFinishDeleteMedia = () => {
    this.props.firebase.db.ref(`gigs/${this.state.gigId}/media/${this.state.mediaId}`).remove();
    const mediaArr = [...this.state.media];
    if (mediaArr.indexOf(this.state.mediaId)) {
      mediaArr.splice(mediaArr.indexOf(this.state.mediaId))
    }
    this.setState({ media: mediaArr, isMediaConfirm: false })
  }
  onPushToSetList = e => {
    const songName = e.target.innerText;
    let setList = this.state.setList;
    if (setList.indexOf(songName) !== -1 ) {
      return;
    }
    let songID;
    Object.entries(this.props.songs).forEach(entry => {
      if (entry[1].name === songName) {
        songID = entry[0];
      }
    });
    setList.push(songID);
    this.setState({
      setList,
      isAddSong: false,
      hasChanged: true,
    });
  }

  onCreate = () => {
    this.setState({ hasChanged: false })
    const setList = this.state.setList.join(',');
    const newGig = {
      date: this.state.date,
      location: this.state.location,
      setList
    };
    const key = this.props.firebase.doCreateGig(newGig);
    this.setState({ isEdit: true, gigId: key })
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
  onChangeTab = e => {
    this.setState({ tab: e.target.value })
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
  translateSetList = setList => (
    setList.map(songID => {
      let name;
      Object.entries(this.props.songs).forEach(song => {
        if (song[0] === songID) {
          name = song[1].name;
        }
      });
      return name;
    })
  );
  closeModal = e => {
    if (e) {
      if (e.target === document.querySelector('#modalBG') ||
        e.target === document.querySelector('#cancelBtn')) {
        this.setState({
          isAddSong: false,
          isConfirm: false,
          isAddMedia: false,
          isMediaConfirm: false,
        });
      }
    } else {
      this.setState({
        isAddSong: false,
        isConfirm: false,
        isAddMedia: false,
        isMediaConfirm: false,
      });
    }
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <DetailWrapper
          handleExit={this.props.exit}
          classNames="gigWrapper"
          isUnmounting={this.props.isUnmounting}
        >
          {this.state.error && <p className="font-bold mb-1">{this.state.error}</p>}
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
            <What
              songs={this.props.songs}
              authUser={this.props.authUser}
              setList={this.translateSetList(this.state.setList)}
              onMoveUp={this.onMoveUp}
              onMoveDown={this.onMoveDown}
              tab={this.state.tab}
              onAddSong={this.onAddSong}
              onAddMedia={this.onAddMedia}
              onChangeTab={this.onChangeTab}
              onDeleteMedia={this.onStartDeleteMedia}
              onDeleteSong={this.onDeleteSong}
              media={this.state.media}
            />

            {this.props.authUser && navigator.onLine &&
              <>
                <EditOrCreate
                  isEdit={this.state.isEdit}
                  className={styles.btnSubmit}
                  handleCreate={this.onCreate}
                  handleEdit={this.onEdit}
                  createValidation={this.state.location}
                  editValidation={this.state.hasChanged}
                />
                <button
                  style={{ gridArea: 'delete' }}
                  onClick={() => this.setState({ isConfirm: true })}
                >
                  Delete Gig
                </button>
              </>
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
                  className={styles.modalInnerLg}
                  onClick={this.onPushToSetList}
                  songs={Object.values(this.props.songs)}
                  sharks={this.props.sharks}
                  setList={this.translateSetList(this.state.setList)}
                />
              </div>
            </Modal>
          }
          {this.state.isAddMedia &&
            <Modal>
              <div
                id="modalBG"
                className={styles.modalBG}
                onClick={this.closeModal}
              >
                <div className={styles.modalInnerSm}>
                  <h2 className="text-center mb-4 font-futura">Please enter the source of the photo</h2>
                  <form
                    className="p-2"
                  >
                    <input
                      disabled={!this.props.authUser}
                      name="src"
                      onChange={this.onChange}
                      value={this.state.src}
                      className="block text-lg mb-4 p-2 w-full border-black border-2"
                    />
                    <button
                      onClick={this.onPushToMedia}
                      type="submit"
                      // disabled={!this.props.authUser || this.state.src}
                      className="border-black border-2 text-lg block mx-auto p-2 rounded-lg"
                    >
                      save picture
                    </button>
                  </form>
                </div>
              </div>
            </Modal>
          }
          {this.state.isConfirm &&
            <Modal>
              <div
                id="modalBG"
                className={styles.modalBG}
                onClick={this.closeModal}
              >
                <div className={styles.modalInnerSm}>
                  <Confirm
                    onYes={this.onDeleteGig}
                    onNo={this.closeModal}
                    message="Are you sure you want to delete this gig?"
                    disabled={this.state.isDisabled}
                  />
                </div>
              </div>
            </Modal>
          }
          {this.state.isMediaConfirm &&
            <Modal>
              <div
                id="modalBG"
                className={styles.modalBG}
                onClick={this.closeModal}
              >
                <div className={styles.modalInnerSm}>
                  <Confirm
                    onYes={this.onFinishDeleteMedia}
                    onNo={this.closeModal}
                    message="Are you sure you want to delete this media item?"
                    disabled={this.state.isDisabled}
                  />
                </div>
              </div>
            </Modal>
          }
          <button id="detailExit" onClick={this.props.exit} className={styles.btnClose}>
            >
          </button>
         </DetailWrapper>
        </DragDropContext>
    );
  }

}



export default Gig;
