import React, { Component } from 'react';
import { connect } from 'react-redux';

import { songsFetch, gigsFetch, sharksFetch } from '../actions';
import localforage from 'localforage';

import Firebase from './firebase';
import Header from './Header';
import Loader from './Loader';

import Songs from './Songs';
import Gigs from './Gigs';
import Sharks from './Sharks';

import Modal from './common/Modal';
import { SignInForm } from './User';

const INITIAL_STATE = {
  isLoadAnimation: true,
  tab: 'songs',
  isAuthDisplay: false,
  authUser: null,
}

const styles = {
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
      this.props.songsFetch();
      this.props.gigsFetch();
      this.props.sharksFetch();
      // to do
//      localforage.setItem('songs', snapshot.val())
//      localforage.setItem('gigs', snapshot.val())
//       localforage.setItem('sharks', snapshot.val())

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
    this.setState({ isAuthDisplay: true });
  }

  onModalClose = () => {
    this.setState({ isAuthDisplay: false });
  }

  renderMain = () => {
    switch (this.state.tab) {
      case 'songs':
        return (
          <Songs authUser={this.state.authUser} />
        );
      case 'gigs':
        return (
          <Gigs
            songs={this.props.songs}
            gigs={this.props.gigs}
            sharks={this.props.sharks}
            firebase={this.firebase}
            authUser={this.state.authUser}
          />
        );
      case 'sharks':
        return (
          <Sharks
            songs={this.props.songs}
            sharks={this.props.sharks}
            firebase={this.firebase}
            authUser={this.state.authUser}
          />
        );
      default:
        return (
          <Songs authUser={this.state.authUser} />
        );
    }
  }

  render() {
    const { isLoadAnimation } = this.state;
    const { songs, gigs, sharks } = this.props;
    const loading = (
      Object.entries(sharks).length &&
      Object.entries(songs).length &&
      Object.entries(gigs).length
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
              <Modal
                innerStyles={styles.modalInner}
                exit={this.onModalClose}
              >
                <SignInForm
                  className=''
                  firebase={this.firebase}
                />
              </Modal>
            }
          </>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { songs } = state.songs;
  const { gigs } = state.gigs;
  const { sharks } = state.sharks;
  return { songs, gigs, sharks };
};

export default connect(mapStateToProps,
  { songsFetch, gigsFetch, sharksFetch }
)(App);
