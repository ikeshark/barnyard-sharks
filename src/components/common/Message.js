import React, { useState } from 'react';

const Message = ({ text, type, dismiss }) => {
  const [isUnloading, unload] = useState(false)
  let styles = `
    max-420 fixed top-0 left-0 w-11/12
    mt-2 ml-1/2 translate-1/2 z-100
    p-4 bg-pink shadow-xl font-bold text-center text-lg
    border-4 border-currentColor rounded-10
    animation-fadeIn
  `;

  if (type === 'error') styles += ' text-red';

  const fadeOut = () => {
    unload(true);
    setTimeout(dismiss, 300)
  }

  var to = setTimeout(fadeOut, 7000);

  const onDismiss = () => {
    clearTimeout(to)
    fadeOut();
  }
  return (
    <div
      className={isUnloading ? styles += ' fadeOut' : styles}
      onClick={onDismiss}
    >
      {text}
    </div>
  )
}

export default Message;
