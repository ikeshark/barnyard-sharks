import React, { useState } from 'react';
import { connect } from 'react-redux';

import { detailedGigChanged } from '../../actions';
import Gig from './Gig';
import GigList from './GigList';
import { delayUnmounting } from '../common';

import { main, floatingBtn } from '../../classLists';

const styles = { main, floatingBtn };

const DelayedGig = delayUnmounting(Gig);

const Gigs = ({ detailedGigChanged, detailedGig, authUser }) => {
  const [isDetail, toggleDetail] = useState(false);

  const exitDetail = e => {
    const modalBG = document.querySelector('#halfModalBG');
    const exitBtn = document.querySelector('#detailExit');

    if (!e || e.target === modalBG || e.target === exitBtn) toggleDetail(false);
  }
  const enterDetail = value => {
    detailedGigChanged(value);
    toggleDetail(true);
  }

  const addNewGig = () => {
    detailedGigChanged({ date: '', location: '', setList: '' });
    toggleDetail(true);
  }

  return (
    <main className={styles.main.outer}>
      <div className={styles.main.inner}>
        <GigList showDetail={enterDetail} />
        {authUser && navigator.onLine &&
          <button
            className={styles.floatingBtn.topLarge}
            onClick={addNewGig}
          >
            new gig
          </button>
        }
      </div>

      <DelayedGig
        delayTime={300}
        authUser={authUser}
        isMounted={isDetail}
        exit={exitDetail}
      />
    </main>
  );
}


const mapStateToProps = state => {
  const { detailedGig } = state.gigs;
  return { detailedGig }
}

export default connect(mapStateToProps, { detailedGigChanged })(Gigs);
