import React from 'react';

const INITIAL_STATE = {
  audio: '',
  dob: 0,
  dobInput: '',
  hasChanged: false,
  name: '',
  status: '',
  vox: '',
  isCover: false,
};

class Song extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.setState({
      audio: this.props.song.audio,
      dob: this.props.song.dob,
      name: this.props.song.name,
      vox: this.props.song.vox,
      status: this.props.song.status,
      isCover: this.props.song.isCover || false,
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      hasChanged: true
    });
  }
  onEdit = () => {
    const { audio, dob, name, status, vox } = this.state;

    this.props.firebase.db.ref(`songs/${this.props.id}`).update({
      audio,
      dob,
      name,
      status,
      vox,
    });

    this.setState({ hasChanged: false });
  }
  onCreate = () => {
    const newSong = {
      audio: this.state.audio || '',
      vox: this.state.vox,
      dob: this.state.dob,
      status: this.state.status,
      name: this.state.name,
    };
    this.props.firebase.doCreateSong(newSong);
    this.props.exit();
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
  processDate = date => {
    if (date == '') {
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

  renderSaveOrCreate = () => {
    if (this.props.id === '') {
      return (
        <button
          className="button songCreate"
          onClick={this.onCreate}
          disabled={!this.state.name}
        >
          create new song
        </button>
      );
    }
    return (
      <button
        className="button songEdit"
        onClick={this.onEdit}
        disabled={!this.state.hasChanged}
      >
        save edits
      </button>
    );
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
    } else {
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
    }
  }

  render() {
    return (
      <div className="wrapper">
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
          <input
            disabled={!this.props.authUser}
            name="status"
            onChange={this.onChange}
            value={this.state.status}
            className="input"
          />
        </label>
        <label className="label songVocalist">
          vocalist
          <input
            disabled={!this.props.authUser}
            name="vox"
            onChange={this.onChange}
            value={this.state.vox}
            className="input"
          />
        </label>
        {this.renderAudio()}
        <label className="label songLyrics">
          lyrics
          <input
            type="input"
            disabled={!this.props.authUser}
            name="lyrics"
            className="input"
          />
        </label>
        <label className="label songCover">
          cover?
          <input
            type="checkbox"
            disabled={!this.props.authUser}
            name="isCover"
            onChange={this.onBoolChange}
            value={this.state.isCover}
            className="input"
          />
        </label>
        <label className="label songRequired">
          Required Sharks
          <input
            type="input"
            disabled={!this.props.authUser}
            name="requiredSharks"
            className="input"
          />
        </label>
        {this.renderSaveOrCreate()}

        <button onClick={this.props.exit} className="button exit">
          >
        </button>
       </div>
    );
  }

}

export default Song;
