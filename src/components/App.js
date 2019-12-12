import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import localforage from 'localforage';

import reducers from '../reducers';
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
    // if user is loading app for first time show entire animation
    localforage.getItem('hasVisited').then(hasVisited => {
      const timeOut = hasVisited ? 0 : 3000;
      setTimeout(() => this.endAnimation(), timeOut);
    }).then(() => localforage.setItem('hasVisited', true));

    // remember which tab the user was last on
    localforage.getItem('tab').then(tab => {
      if (tab) this.setState({ tab });
    })
    // if online load from localforage
    if (!navigator.onLine) {
      localforage.getItem('songs').then(songs => {
        if (songs) {
          const songPromise = localforage.getItem('songs');
          const gigPromise = localforage.getItem('gigs');
          const sharkPromise = localforage.getItem('sharks');

          Promise.all([songPromise, gigPromise, sharkPromise]).then(values => {
            this.setState({
              songs: values[0],
              gigs: values[1],
              sharks: values[2]
            })
          })
        }
      })
    } else {
      this.firebase.db.ref('songs').on('value', snapshot => {
        this.setState({ songs: snapshot.val() });
        localforage.setItem('songs', snapshot.val())
      });
      this.firebase.db.ref('gigs').on('value', snapshot => {
        this.setState({ gigs: snapshot.val() });
        localforage.setItem('gigs', snapshot.val())
      });
      this.firebase.db.ref('sharks').on('value', snapshot => {
        this.setState({ sharks: snapshot.val() });
        localforage.setItem('sharks', snapshot.val())
      });
    }

    window.addEventListener('beforeunload', () => {
      localforage.setItem('tab', this.state.tab);
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
            gigs={this.state.gigs}
            sharks={this.state.sharks}
            firebase={this.firebase}
            authUser={this.state.authUser}
          />
        );
      case 'gigs':
        return (
          <Gigs
            songs={this.state.songs}
            gigs={this.state.gigs}
            sharks={this.state.sharks}
            firebase={this.firebase}
            authUser={this.state.authUser}
          />
        );
      case 'sharks':
        return (
          <Sharks
            songs={this.state.songs}
            sharks={this.state.sharks}
            firebase={this.firebase}
            authUser={this.state.authUser}
          />
        );
      default:
        return (
          <Songs
            songs={this.state.songs}
            gigs={this.state.gigs}
            sharks={this.state.sharks}
            firebase={this.firebase}
            authUser={this.state.authUser}
          />
        );
    }
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const { sharks, songs, gigs, isLoadAnimation } = this.state;
    const loading = (
      Object.entries(sharks).length &&
      Object.entries(songs).length &&
      Object.entries(gigs).length
    ) ? false : true;
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
