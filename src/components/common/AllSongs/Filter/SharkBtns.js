import React from 'react';
import { connect } from 'react-redux';

import { sharksFilterChanged } from '../../../../actions';
import SharkSelect from '../../SharkSelect';

console.log(sharksFilterChanged.toString())

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
    w-full -mb-1
    font-futura font-bold text-lg text-center
  `,
}

const SharkBtns = ({ sharks, filterView, sharksFilter, sharksFilterChanged }) => {
  console.log(sharksFilterChanged.toString())

  return (
    <div
      id="sharksWrapper"
      className={filterView === 'sharks' ? styles.wrapper : styles.wrapper + " hidden"}
    >
      <h4 className={styles.heading}>
        WHO IS <em>NOT</em> HERE?
      </h4>
      <SharkSelect
        sharks={sharks}
        handleChange={e => sharksFilterChanged(e.target.value)}
        checkedCondition={sharksFilter}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { sharksFilter } = state.filter;
  return { sharksFilter };
};


export default connect(mapStateToProps, { sharksFilterChanged })(SharkBtns);
