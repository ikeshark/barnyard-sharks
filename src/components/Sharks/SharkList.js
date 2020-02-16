import React from 'react';
import { connect } from 'react-redux';

import { mainList, heading } from '../../classLists';

const styles = {
  mainList,
  heading,
}

const SharkList = ({ sharks, detailedShark, showDetail }) => {
  const activeSharks = Object.entries(sharks.active);
  const retiredSharks = Object.entries(sharks.retired);
  return (
    <ul className={styles.mainList.wrapper}>
      <h3 className={styles.heading.futura}>
        ACTIVE
      </h3>
      {activeSharks.map(shark => (
        <li key={shark[0]}>
          <button
            onClick={showDetail}
            className={styles.mainList.btn}
            value={shark[0]}
          >
            {shark[1].name}
          </button>
        </li>
      ))}
      <h3 className={styles.heading.futura}>
        RETIRED
        </h3>
      {retiredSharks.map(shark => (
        <li key={shark[0]}>
          <button
            value={shark[0]}
            className={styles.mainList.btn}
          >
            {shark[1].name}
          </button>
        </li>
      ))}
    </ul>

  );
}

const mapStateToProps = state => {
    const { sharks, detailedShark } = state.sharks;
    return { sharks, detailedShark }
}

export default connect(mapStateToProps)(SharkList);
