import React from 'react';

const renderDate = date => {
  if (!date) {
    return '';
  }
  const dateObj = new Date(date);
  let month = dateObj.getMonth() + 1;
  month = (month.toString().length === 1) ? '0' + month : month;
  const year = dateObj.getFullYear();
  let day = dateObj.getDate();
  day = (day.toString().length === 1) ? '0' + day : day;
  return `${month}/${day}/${year}`
}

const GigList = ({ gigs, detailedGig, showDetail }) => {
  const gigArray = Object.entries(gigs).sort((a, b) => {
    return b[1].date - a[1].date;
  });
  return (
    <ul className="songList">
      {gigArray.map(gig => (
        <li key={gig[0]}>
          <button
            onClick={showDetail}
            className={detailedGig === gig[1] ? "active" : ""}
            value={gig[0]}
          >
            {renderDate(gig[1].date)} | {gig[1].location}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default GigList;
