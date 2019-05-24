import React from 'react';

const SharkSelect = ({ sharks, checkedCondition, handleChange, children }) => {
  let sharkArray = Object.entries(sharks.active);
  let options = sharkArray.map(shark => {
    const test = new RegExp(shark[0]);
    let className = test.test(checkedCondition) ? "active " : "";
    className += 'label songVocalistOption'
    return (
      <label key={shark[0]} className={className}>
        {shark[1].name}
        <input
          key={shark[0]}
          type="checkbox"
          checked={test.test(checkedCondition)}
          value={shark[0]}
          className="input"
          onChange={handleChange}
        />
      </label>
    )}
  );
  if (children) {
    options.push(children);
  }

  return options;
}

export default SharkSelect;
