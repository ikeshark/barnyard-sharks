import React from 'react';

import Shark from './Shark';

const INITIAL_STATE = {
  isDetail: false;
}



class Sharks extends React.Component {
  state = {...INITIAL_STATE};

  render() {
    return (
      <div>
        {
          this.state.isDetail &&
          <Shark />
        }
      </div>
    );
  }
}
