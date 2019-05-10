import React, { Component } from 'react';

import Firebase from './firebase';
import Modal from './Modal';
import Nav from './Nav';
import Loader from './Loader';
import Songs from './Songs';
import Gigs from './Gigs';
import Sharks from './Sharks';
import { SignInForm, SignOutButton } from './User';

const INITIAL_STATE = {
  songs: {},
  gigs: {},
  sharks: {},

  isLoadAnimation: true,
  tab: 'songs',
  isAuthDisplay: false,
  authUser: null,
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.firebase = new Firebase();
  }

  componentDidMount() {
    setTimeout(() => this.endAnimation(), 2500);
    this.firebase.db.ref('songs').on('value', snapshot => {
      this.setState({ songs: snapshot.val() });
    });
    this.firebase.db.ref('gigs').on('value', snapshot => {
      this.setState({ gigs: snapshot.val() });
    });
    this.firebase.db.ref('sharks').on('value', snapshot => {
      this.setState({ sharks: snapshot.val() });
    });
    this.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser ?
          this.setState({ authUser, isAuthDisplay: false }) :
          this.setState({ authUser: null });
      }
    );
  }

  endAnimation = () => {
    this.setState({ isLoadAnimation: false })
  }

  onClickNav = e => {
    this.setState({ tab: e.target.value });
  }

  onShowSignIn = () => {
    this.setState({ isAuthDisplay: true });
  }

  renderSignInOrOut = () => {
    if (this.state.authUser) {
      return (
        <SignOutButton
          className="userBtn"
          firebase={this.firebase}
        />
      );
    } else {
      return (
        <button
          onClick={this.onShowSignIn}
          className="userBtn"
        >
          Sign In
        </button>
      );
    }
  }

  onModalClose = e => {
    if (e.target === document.querySelector('.modalBG')) {
      this.setState({ isAuthDisplay: false });
    };
  }


  renderMain = () => {
    switch (this.state.tab) {
      case 'songs':
        return (
          <Songs
            songs={this.state.songs}
            firebase={this.firebase}
            sharks={this.state.sharks}
            authUser={this.state.authUser}
          />
        );
      case 'gigs':
        return (
          <Gigs
            gigs={this.state.gigs}
            songs={this.state.songs}
            firebase={this.firebase}
            authUser={this.state.authUser}
            sharks={this.state.sharks}
          />
        );
      case 'sharks':
        return (
          <Sharks
            sharks={this.state.sharks}
            firebase={this.firebase}
            songs={this.state.songs}
            authUser={this.state.authUser}
          />
        );
      default:
        return (
          <Songs
            songs={this.state.songs}
            firebase={this.firebase}
            authUser={this.state.authUser}
          />
        );
    }
  }

  render() {
    const { sharks, songs, gigs, isLoadAnimation } = this.state;
    const loading = (
      sharks.hasOwnProperty('active') &&
      songs.hasOwnProperty('aynrand') &&
      typeof gigs === 'object'
    ) ? false : true;
    return (
      <div className="App">
        {(isLoadAnimation || loading) && <Loader />}
        {!loading &&
          <div>
            <Nav onClickNav={this.onClickNav} tab={this.state.tab} />

            {this.renderMain()}

            {this.renderSignInOrOut()}

            {this.state.isAuthDisplay &&
              <Modal onClose={this.onModalClose}>
                <SignInForm className="modalBox" firebase={this.firebase} />
              </Modal>
            }
          </div>
        }
      </div>
    );
  }
}

export default App;
