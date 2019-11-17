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
    const modalBG = document.querySelector('#halfModalBG');
    const exitBtn = document.querySelector('#detailExit');
    if (!e || e.target === modalBG || e.target === exitBtn) {
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
      <main className="h-mainWrapper flex bg-tan shadow-inset">
        <div className="relative w-full md:w-1/2">
          <GigList
            showDetail={this.showDetail}
            gigs={this.props.gigs}
            detailedGig={this.state.detailedGig}
          />
          {
            this.props.authUser && navigator.onLine &&
            <button
              className="absolute top-0 right-0 mt-2 mr-2 h-16 w-16 rounded-full p-1 bg-tan border border-black leading-none shadow-slategray"
              onClick={this.addNewGig}
            >
              new gig
            </button>
          }
        </div>



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
