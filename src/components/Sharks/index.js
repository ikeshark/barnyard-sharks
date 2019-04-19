import React from 'react';

import Shark from './Shark';

const INITIAL_STATE = {

  detailedShark: {},
  detailedSharkID: '',
  isDetail: false;

}



class Sharks extends React.Component {
  state = {...INITIAL_STATE};

  showDetail = e => {
    const detailedSharkID = e.target.value;
    const detailedShark = Object.entries(this.props.sharks)
      .filter(shark => shark[0] === detailedSharkID)[0][1];
    this.setState({ isDetail: false }, () => {
      this.setState({
        detailedShark,
        detailedSharkID,
        isDetail: true
      });
    })
  }

  render() {
    return (
      <div>
        <SharkList
          sharks={this.props.sharks}
          detailedShark={this.state.detailedShark}
        />
        {
          this.state.isDetail &&
          <Shark
            id={this.state.detailedSharkID}
            firebase={this.props.firebase}
            sharks={this.props.sharks}
            shark={this.state.detailedShark}
            exit={this.exitDetail}
          />
        }
      </div>
    );
  }
}
