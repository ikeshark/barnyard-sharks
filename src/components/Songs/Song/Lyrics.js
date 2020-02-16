import React, { useState } from 'react';
import { Modal } from '../../common';

const styles = {
  btnOuter: 'relative text-left text-sm border border-black rounded-lg shadow-card p-2',
  btnText: 'absolute top-0 left-0 ml-2 mt-2 text-lg text-left leading-none',
  modalInner: `
    h-full
    bg-white shadow-inset
    p-4 text-lg
    flex flex-col
  `,
  textArea: `
    block w-full h-11/12 mt-2 p-4
    border border-black font-monospace text-lg
  `,
}

const LyricInput = ({ lyrics, storeLyrics }) => {
  // opens modal if true
  const [isEdit, toggleEdit] = useState(false);
  const [newLyrics, inputLyrics] = useState('');

  const handleExit = () => {
    if (newLyrics) {
      storeLyrics(newLyrics)
    }
    inputLyrics('');
    toggleEdit(!isEdit);
  }

  return (
    <>
      <button
        style={{ gridArea: 'lyrics' }}
        className={lyrics ? styles.btnOuter + ' bg-pink' : styles.btnOuter}
        onClick={() => toggleEdit(!isEdit)}
      >
        <span className={styles.btnText}>
          Lyrics / <br/>Chords
        </span>
      </button>
      {isEdit &&
        <Modal innerStyles="w-10/12 h-10/12" exit={handleExit}>
          <label className={styles.modalInner}>
            lyrics / chords
            <textarea
              name="lyrics"
              className={styles.textArea}
              onChange={e => inputLyrics(e.target.value)}
              value={newLyrics || lyrics}
            >
            </textarea>
          </label>
        </Modal>
      }
    </>
  )
}

export default LyricInput
