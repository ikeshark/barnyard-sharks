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
    const modalBG = document.querySelector('#halfModalBG');
    const exitBtn = document.querySelector('#detailExit');
    if (e.target === modalBG || e.target === exitBtn) {
      this.setState({ ...INITIAL_STATE });
    }
  }

  render() {
    return (
      <main className="h-mainWrapper flex bg-tan shadow-inset">
        <div className="relative w-full md:w-1/2">
          <SharkList
            sharks={this.props.sharks}
            showDetail={this.showDetail}
            detailedShark={this.state.detailedShark}
          />
        </div>
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
