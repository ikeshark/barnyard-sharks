const toggleValue = (value, csv) => {
  // if not found in list
  if (csv.indexOf(value) === -1) {
    // if list isn't empty, tack on at end, else return value
    return !!csv ? `${csv}, ${value}` : value;

    // if is in list and there are multiple items (comma)
  } else if (csv.indexOf(',') !== -1) {
    csv = csv.split(', ');
    csv.splice(csv.indexOf(value), 1);
    return csv.join(', ');
  } else {
    return ''
  }

}

export default toggleValue;
