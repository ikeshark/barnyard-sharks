import React, { useState } from 'react';
import { processDate, validateDate } from '../../utils';

import { input as styles } from '../../classLists';

const DateInput = ({ date, name, labelText, storeDate }) => {
  const [localDate, setLocalDate] = useState(null);

  const onDateChange = value => {
    if (validateDate(value)) {
      // set to null so props value shows
      // or maybe i don't need this since component should rerender
        // reseting useState to initial state of null?
      setLocalDate(null);
      storeDate(processDate(value));
    } else {
      setLocalDate(value);
    }
  }

  return (
    <label className={styles.label} style={{ gridArea: name }}>
      {labelText}
      <input
        name={name}
        onChange={e => onDateChange(e.target.value)}
        value={localDate || processDate(date)}
        className={styles.input}
        placeholder="mm/dd/yyyy"
      />
    </label>
  )
}

export default DateInput
