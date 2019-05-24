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
  return `${month}.${day}.${year} -`
}

const GigList = ({ gigs, detailedGig, showDetail }) => {
  const gigArray = Object.entries(gigs).sort((a, b) => {
    return b[1].date - a[1].date;
  });
  return (
    <ul className="AllSongs gigList">
      {gigArray.map(gig => (
        <li key={gig[0]}>
          <button
            onClick={showDetail}
            className={detailedGig === gig[1] ? "active" : ""}
            value={gig[0]}
          >
            <span className="gigDate">{renderDate(gig[1].date)}</span>
            <span className="gigLocation">{gig[1].location}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default GigList;
