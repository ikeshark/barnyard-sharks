import React from 'react';

const styles = {
  wrapper: `
    flex flex-wrap justify-center -mx-2 md:mx-0 md:flex
  `,
  btn: `
    relative m-1 p-3 flex-grow
    border border-black rounded-10
    btn-toggle
  `,
  heading: `
    hidden md:block w-full -mb-1
    font-futura font-bold text-lg text-center
  `,
}


const StatusBtns = ({ filterView, statusFilter, filterByStatus }) => (
  <div
    id="statusWrapper"
    className={filterView === 'status' ? styles.wrapper : styles.wrapper + "hidden"}
  >
    <h4 className={styles.heading}>
      STATUS FILTER
    </h4>
    <button
      type="button"
      onClick={filterByStatus}
      className={statusFilter === 'solid' ?
        styles.btn + " bg-deeppink text-white shadow-sm" : styles.btn}
      value="solid"
    >
      Solid
    </button>
    <button
      type="button"
      onClick={filterByStatus}
      className={statusFilter === "shakey" ?
        styles.btn + " bg-deeppink text-white shadow-sm" : styles.btn}
      value="shakey"
    >
      Shakey
    </button>
    <button
      type="button"
      onClick={filterByStatus}
      className={statusFilter === "inactive" ?
        styles.btn + " bg-deeppink text-white shadow-sm" : styles.btn}
      value="inactive"
    >
      Inactive
    </button>
    <button
      type="button"
      onClick={filterByStatus}
      className={statusFilter === "retired" ?
        styles.btn + " bg-deeppink text-white shadow-sm" : styles.btn}
      value="retired"
    >
      Retired
    </button>
    <button
      type="button"
      onClick={filterByStatus}
      className={statusFilter === "idea" ?
        styles.btn + " bg-deeppink text-white shadow-sm" : styles.btn}
      value="idea"
    >
      Ideas
    </button>
  </div>
);

export default StatusBtns;
