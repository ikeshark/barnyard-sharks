import React from 'react';

import { Modal, SharkSelect, DetailWrapper, EditOrCreate } from '../../common';

const INITIAL_STATE = {
  audio: '',
  dob: 0,
  dobInput: '',
  hasChanged: false,
  name: '',
  status: '',
  vox: '',
  lyrics: '',
  reqSharks: '',
  isCover: false,
  isVocalEdit: false,
  isReqSharksEdit: false,
  error: '',
};

const styles = {
  wrapper: 'grid-song overflow-y-scroll h-full w-full p-4',
  label: 'border border-black shadow-card p-2 text-sm',
  iframe: 'border border-black shadow-card p-2 text-sm w-full h-80px',
  inputXL: 'block text-xl w-full mt-2 -mb-2',
  inputLG: 'block text-lg w-full mt-2 -mb-2',
  btnOuter: 'relative text-left text-sm border border-black rounded-lg shadow-card p-2',
  btnLabel: 'absolute top-0 left-0 mt-2 ml-2',
  btnValue: 'block text-xl mt-3 -mb-1',
  audio: 'border border-black shadow-card p-2 text-sm m-0',
  btnText: 'absolute top-0 left-0 ml-2 mt-2 text-lg text-left leading-none',
  cover: 'absolute top-0 right-0 mt-6 mr-8 text-sm md:mr-10 lg:mr-20',
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
  modalInner: `
    w-10/12 h-10/12
    bg-white shadow-inset
    p-4 text-lg
    flex flex-col
  `,
  btnToggle: `
    relative m-1 p-3
    border border-black rounded-10
    btn-toggle
  `
}

