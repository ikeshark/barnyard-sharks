import React, { useState } from 'react';
import { connect } from 'react-redux';

import { detailedSharkChanged } from '../../actions';
import Shark from './Shark';
import SharkList from './SharkList';
import delayUnmounting from '../common/delayUnmounting';

import { main as styles } from '../../classLists';

const SharkDelayUnmount = delayUnmounting(Shark);


const Sharks = ({ detailedSharkChanged, detailedShark, authUser }) => {
  const [isDetail, toggleDetail] = useState(false);

  const enterDetail = e => {
    detailedSharkChanged(e.target.value);
    toggleDetail(true);
  }

  const exitDetail = e => {
    const modalBG = document.querySelector('#halfModalBG');
    const exitBtn = document.querySelector('#detailExit');

    if (e.target === modalBG || e.target === exitBtn) toggleDetail(false);
  }

  return (
    <main className={styles.outer}>
      <div className={styles.inner}>
        <SharkList showDetail={enterDetail} />
      </div>

      <SharkDelayUnmount
        delayTime={300}
        authUser={authUser}
        isMounted={isDetail}
        exit={exitDetail}
      />
    </main>
  );
}

const mapStateToProps = state => {
  const { detailedShark } = state.sharks;
  return { detailedShark };
}

export default connect(mapStateToProps, { detailedSharkChanged })(Sharks);
