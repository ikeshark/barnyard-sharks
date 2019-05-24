import React from 'react';

import Gig from './Gig';
import GigList from './GigList';
import delayUnmounting from '../common/delayUnmounting';

const DelayedGig = delayUnmounting(Gig);

const INITIAL_STATE = {
  sortType: '',

  detailedGig: {},
  detailedGigID: '',
  isDetail: false,

  loading: false,
  error: null,
}

class Gigs extends React.Component {
  state = { ...INITIAL_STATE };

  showDetail = e => {
    const detailedGigID = e.target.value ? e.target.value : e.target.parentNode.value;
    const detailedGig = Object.entries(this.props.gigs)
      .filter(gig => gig[0] === detailedGigID)[0][1];
    this.setState({ isDetail: false }, () => {
      this.setState({
        detailedGig,
        detailedGigID,
        isDetail: true
      });
    })
  }
  exitDetail = e => {
    const halfModal = document.querySelector('.halfModalBG');
    const exitBtn = document.querySelector('.exit');
    if (e.target === halfModal || e.target === exitBtn) {
      this.setState({
        isDetail: false,
        detailedGig: {},
        detailedGigID: '',
      });
    }
  }
  addNewGig = () => {
    this.setState({
      detailedGig: {date: '', location: '', setList: []},
      detailedGigID: '',
      isDetail: true
    });
  }

  render() {
    return (
      <main>
        <div className="mainWrapper">
          <GigList
            showDetail={this.showDetail}
            gigs={this.props.gigs}
            detailedGig={this.state.detailedGig}
          />
        </div>

        {
          this.props.authUser &&
          <button className="newSongBtn" onClick={this.addNewGig}>
            new gig
          </button>
        }

        <DelayedGig
          delayTime={300}
          isMounted={this.state.isDetail}
          gigId={this.state.detailedGigID}
          firebase={this.props.firebase}
          songs={this.props.songs}
          gig={this.state.detailedGig}
          exit={this.exitDetail}
          authUser={this.props.authUser}
          sharks={this.props.sharks}
        />

      </main>
    );
  }
}

export default Gigs;
