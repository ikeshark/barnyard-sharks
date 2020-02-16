import React from 'react';
import { connect } from 'react-redux';

import { processDate } from '../../utils';
import { mainList } from '../../classLists';
const styles = {
  mainList,
  icon: `
    px-1 rounded-full font-monospace text-xl
    text-shadow
  `
}

const GigList = ({ gigs, detailedGig, showDetail }) => {
  const gigArray = Object.entries(gigs).sort((a, b) => {
    return b[1].date - a[1].date;
  });
  const onClick = e => {
    const value = e.target.value ? e.target.value : e.target.parentNode.value;
    showDetail(value);
  }
  return (
    <ul className={styles.mainList.wrapper}>
      {gigArray.map(gig => (
        <li className="relative" key={gig[0]}>
          <button
            onClick={onClick}
            className={styles.mainList.btn}
            value={gig[0]}
          >
            <span className="font-monospace">{processDate(gig[1].date)} </span>
            <span>{gig[1].location}</span>

          </button>
          <span className="absolute right-0 mr-2 mt-1">
            {gig[1].media &&
              <span
                role="img"
                aria-label="media available"
                className={styles.icon}
              >🖼</span>
            }
            {!!gig[1].setList.length &&
              <span
                role="img"
                aria-label="setlist available"
                className={styles.icon}
              >📄</span>
            }
          </span>
        </li>
      ))}
    </ul>
  );
}

const mapStateToProps = state => {
  const { gigs, detailedGig } = state.gigs;
  return { gigs, detailedGig }
}


export default connect(mapStateToProps)(GigList);
