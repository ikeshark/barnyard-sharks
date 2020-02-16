import React from 'react';
import { connect } from 'react-redux';

import { sharksFilterChanged } from '../../../../actions';
import SharkSelect from '../../SharkSelect';

import { futuraHeading } from '../../../../classLists';

const styles = {
  wrapper: 'flex flex-wrap justify-center -mx-2 md:mx-0 md:flex',
  heading: futuraHeading + ' w-full -mb-1 text-lg',
}

const SharkBtns = ({ filterView, sharksFilter, sharksFilterChanged }) => (
  <div className={filterView === 'sharks' ?
      styles.wrapper : styles.wrapper + ' hidden'}>
    <h4 className={styles.heading}>
      WHO IS <em>NOT</em> HERE?
    </h4>
    <SharkSelect
      handleChange={e => sharksFilterChanged(e.target.value)}
      checkedCondition={sharksFilter}
    />
  </div>
);

const mapStateToProps = (state) => {
  const { sharksFilter } = state.filter;
  const { sharks } = state.sharks;
  return { sharksFilter, sharks };
};


export default connect(mapStateToProps, { sharksFilterChanged })(SharkBtns);
