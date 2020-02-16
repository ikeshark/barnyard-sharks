export const processDate = date => {
  if (date === '') {
    return ''
  } else if (typeof date === 'string') {
    return new Date(date).getTime();
  } else if (typeof date === 'number') {
    const dateObj = new Date(date);
    let month = dateObj.getMonth() + 1;
    month = (month.toString().length === 1) ? '0' + month : month;
    const year = dateObj.getFullYear();
    let day = dateObj.getDate();
    day = (day.toString().length === 1) ? '0' + day : day;
    return `${month}/${day}/${year}`;
  }
};

export const validateDate = date => {
  return /^[0-1][0-9]\/[0-3][0-9]\/[1-2][0-9][0-9][0-9]$/.test(date);
}

// export const onDateChange = value => {
//   if (validateDate(value)) {
//     return processDate(value);
//   } else {
//     return value;
//   }
// };
