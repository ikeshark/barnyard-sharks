import React from 'react';

const styles = `
  relative m-1 p-3 flex-grow
  border border-black rounded-10
  btn-toggle
`;

const SharkSelect = ({ sharks, checkedCondition, handleChange, children }) => {
  const sharkArray = Object.entries(sharks.active);
  const btns = sharkArray.map(shark => {
    const test = new RegExp(shark[0]);
    const className = test.test(checkedCondition) ?
      styles + " bg-deeppink text-white shadow-sm" :
      styles;
    return (
      <button
        type="button"
        onClick={handleChange}
        className={className}
        value={shark[0]}
        key={shark[0]}
      >
        {shark[1].name}
      </button>
    )}
  );
  if (children) {
    btns.push(children);
  }

  return btns;
}

export default SharkSelect;
