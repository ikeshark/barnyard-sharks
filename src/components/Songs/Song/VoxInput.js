import React, { useState } from 'react';
import { Modal, SharkSelect } from '../../common';

import { toggleValue, getNameById } from '../../../utils';

const styles = {
  btnOuter: 'relative text-left text-sm border border-black rounded-lg shadow-card p-2',
  btnText: 'absolute top-0 left-0 ml-2 mt-2 text-lg text-left leading-none',
  btnLabel: 'absolute top-0 left-0 mt-2 ml-2',
  btnValue: 'block text-xl mt-3 -mb-1',
  modalInner: `
    w-10/12 h-10/12
    bg-white shadow-inset
    p-4 text-lg
    flex flex-col
  `,
  btnToggle: `
    relative m-1 p-3
    border border-black rounded-10
    btn-toggle
  `
}

const LyricInput = ({ vox, storeVox, sharks }) => {
  const [isEdit, toggleEdit] = useState(false);
  const [newVox, inputVox] = useState('');

  const handleExit = () => {
    if (newVox) {
      storeVox(newVox)
    }
    inputVox('');
    toggleEdit(!isEdit);
  }

  const handleVoxChange = e => {
    const localVox = !newVox ? vox : newVox;

    let result;
    // instrumental is special because it can't be combined
    if (e.target.value === 'instrumental') {
      result = localVox === 'instrumental' ? '' : 'instrumental';
    } else if (localVox === 'instrumental') {
      result = e.target.value;
    } else {
      result = toggleValue(e.target.value, localVox);
    }
    inputVox(result);
  }

  const processVox = () => {
    if (vox === '') {
      return ''
    }
    const inputArray = vox.split(', ');
    const outputArray = inputArray.map(vox => {
      if (vox !== 'instrumental' && vox !== 'gang') {
        return getNameById(vox, sharks.active);
      } else {
        return vox
      }
    })
    return outputArray.join(', ');
  }

  return (
    <>
      <button
        style={{ gridArea: 'vocals' }}
        className={styles.btnOuter}
        onClick={() => toggleEdit(!isEdit)}
      >
        <span className={styles.btnLabel}>vocalist</span>
        <span className={styles.btnValue}>{processVox()}</span>
      </button>
      {isEdit &&
        <Modal innerStyles={styles.modalInner} exit={handleExit}>
          <SharkSelect
            checkedCondition={newVox || vox}
            handleChange={handleVoxChange}
          >
            <>
              <button
                type="button"
                onClick={handleVoxChange}
                className={
                  /gang/.test(newVox || vox) ?
                  styles.btnToggle + " bg-deeppink text-white shadow-sm" :
                  styles.btnToggle
                }
                value="gang"
                key="gang"
              >
                Gang
              </button>
              <button
                type="button"
                onClick={handleVoxChange}
                className={
                  /instrumental/.test(newVox || vox) ?
                  styles.btnToggle + " bg-deeppink text-white shadow-sm" :
                  styles.btnToggle
                }
                value="instrumental"
                key="instrumental"
              >
                Instrumental
              </button>
            </>
          </SharkSelect>
        </Modal>
      }
    </>
  )
}

export default LyricInput
