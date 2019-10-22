import React, { Component } from 'react';

import Firebase from './firebase';
import Header from './Header';
import Loader from './Loader';

import Songs from './Songs';
import Gigs from './Gigs';
import Sharks from './Sharks';

import Modal from './common/Modal';
import { SignInForm } from './User';

const INITIAL_STATE = {
  songs: {},
  gigs: {},
  sharks: {},

  isLoadAnimation: true,
  tab: 'songs',
  isAuthDisplay: false,
  authUser: null,
}

const styles = {
  modalBG: `
    fixed top-0 left-0
    w-full h-screen z-100
    bg-black-opaque
    flex items-center justify-center
  `,
  modalInner: `
    w-10/12 h-10/12
    bg-white shadow-inset
    p-4 text-lg
    flex flex-col
  `,
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.firebase = new Firebase();
  }

  componentDidMount() {
    setTimeout(() => this.endAnimation(), 3000);
    this.firebase.db.ref('songs').on('value', snapshot => {
      this.setState({ songs: snapshot.val() });
    });
    this.firebase.db.ref('gigs').on('value', snapshot => {
      this.setState({ gigs: snapshot.val() });
    });
    this.firebase.db.ref('sharks').on('value', snapshot => {
      this.setState({ sharks: snapshot.val() });
    });
    if (localStorage.getItem('tab')) {
      this.setState({ tab: localStorage.getItem('tab') });
    }
    window.addEventListener('unload', () => {
      localStorage.setItem('tab', this.state.tab)
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
    console.log('trigger')
    this.setState({ isAuthDisplay: true });
  }

  onModalClose = e => {
    if (e.target === document.querySelector('#modalBG')) {
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
      <div className="h-screen overflow-hidden">
        {(isLoadAnimation || loading) && <Loader />}
        {!loading &&
          <>
            <Header
              onClickNav={this.onClickNav}
              tab={this.state.tab}
              authUser={this.state.authUser}
              firebase={this.firebase}
              onShowSignIn={this.onShowSignIn}
            />

            {this.renderMain()}

            {this.state.isAuthDisplay &&
              <Modal>
                <div
                  id="modalBG"
                  className={styles.modalBG}
                  onClick={this.onModalClose}
                >
                  <SignInForm
                    className={styles.modalInner}
                    firebase={this.firebase}
                  />
                </div>
              </Modal>
            }
          </>
        }
      </div>
    );
  }
}

export default App;
