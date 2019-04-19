import React from 'react';

class Shark extends React.Component {
  state = {
    name: '',
    duties: '',
    quote: '',
    dob: 0,
  }
  onChange = e => {
    [e.target.name]: e.target.value;
  }

  render() {
    const { shark } = this.props;
    return (
      <form>
        <label>
          Name
          <input
            name="name"
            value={shark.name}
          />
        </label>
        <label>
          Duties
          <input
            name="duties"
            value={shark.duties}
          />
        </label>
        <label>
          Quote
          <input
            name="quote"
            value={shark.quote}
          />
        </label>
        <label>
          Shark Since
          <input
            name="dob"
            value={shark.dob}
          />
        </label>
      </form>
    );
  }
}
