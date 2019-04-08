import React, { Component } from 'react';

import Firebase from './firebase';
import Nav from './Nav';
import Songs from './Songs';
import Gigs from './Gigs';

const INITIAL_STATE = {
  songs: [],
  gigs: [],
  loading: false,
  tab: 'songs',
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.firebase = new Firebase();
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.firebase.db.ref('songs').on('value', snapshot => {
      this.setState({
        songs: snapshot.val(),
        loading: false
      });
    });
    this.firebase.db.ref('gigs').on('value', snapshot => {
      this.setState({
        gigs: snapshot.val(),
        loading: false
      });
    });
  }

  onClickNav = e => {
    this.setState({ tab: e.target.value });
  }

  renderMain = () => {
    switch (this.state.tab) {
      case 'songs':
        return (
          <Songs
            songs={this.state.songs}
            firebase={this.firebase}
          />
        );
      case 'gigs':
        return (
          <Gigs
            gigs={this.state.gigs}
            songs={this.state.songs}
            firebase={this.firebase}
          />
        );
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.loading && <p>loading...</p>}
        {!this.state.loading &&
          <div>
            <Nav onClickNav={this.onClickNav} tab={this.state.tab}/>
            {this.renderMain()}
          </div>
        }
      </div>
    );
  }
}

export default App;
