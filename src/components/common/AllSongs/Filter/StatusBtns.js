import React from 'react';
import { connect } from 'react-redux';

import { statusFilterChanged } from '../../../../actions';

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

const StatusBtns = ({ filterView, statusFilter, statusFilterChanged }) => {
  const statuses = ['solid', 'shakey', 'inactive', 'retired', 'idea'];
  return (
  <div className={filterView === 'status' ?
      styles.wrapper : styles.wrapper + ' hidden'}>
    <h4 className={styles.heading}>
      STATUS FILTER
    </h4>
    {statuses.map(status => (
      <button
        type="button"
        key={status}
        onClick={e => statusFilterChanged(e.target.value)}
        className={statusFilter.indexOf(status) !== -1 ?
          styles.btn + styles.active : styles.btn}
        value={status}
      >
        {status}
      </button>
    ))}
  </div>
)};

const mapStateToProps = (state) => {
  const { statusFilter } = state.filter;
  return { statusFilter };
};


export default connect(mapStateToProps, { statusFilterChanged })(StatusBtns);
