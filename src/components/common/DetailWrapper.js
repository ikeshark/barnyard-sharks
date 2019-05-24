import React from 'react';

const DetailWrapper = ({
  handleExit,
  children,
  isUnmounting,
  classNames
}) => {
  const innerClassName = isUnmounting ?
  `${classNames} DetailWrapper slideOut`
  : `${classNames} DetailWrapper`;
  const outerClassName = isUnmounting ? "halfModalBG fadeOut" : "halfModalBG"
  return (
    <div className={outerClassName} onClick={handleExit}>
      <div className={innerClassName}>
        {children}
      </div>
    </div>
  )
}
export default DetailWrapper;
