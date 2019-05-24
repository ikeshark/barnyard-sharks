import React from 'react';

import Shark from './Shark';
import SharkList from './SharkList';
import delayUnmounting from '../common/delayUnmounting';

const SharkDelayUnmount = delayUnmounting(Shark);

const INITIAL_STATE = {
  detailedShark: {},
  detailedSharkID: '',

  isDetail: false
}

class Sharks extends React.Component {
  state = {...INITIAL_STATE};

  showDetail = e => {
    const detailedSharkID = e.target.value;
    const detailedShark = Object.entries(this.props.sharks.active)
      .filter(shark => shark[0] === detailedSharkID)[0][1];
    this.setState({ isDetail: false }, () => {
      this.setState({
        detailedShark,
        detailedSharkID,
        isDetail: true
      });
    })
  }

  exitDetail = e => {
    const halfModalBG = document.querySelector('.halfModalBG');
    const exitBtn = document.querySelector('.exit');
    if (e.target === halfModalBG || e.target === exitBtn) {
      this.setState({ ...INITIAL_STATE });
    }
  }

  render() {
    return (
      <main>
        <SharkList
          sharks={this.props.sharks}
          showDetail={this.showDetail}
          detailedShark={this.state.detailedShark}
        />
        <SharkDelayUnmount
          delayTime={300}
          isMounted={this.state.isDetail}

          sharkId={this.state.detailedSharkID}
          firebase={this.props.firebase}
          songs={this.props.songs}
          sharks={this.props.sharks}
          shark={this.state.detailedShark}
          exit={this.exitDetail}
          authUser={this.props.authUser}
        />
      </main>
    );
  }
}

export default Sharks;
