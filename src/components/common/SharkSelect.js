import React from 'react';
import { connect } from 'react-redux';

import { toggleBtn } from '../../classLists';

const styles = {
  btn: toggleBtn.inactive + ' m-1 flex-grow',
  active: toggleBtn.active,
};

const SharkSelect = ({ sharks, checkedCondition, handleChange, children }) => {
  const sharkArray = Object.entries(sharks.active);
  const btns = sharkArray.map(shark => (
      <button
        type="button"
        onClick={handleChange}
        className={checkedCondition.indexOf(shark[0]) !== -1 ?
          styles.btn + styles.active : styles.btn}
        value={shark[0]}
        key={shark[0]}
      >
        {shark[1].name}
      </button>
    )
  );
  if (children) {
    btns.push(children);
  }

  return btns;
}


const mapStateToProps = (state) => {
  const { sharks } = state.sharks;
  return { sharks };
};

export default connect(mapStateToProps)(SharkSelect);
