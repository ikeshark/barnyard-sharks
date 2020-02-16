import { processDate, validateDate } from './date';
import toggleValue from './toggleValue';

const getNameById = (id, objTree) => {
  const objEntries = Object.entries(objTree);
  const obj = objEntries.filter(obj => obj[0] === id)[0];
  const name = obj[1].name;

  return name;
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export {
  reorder,
  processDate,
  validateDate,
  toggleValue,
  getNameById
}
