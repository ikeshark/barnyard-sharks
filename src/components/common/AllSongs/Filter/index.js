import React, { useState } from 'react';
import { connect } from 'react-redux';

import StatusBtns from './StatusBtns';
import VocalBtns from './VocalBtns';
import SharkBtns from './SharkBtns';

import { filterDisplayChanged, coverFilterChanged, sortTypeChanged } from '../../../../actions';
import {
  toggleBtn,
  futuraHeading,
} from '../../../../classLists';
const styles = {
  hideBtn: toggleBtn.inactive + ' w-full mx-auto my-1',
  sortBtn: toggleBtn.inactive + ' flex-grow w-full mx-auto my-1 md:w-auto md:mx-1',
  active: toggleBtn.active,

  heading: futuraHeading + ' underline text-xl',
  wrapper: `
    max-420 fixed bottom-0 w-11/12 ml-1/2 translate-1/2 flex p-4
    bg-white shadow-xl z-10 transition-md
    md:overflow-y-scroll md:static md:m-0 md:transform-none md:h-full md:w-1/2
    md:flex-col md:justify-around md:z-inherit
  `,
  sortWrapper: `
    flex flex-col justify-between
    w-1/3 pl-3 min-h-0
    border-l-2 border-gray-700
    md:w-full md:border-none md:pl-0 md:flex-row
  `,
  closeBtn: `
    absolute top-0 left-0
    ml-half -mt-4 px-2 pt-1
    border border-black rounded-lg
    text-xl leading-none bg-white
    md:hidden
  `,
}

const Filter = ({
  vocalsFilter,
  sharksFilter,
  statusFilter,
  sortType,
  isCoverFilter,
  isFilterDisplay,

  coverFilterChanged,
  filterDisplayChanged,
  sortTypeChanged,

  sharks,
}) => {
  const [filterView, setFilterView] = useState('status');

  const flipState = e => {
    setFilterView(e.target.value)
  }

  const navBtnClassName = (name, filter) => {
    const classes = 'mx-1 px-1 py-2 font-futura uppercase border-black border-2';
    if (filterView === name) {
      return classes + styles.active;
    } else if (filter) {
      return classes + ' bg-pink';
    } else return classes;
  }

  return (
    <div className={isFilterDisplay ?
        styles.wrapper : styles.wrapper + ' hideFilter'}>
      <div className="w-2/3 pr-4 md:w-full md:pr-0">
        <h3 className={styles.heading + ' md:hidden'}>FILTER</h3>
        <nav id="nav-filter" className="py-2 md:hidden flex justify-center">
          <button
            type="button"
            id="status"
            onClick={flipState}
            className={navBtnClassName('status', statusFilter)}
            value="status"
          >
            STATUS
          </button>
          <button
            type="button"
            id="vocals"
            onClick={flipState}
            className={navBtnClassName('vocals', vocalsFilter)}
            value="vocals"
          >
            VOX
          </button>
          <button
            type="button"
            id="covers"
            onClick={flipState}
            className={navBtnClassName('sharks', sharksFilter)}
            value="sharks"
          >
            SHARKS
          </button>
        </nav>

        <StatusBtns filterView={filterView} />
        <VocalBtns filterView={filterView} />
        <SharkBtns filterView={filterView} />

      </div>
      <div className={styles.sortWrapper}>
        <div className="md:w-1/2 md:pr-1 md:flex md:flex-wrap">
          <h3 className={styles.heading + ' w-full'}>SORT</h3>
          <button
            type="button"
            onClick={() => sortTypeChanged('newest')}
            className={sortType === 'newest' ?
              styles.sortBtn + styles.active : styles.sortBtn}
          >
            New
          </button>
          <button
            type="button"
            onClick={() => sortTypeChanged('oldest')}
            className={sortType === "oldest" ?
              styles.sortBtn + styles.active : styles.sortBtn}
          >
            Old
          </button>
        </div>
        <div className="md:w-1/2 md:pl-1">
          <h3 className={styles.heading}>HIDE</h3>
          <button
            id="covers"
            onClick={() => coverFilterChanged()}
            className={isCoverFilter ? styles.hideBtn : styles.hideBtn + styles.active}
            type="button"
          >
            Covers
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => filterDisplayChanged()}
        className={isFilterDisplay ? styles.closeBtn : styles.closeBtn + ' flipRotate'}
      >
        ^
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    vocalsFilter,
    sharksFilter,
    statusFilter,
    sortType,
    isCoverFilter,
    isFilterDisplay,
  } = state.filter;
  return {
    vocalsFilter,
    sharksFilter,
    statusFilter,
    sortType,
    isCoverFilter,
    isFilterDisplay,
  };
};

export default connect(mapStateToProps, {
  coverFilterChanged,
  filterDisplayChanged,
  sortTypeChanged,
})(Filter);
