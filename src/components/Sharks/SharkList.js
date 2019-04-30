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

const SharkList = ({ sharks, detailedShark, showDetail }) => {
  const sharkArray = Object.entries(sharks.active);
  return (
    <ul className="songList">
      {sharkArray.map(shark => (
        <li key={shark[0]}>
          <button
            onClick={showDetail}
            className={detailedShark === shark[1] ? "active" : ""}
            value={shark[0]}
          >
            {shark[1].name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SharkList;
