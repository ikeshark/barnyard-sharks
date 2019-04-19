import React from 'react';

const Modal = ({ children, onClose }) => (
  <div className="modalBG" onClick={onClose}>
    {children}
  </div>
);

export default Modal;
