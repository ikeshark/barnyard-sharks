import React from 'react';

const INITIAL_STATE = {
  name: '',
  sharkSince: 0,
  dateInput: '',
  hasChanged: false,
}

class Shark extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.setState({
      name: this.props.shark.name || '',
      sharkSince: this.props.shark.sharkSince || '',
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      hasChanged: true,
    });
  }

  handleEdit = () => {
    this.props.firebase.db.ref(`sharks/active/${this.props.id}`).update({
      name: this.state.name,
      sharkSince: this.state.sharkSince
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

  render() {
    // if current user is the detailed shark, you are valid
    const validated = this.props.authUser.uid === this.props.id;
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
        {validated &&
          <button
            type="submit"
            onClick={this.handleEdit}
            disabled={!this.state.hasChanged || !validated}
          >
            save edits
          </button>
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
