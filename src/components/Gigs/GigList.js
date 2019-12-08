import React from 'react';

const renderDate = date => {
  if (!date) {
    return '';
  }
  const dateObj = new Date(date);
  let month = dateObj.getMonth() + 1;
  month = (month.toString().length === 1) ? '0' + month : month;
  let year = dateObj.getFullYear();
  year = year - 2000;
  let day = dateObj.getDate();
  day = (day.toString().length === 1) ? '0' + day : day;
  return `${month}.${day}.${year} - `
}

const styles = {
  btn: `
    w-full mb-1 p-1
    border-gray border border-b-3
    bg-offwhite shadow-spread
    text-left text-xl leading-tight
    hover:bg-deeppink hover:text-white hover:border-transparent
  `,
  icon: `
    px-1 rounded-full font-monospace text-xl
    text-shadow
  `
}

const GigList = ({ gigs, detailedGig, showDetail }) => {
  const gigArray = Object.entries(gigs).sort((a, b) => {
    return b[1].date - a[1].date;
  });
  return (
    <ul className="p-3 overflow-y-scroll h-full lastItem-mb">
      {gigArray.map(gig => (
        <li className="relative" key={gig[0]}>
          <button
            onClick={showDetail}
            className={styles.btn}
            value={gig[0]}
          >
            <span className="gigDate font-monospace">{renderDate(gig[1].date)}</span>
            <span className="gigLocation">{gig[1].location}</span>

          </button>
          <span className="absolute right-0 mr-2 mt-1">
            {gig[1].media &&
              <span className={styles.icon}>🖼️</span>
            }
            {!!gig[1].setList.length &&
              <span className={styles.icon}>📄</span>
            }
          </span>
        </li>
      ))}
    </ul>
  );
}

export default GigList;
