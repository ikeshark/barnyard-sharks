import React from 'react';

const styles = {
  btn: `
    block w-2/3 mx-auto mb-4 p-2 text-xl
    border-4 border-double border-black rounded-lg
    disabled:border-gray-500 disabled:text-gray-500
  `
}

const Confirm = ({
  onYes,
  onNo,
  message,
  isDisabled,
}) => (
  <>
    <h2 className="text-center font-bold text-2xl">
      {message}
    </h2>
    <button
      id="proceed"
      onClick={onYes}
      className={styles.btn}
      disabled={isDisabled}
    >
      Proceed
    </button>
    <button
      id="cancelBtn"
      onClick={onNo}
      className={styles.btn}
      disabled={isDisabled}
    >
      Cancel
    </button>
  </>
);

export default Confirm;
