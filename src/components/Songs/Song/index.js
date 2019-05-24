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
        return <iframe title="soundcloud" height="70" src={source}></iframe>
      } else {
        const source = `https://bandcamp.com/EmbeddedPlayer/size=small/bgcol=ffffff/linkcol=0687f5/track=${this.state.audio.trackID}/transparent=true/`;
        return <iframe title="bandcamp" height="45" src={source}><p>{this.state.name}</p></iframe>
      }
    } else if (this.props.authUser) {
      return (
        <form className="audioForm" onSubmit={this.processAudioEmbed}>
          <label className="label audio">
            audio
            <input
              disabled={!this.props.authUser}
              placeholder="enter entire embed code"
              name="newAudio"
              onChange={this.onChange}
              value={this.state.newAudio}
              className="input"
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
    console.log(e.target)
    if (e) {
      if (e.target === document.querySelector('.modalBG')) {
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
    if (e.target.checked) {
      this.setState({
        reqSharks: reqSharks ? `${reqSharks}, ${value}` : value,
        hasChanged: true
      });
    } else if (!e.target.checked) {
      const test = new RegExp(',');
      // if there is a comma, ie multiple values
      if (test.test(reqSharks)) {
        let reqSharksArray = reqSharks.split(', ');
        reqSharksArray.splice(reqSharksArray.indexOf(value), 1);
        reqSharks = reqSharksArray.join(', ');
      } else {
        reqSharks = '';
      }
      this.setState({ reqSharks, hasChanged: true });
    }
  }
  handleVoxChange = e => {
    const value = e.target.value;
    let vox = this.state.vox;
    if (value === 'instrumental' && e.target.checked) {
      this.setState({ vox: 'instrumental', hasChanged: true });
    } else if (e.target.checked) {
      if (vox === 'instrumental') {
        this.setState({
          vox: value,
          hasChanged: true
        });
      } else {
        this.setState({
          vox: vox ? `${vox}, ${value}` : value,
          hasChanged: true
        });
      }
    } else if (!e.target.checked) {
      const test = new RegExp(',');
      // if there is a comma, ie multiple values
      if (test.test(vox)) {
        let voxArray = vox.split(', ');
        voxArray.splice(voxArray.indexOf(value), 1);
        vox = voxArray.join(', ');
      } else {
        vox = '';
      }
      this.setState({ vox, hasChanged: true });
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
        {this.state.error && <p className="red">{this.state.error}</p>}
        <label className="label songName">
          name
          <input
            disabled={!this.props.authUser}
            name="name"
            onChange={this.onChange}
            value={this.state.name}
            className="input"
          />
        </label>
        <label className="label songDate">
          date of birth
          <input
            disabled={!this.props.authUser}
            name="dob"
            onChange={this.onDateChange}
            value={this.processDate(this.state.dob) || this.state.dobInput}
            className="input"
            placeholder="mm/dd/yyyy"
          />
        </label>
        <label className="label songStatus">
          status
          <select
            disabled={!this.props.authUser}
            name="status"
            onChange={this.onChange}
            value={this.state.status}
            className="input"
          >
            <option value="solid">solid</option>
            <option value="shakey">shakey</option>
            <option value="inactive">inactive</option>
            <option value="retired">retired</option>
            <option value="idea">idea</option>
          </select>
        </label>

        <button
          className="label songVocalist"
          disabled={!this.props.authUser}
          onClick={() => this.setState({ isVocalEdit: true })}
        >
          <span>vocalist</span>
          <p className="input">
            {this.processVox()}
          </p>
        </button>
        {this.state.isVocalEdit &&
          <Modal>
            <div className="modalBG" onClick={this.closeModal}>
              <div className="modalSelectWrapper">
                <SharkSelect
                  checkedCondition={this.state.vox}
                  handleChange={this.handleVoxChange}
                  sharks={this.props.sharks}
                >
                  <>
                    <label
                      key="gang"
                      className={
                        /gang/.test(this.state.vox) ?
                        "label songVocalistOption active" :
                        "label songVocalistOption"
                      }
                    >
                      gang
                      <input
                        type="checkbox"
                        value="gang"
                        checked={/gang/.test(this.state.vox)}
                        className="input"
                        onChange={this.handleVoxChange}
                      />
                    </label>
                    <label
                      key="instrumental"
                      className={
                        /instrumental/.test(this.state.vox) ?
                        "label songVocalistOption active" :
                        "label songVocalistOption"
                      }
                    >
                      instrumental
                      <input
                        type="checkbox"
                        checked={/instrumental/.test(this.state.vox)}
                        value="instrumental"
                        className="input"
                        onChange={this.handleVoxChange}
                      />
                    </label>
                  </>
                </SharkSelect>
              </div>
            </div>
          </Modal>
        }
        {this.renderAudio()}
        <button
          className={this.state.lyrics ? "label songLyrics hasContent" : "label songLyrics"}
          onClick={() => this.setState({ isLyricDisplay: true })}
        >
          <span>{this.state.lyrics ? "" : "Add "} Lyrics</span>
        </button>
        <label className="songCover">
          {this.state.isCover ? "cover" : "original"}
          <input
            type="checkbox"
            disabled={!this.props.authUser}
            name="isCover"
            onChange={this.onBoolChange}
            checked={this.state.isCover}
          />
        </label>
        <button
          className={this.state.reqSharks ? "label songRequired hasContent" : "label songRequired"}
          disabled={!this.props.authUser}
          onClick={() => this.setState(prevState => ({ isReqSharksEdit: !prevState.isReqSharksEdit }))}
        >
          <span>Required Sharks</span>
        </button>

        {this.state.isReqSharksEdit &&
          <Modal>
            <div className="modalBG" onClick={this.closeModal}>
              <div className="modalSelectWrapper">
                <h3>WHO IS REQUIRED</h3>
                <SharkSelect
                  checkedCondition={this.state.reqSharks}
                  handleChange={this.handleReqSharksChange}
                  sharks={this.props.sharks}
                />
              </div>
            </div>
          </Modal>
        }

        {this.props.authUser &&
          <EditOrCreate
            isEdit={!!this.props.songId}
            className="songSubmit"
            title="song"
            handleCreate={this.onCreate}
            handleEdit={this.onEdit}
            createValidation={this.state.name}
            editValidation={this.state.hasChanged}
          />
        }

        {this.state.isLyricDisplay &&
          <Modal>
            <div className="modalBG" onClick={this.closeModal}>
              <label className="label songLyricsModal">
                lyrics
                <textarea
                  disabled={!this.props.authUser}
                  readOnly={!this.props.authUser}
                  name="lyrics"
                  className="input"
                  onChange={this.onChange}
                  value={this.state.lyrics}
                >
                </textarea>
              </label>
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

export default Song;
