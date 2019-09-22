import React from 'react';

const styles = {
  btn: `
    w-full mb-1 p-1
    border-gray border border-b-3
    bg-offwhite shadow-spread
    text-left text-xl leading-tight
    hover:bg-deeppink hover:text-white hover:border-transparent
  `,
  heading: 'font-futura text-center text-2xl underline font-bold'
}

const SharkList = ({ sharks, detailedShark, showDetail }) => {
  const activeSharks = Object.entries(sharks.active);
  const retiredSharks = Object.entries(sharks.retired);
  return (

    <ul className="p-3 overflow-y-scroll h-full lastItem-mb">
      <h3 className={styles.heading}>
        ACTIVE
      </h3>
      {activeSharks.map(shark => (
        <li key={shark[0]}>
          <button
            onClick={showDetail}
            className={styles.btn}
            value={shark[0]}
          >
            {shark[1].name}
          </button>
        </li>
      ))}
      <h3 className={styles.heading}>
        RETIRED
        </h3>
      {retiredSharks.map(shark => (
        <li key={shark[0]}>
          <button
            value={shark[0]}
            className={styles.btn}
          >
            {shark[1].name}
          </button>
        </li>
      ))}
    </ul>

  );
}

export default SharkList;