class Song extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.setState({
      audio: this.props.song.audio || '',
      dob: this.props.song.dob,
      name: this.props.song.name,
      vox: this.props.song.vox,
      status: this.props.song.status,
      isCover: this.props.song.isCover || false,
      lyrics: this.props.song.lyrics || '',
      reqSharks: this.props.song.reqSharks || '',
    });
  }

  processAudioEmbed = () => {
    const embed = this.state.newAudio
    const reSoundCloud = /soundcloud/i;
    const reBandCamp = /bandcamp/i;
    let host;
    if (reBandCamp.test(embed)) {
      host = 'bandcamp';
    } else if (reSoundCloud.test(embed)) {
      host = 'soundcloud';
    } else {
      return 'invalid embed';
    }
    // looks for the word track(s) followed by "=" or "/"
    // then records the numbers
    const reTrackID = /tracks?[=\/](\d+)/;
    const trackID = reTrackID.exec(embed)[1];
    this.setState({audio: { host: host, trackID: trackID }});
  }
  renderAudio = () => {
    if (this.state.audio) {
      if (this.state.audio.host === 'soundcloud') {
        const source = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${this.state.audio.trackID}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`
        return <iframe style={{ gridArea: 'audio' }} className={styles.iframe} title="soundcloud" src={source}></iframe>
      } else {
        const source = `https://bandcamp.com/EmbeddedPlayer/size=small/bgcol=ffffff/linkcol=0687f5/track=${this.state.audio.trackID}/transparent=true/`;
        return <iframe style={{ gridArea: 'audio' }} className={styles.iframe} title="bandcamp" src={source}><p>{this.state.name}</p></iframe>
      }
    } else if (this.props.authUser) {
      return (
        <form
          className={styles.audio}
          onSubmit={this.processAudioEmbed}
          style={{ gridArea: 'audio' }}
        >
          <label>
            audio
            <input
              disabled={!this.props.authUser}
              placeholder="enter entire embed code"
              name="newAudio"
              onChange={this.onChange}
              value={this.state.newAudio}
              className={styles.inputLG}
            />
          </label>
        </form>
      );
    } else {return}
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      hasChanged: true,
      error: '',
    });
  }
  onEdit = () => {
    const { audio, dob, name, status, vox, isCover, lyrics, reqSharks } = this.state;
    const songs = Object.entries(this.props.songs);
    let validation = true;
    // see if any songs share the same name as edited song
    // (excluding the song iteslf i.e. the name was not edited)
    songs.forEach(song => {
      if (song[1].name === name && song[0] !== this.props.songId) {
        this.setState({ error: 'song names must be unique' });
        validation = false;
      }
    });
    if (validation) {
      this.props.firebase.db.ref(`songs/${this.props.songId}`).update({
        audio,
        dob,
        name,
        status,
        vox,
        isCover,
        lyrics,
        reqSharks,
      });
      this.setState({ hasChanged: false });
    }
  }
  onCreate = () => {
    const newSong = {
      audio: this.state.audio || '',
      vox: this.state.vox,
      dob: this.state.dob,
      status: this.state.status,
      name: this.state.name,
      isCover: this.state.isCover,
      lyrics: this.state.lyrics,
      reqSharks: this.state.reqSharks,
    };

    const titles = Object.values(this.props.songs).map(song => song.name);
    if (titles.filter(title => title === newSong.name)[0] === undefined) {
      this.props.firebase.doCreateSong(newSong)
      this.props.exit();
    } else {
      this.setState({ error: 'song names must be unique' });
    }
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
        dob: newDate,
        hasChanged: true
      });
    } else {
      this.setState({
        dob: '',
        dobInput: e.target.value
      })
    }
  }

  onBoolChange = e => {
    this.setState({
      hasChanged: true,
      isCover: !!e.target.checked
    });
  }

  closeModal = e => {
    if (e) {
      if (e.target === document.querySelector('#modalBG')) {
        this.setState({
          isLyricDisplay: false,
          isReqSharksEdit: false,
          isVocalEdit: false,
        });
      }
    } else {
      this.setState({
        isLyricDisplay: false,
        isReqSharksEdit: false,
        isVocalEdit: false,
      });
    }
  }
  handleReqSharksChange = e => {
    const value = e.target.value;
    let reqSharks = this.state.reqSharks;

    console.log(value, reqSharks)

    const re = new RegExp(value);
    // if reqSharks has value
    if (re.test(reqSharks)) {
      // take out value
      const re = new RegExp(',');
      // if there is a comma, ie multiple values
      if (re.test(reqSharks)) {
        let reqSharksArray = reqSharks.split(', ');
        reqSharksArray.splice(reqSharksArray.indexOf(value), 1);
        reqSharks = reqSharksArray.join(', ');
      } else {
        reqSharks = '';
      }
      this.setState({ reqSharks, hasChanged: true });
    } else {
      // add value
      this.setState({
        reqSharks: reqSharks ? `${reqSharks}, ${value}` : value,
        hasChanged: true
      });
    }

  }
  handleVoxChange = e => {
    const value = e.target.value;
    let vox = this.state.vox;

    if (value === 'instrumental') {
      if (vox === 'instrumental') {
        this.setState({ vox: '', hasChanged: true })
      } else {
        this.setState({ vox: 'instrumental', hasChanged: true });
      }
    } else if (vox === 'instrumental') {
      this.setState({ vox: value, hasChanged: true })
    } else {
      const re = new RegExp(value);
      // if vox has value
      if (re.test(vox)) {
        // take out value
        const re = new RegExp(',');
        // if there is a comma, ie multiple values
        if (re.test(vox)) {
          let voxArray = vox.split(', ');
          voxArray.splice(voxArray.indexOf(value), 1);
          vox = voxArray.join(', ');
        } else {
          vox = '';
        }
        this.setState({ vox, hasChanged: true });
      } else {
        // add value
        this.setState({
          vox: vox ? `${vox}, ${value}` : value,
          hasChanged: true
        });
      }
    }

  }

  processVox = () => {
    if (this.state.vox === '') {
      return ''
    }
    const inputArray = this.state.vox.split(', ');
    let outputArray = [];
    inputArray.forEach(vox => {
      if (vox !== 'instrumental' && vox !== 'gang') {
        const sharks = Object.entries(this.props.sharks.active);
        const sharkObj = sharks.filter(shark => shark[0] === vox)[0];
        const name = sharkObj[1].name;
        outputArray.push(name);
      } else {
        outputArray.push(vox)
      }
    });
    return outputArray.join(', ');
  }

  render() {
    return (
      <DetailWrapper
        handleExit={this.props.exit}
        classNames="songWrapper"
        isUnmounting={this.props.isUnmounting}
      >
        <div className={styles.wrapper}>
          {this.state.error && <p className="text-red-700 font-bold">{this.state.error}</p>}
          <label className={styles.label} style={{ gridArea: 'name' }}>
            name
            <input
              disabled={!this.props.authUser}
              name="name"
              onChange={this.onChange}
              value={this.state.name}
              className={styles.inputXL}
            />
          </label>
          <label className={styles.label} style={{ gridArea: 'date' }}>
            date of birth
            <input
              disabled={!this.props.authUser}
              name="dob"
              onChange={this.onDateChange}
              value={this.processDate(this.state.dob) || this.state.dobInput}
              className={styles.inputLG}
              placeholder="mm/dd/yyyy"
            />
          </label>
          <label className={styles.label} style={{ gridArea: 'status' }}>
            status
            <select
              disabled={!this.props.authUser}
              name="status"
              onChange={this.onChange}
              value={this.state.status}
              className={styles.inputXL}
            >
              <option value="solid">solid</option>
              <option value="shakey">shakey</option>
              <option value="inactive">inactive</option>
              <option value="retired">retired</option>
              <option value="idea">idea</option>
            </select>
          </label>

          <button
            className={styles.btnOuter}
            style={{ gridArea: 'vocals' }}
            disabled={!this.props.authUser}
            onClick={() => this.setState({ isVocalEdit: true })}
          >
            <span className={styles.btnLabel}>vocalist</span>
            <span className={styles.btnValue}>
              {this.processVox()}
            </span>
          </button>

          {this.renderAudio()}
          <button
            style={{ gridArea: 'lyrics' }}
            className={
              this.state.lyrics ?
              styles.btnOuter + " bg-pink" :
              styles.btnOuter
            }
            onClick={() => this.setState({ isLyricDisplay: true })}
          >
            <span className={styles.btnText}>
              {this.state.lyrics ? "" : "Add "} Lyrics
            </span>
          </button>

          <button
            className={
              this.state.reqSharks ?
              styles.btnOuter + " bg-pink" :
              styles.btnOuter
            }
            style={{ gridArea: 'required' }}
            disabled={!this.props.authUser}
            onClick={() => this.setState(prevState => ({ isReqSharksEdit: !prevState.isReqSharksEdit }))}
          >
            <span className={styles.btnText}>Required Sharks</span>
          </button>

          {this.props.authUser &&
            <EditOrCreate
              isEdit={!!this.props.songId}
              className={styles.btnSubmit}
              title="song"
              handleCreate={this.onCreate}
              handleEdit={this.onEdit}
              createValidation={this.state.name}
              editValidation={this.state.hasChanged}
            />
          }

          <label className={styles.cover}>
            {this.state.isCover ? "cover" : "original"}
            <input
              type="checkbox"
              disabled={!this.props.authUser}
              name="isCover"
              className="invisible"
              onChange={this.onBoolChange}
              checked={this.state.isCover}
            />
          </label>

        </div>

        {this.state.isLyricDisplay &&
          <Modal>
            <div
              id="modalBG"
              className={styles.modalBG}
              onClick={this.closeModal}
            >
              <label className={styles.modalInner}>
                lyrics
                <textarea
                  disabled={!this.props.authUser}
                  readOnly={!this.props.authUser}
                  name="lyrics"
                  className="border border-black block w-full text-lg p-4 mt-2 h-11/12"
                  onChange={this.handleVoxChange}
                  value={this.state.lyrics}
                >
                </textarea>
              </label>
            </div>
          </Modal>
        }

        {this.state.isReqSharksEdit &&
          <Modal>
            <div
              id="modalBG"
              className={styles.modalBG}
              onClick={this.closeModal}
            >
              <div className={styles.modalInner}>
                <h3 className="font-futura font-bold w-full text-2xl text-center">
                  WHO IS REQUIRED?
                </h3>
                <SharkSelect
                  checkedCondition={this.state.reqSharks}
                  handleChange={this.handleReqSharksChange}
                  sharks={this.props.sharks}
                />
              </div>
            </div>
          </Modal>
        }

        {this.state.isVocalEdit &&
          <Modal>
            <div
              id="modalBG"
              className={styles.modalBG}
              onClick={this.closeModal}
            >
              <div className={styles.modalInner}>
                <SharkSelect
                  checkedCondition={this.state.vox}
                  handleChange={this.handleVoxChange}
                  sharks={this.props.sharks}
                >
                  <>
                    <button
                      type="button"
                      onClick={this.handleVoxChange}
                      className={
                        /gang/.test(this.state.vox) ?
                        styles.btnToggle + " bg-deeppink text-white shadow-sm" :
                        styles.btnToggle
                      }
                      value="gang"
                      key="gang"
                    >
                      Gang
                    </button>
                    <button
                      type="button"
                      onClick={this.handleVoxChange}
                      className={
                        /instrumental/.test(this.state.vox) ?
                        styles.btnToggle + " bg-deeppink text-white shadow-sm" :
                        styles.btnToggle
                      }
                      value="instrumental"
                      key="instrumental"
                    >
                      Instrumental
                    </button>
                  </>
                </SharkSelect>
              </div>
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

export default Song;
