import React from 'react';

const styles = {
  outer: `
    fixed top-0 left-0
    h-mainWrapper-full w-full
    z-10 mt-16
    bg-black-opaque
  `,
  inner: `
    absolute top-0 right-0 w-11/12 md:w-10/12 h-full max-w-666
    bg-white shadow-card animation-slideIn transition-md
  `,
  btnClose: `
    absolute bottom-0 left-0 mb-y-center -ml-6
    border border-black rounded-sm
    shadow-card p-2 bg-white leading-none
  `,
}
const DetailWrapper = ({
  handleExit,
  children,
  isUnmounting,
  classNames
}) => {
  const innerClassName = isUnmounting ?
  `${classNames} ${styles.inner} slideOut`
  : `${classNames} ${styles.inner}`;
  const outerClassName = isUnmounting ? styles.outer + " fadeOut" : styles.outer;
  return (
    <div id="halfModalBG" className={outerClassName} onClick={handleExit}>
      <div className={innerClassName}>
        {children}
        <button
          id="detailExit"
          type="button"
          onClick={handleExit}
          className={styles.btnClose}
        >
          >
        </button>
      </div>
    </div>
  )
}
export default DetailWrapper;
