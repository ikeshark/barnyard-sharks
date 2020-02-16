import React, { useState } from 'react';
import { Modal, SharkSelect } from '../../common';

import { toggleValue } from '../../../utils';

const styles = {
  btnOuter: 'relative text-left text-sm border border-black rounded-lg shadow-card p-2',
  btnText: 'absolute top-0 left-0 ml-2 mt-2 text-lg text-left leading-none',
  modalInner: `
    h-full
    bg-white shadow-inset
    p-4 text-lg
    flex flex-col
  `,
}

const ReqSharkInput = ({ reqSharks, storeReqSharks, sharks }) => {
  const [isEdit, toggleEdit] = useState(false);
  const [newReqShark, inputReqShark] = useState('');

  const handleExit = () => {
    if (newReqShark) {
      storeReqSharks(newReqShark)
    }
    inputReqShark('');
    toggleEdit(!isEdit);
  }

  const handleReqSharkChange = e => {
    if (!newReqShark) inputReqShark(toggleValue(e.target.value, reqSharks));
    else inputReqShark(toggleValue(e.target.value, newReqShark));
  }

  return (
    <>
      <button
        className={reqSharks ? styles.btnOuter + " bg-pink" : styles.btnOuter}
        style={{ gridArea: 'required' }}
        onClick={() => toggleEdit(!isEdit)}
      >
        <span className={styles.btnText}>Required Sharks</span>
      </button>

      {isEdit &&
        <Modal innerStyles={styles.modalInner} exit={handleExit}>
          <h3 className="font-futura font-bold w-full text-2xl text-center">
            WHO IS REQUIRED?
          </h3>
          <SharkSelect
            checkedCondition={newReqShark || reqSharks}
            handleChange={handleReqSharkChange}
            sharks={sharks}
          />
        </Modal>
      }
    </>
  )
}

export default ReqSharkInput
