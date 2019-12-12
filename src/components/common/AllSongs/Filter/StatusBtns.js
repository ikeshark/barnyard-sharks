import React from 'react';
import { connect } from 'react-redux';

import { statusFilterChanged } from '../../../../actions';

const styles = {
  wrapper: `
    flex flex-wrap justify-center -mx-2 md:mx-0 md:flex
  `,
  btn: `
    relative m-1 p-3 flex-grow
    border border-black rounded-10
    btn-toggle
  `,
  heading: `
    hidden md:block w-full -mb-1
    font-futura font-bold text-lg text-center
  `,
}

const StatusBtns = ({ filterView, statusFilter, statusFilterChanged }) => {
  const statuses = ['solid', 'shakey', 'inactive', 'retired', 'idea'];
  return (
  <div
    id="statusWrapper"
    className={filterView === 'status' ? styles.wrapper : styles.wrapper + "hidden"}
  >
    <h4 className={styles.heading}>
      STATUS FILTER
    </h4>
    {statuses.map(status => (
      <button
        type="button"
        key={status}
        onClick={e => statusFilterChanged(e.target.value)}
        className={statusFilter === status ?
          styles.btn + " bg-deeppink text-white shadow-sm" : styles.btn}
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
