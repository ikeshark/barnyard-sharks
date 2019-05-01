import React from 'react';

import Gig from './Gig';
import GigList from './GigList';

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
    const detailedGigID = e.target.value;
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
  exitDetail = () => {
    this.setState({ isDetail: false });
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

        {
          this.state.isDetail &&
          <Gig
            id={this.state.detailedGigID}
            firebase={this.props.firebase}
            songs={this.props.songs}
            gig={this.state.detailedGig}
            exit={this.exitDetail}
            authUser={this.props.authUser}
            sharks={this.props.sharks}
          />
        }
      </main>
    );
  }
}

export default Gigs;
