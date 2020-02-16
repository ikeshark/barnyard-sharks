import React from 'react';
import { connect } from 'react-redux';

import { vocalsFilterChanged } from '../../../../actions';
import {
  toggleBtn,
  futuraHeading,
} from '../../../../classLists';

const styles = {
  wrapper: 'flex flex-wrap justify-center -mx-2 md:mx-0 md:flex',
  btn: toggleBtn.inactive + ' m-1 flex-grow',
  active: toggleBtn.active,
  heading: futuraHeading + ' hidden md:block w-full -mb-1 text-lg',
}

const VocalBtns = ({ sharks, filterView, vocalsFilter, vocalsFilterChanged }) => {

  const getName = uid => {
    if (sharks.active) {
      return sharks.active[uid].name;
    }
  }
  const sharkIds = ['05x2qzOXABfcDkMGTClzDZxzBBt2', 'r6hSiQpBaNfqiPgKatywDJCDRL13', 'fUek7qwanvg3Sp8BJlp0NLswllO2'];
  return (
    <div className={filterView === 'vocals' ?
        styles.wrapper : styles.wrapper + ' hidden'}>
      <h4 className={styles.heading}>VOCALIST FILTER</h4>
      {sharkIds.map(id => (
        <button
          type="button"
          key={id}
          onClick={e => vocalsFilterChanged(e.target.value)}
          value={id}
          className={vocalsFilter === id ?
              styles.btn + styles.active : styles.btn}
        >
          {getName(id)}
        </button>
      ))}
      <button
        type="button"
        onClick={e => vocalsFilterChanged(e.target.value)}
        value="gang"
        className={vocalsFilter === "gang" ?
          styles.btn + styles.active : styles.btn}
      >
        Gang
      </button>
      <button
        type="button"
        onClick={e => vocalsFilterChanged(e.target.value)}
        value="instrumental"
        className={vocalsFilter === "instrumental" ?
          styles.btn + styles.active : styles.btn}
      >
        Instrumental
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { vocalsFilter } = state.filter;
  const { sharks } = state.sharks;
  return { vocalsFilter, sharks };
};

export default connect(mapStateToProps, { vocalsFilterChanged })(VocalBtns);
