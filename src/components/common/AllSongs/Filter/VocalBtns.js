import React from 'react';
import { connect } from 'react-redux';

import { vocalsFilterChanged } from '../../../../actions';
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
  btnActive: ' bg-deeppink text-white shadow-sm',
}

const VocalBtns = ({ sharks, filterView, vocalsFilter, vocalsFilterChanged }) => {

  const getName = uid => {
    if (sharks.active) {
      return sharks.active[uid].name;
    }
  }
  const sharkIds = ['05x2qzOXABfcDkMGTClzDZxzBBt2', 'r6hSiQpBaNfqiPgKatywDJCDRL13', 'fUek7qwanvg3Sp8BJlp0NLswllO2'];
  const { wrapper, heading, btn, btnActive } = styles;
  return (
    <div
      id="vocalsWrapper"
      className={filterView === 'vocals' ? wrapper : wrapper + " hidden"}
    >
      <h4 className={heading}>
        VOCALIST FILTER
      </h4>
      {sharkIds.map(id => (
        <button
          type="button"
          key={id}
          onClick={e => vocalsFilterChanged(e.target.value)}
          value={id}
          className={vocalsFilter === id ? btn + btnActive : btn}
        >
          {getName(id)}
        </button>
      ))}
      <button
        type="button"
        onClick={e => vocalsFilterChanged(e.target.value)}
        value="gang"
        className={vocalsFilter === "gang" ? btn + btnActive : btn}
      >
        Gang
      </button>
      <button
        type="button"
        onClick={e => vocalsFilterChanged(e.target.value)}
        value="instrumental"
        className={vocalsFilter === "instrumental" ? btn + btnActive : btn}
      >
        Instrumental
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { vocalsFilter } = state.filter;
  return { vocalsFilter };
};

export default connect(mapStateToProps, { vocalsFilterChanged })(VocalBtns);
