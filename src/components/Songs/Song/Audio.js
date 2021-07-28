import React, { useState } from 'react';
import { Modal } from '../../common';

import {
  input,
  submitBtn,
  modalInner,
} from '../../../classLists';

const styles = {
  audio: input.label + ' block mb-4',
  inputLG: input.input,
  iframe: input.label + ' relative w-full h-80px',
  modalInner,
  submitBtn: submitBtn + ' mb-4 mx-auto',
  embedBtn: `
    absolute top-0 right-0 mt-2 mr-2 h-10/12
    rounded-10 px-2 btn-toggle border border-currentColor
    leading-tight
  `
}

const Audio = ({ audioObj, name, storeAudio }) => {
  // opens modal if true
  const [isEdit, toggleEdit] = useState(false);
  const [newAudio, setNewAudio] = useState('');
  const [error, setError] = useState('');

  const processAudioEmbed = e => {
    e.preventDefault();
    // blank input 'deletes' current embed
    if (!newAudio) {
      storeAudio(null);
      handleExit();
    }

    const reSoundCloud = /soundcloud/i;
    const reBandCamp = /bandcamp/i;
    let host;
    if (reBandCamp.test(newAudio)) {
      host = 'bandcamp';
    } else if (reSoundCloud.test(newAudio)) {
      host = 'soundcloud';
    } else {
      setError('invalid embed');
      return false;
    }
    // looks for the word track(s) followed by "=" or "/"
    // then records the numbers
    const reTrackID = /tracks?[=/](\d+)/;
    const trackID = reTrackID.exec(newAudio)[1];

    storeAudio({ host, trackID });
    handleExit();
  }
  const onAudioChange = e => {
    setError('');
    setNewAudio(e.target.value)
  }

  const handleExit = () => {
    setError('');
    setNewAudio('');
    toggleEdit(false);
  }

  const renderAudio = () => {
    if (audioObj && audioObj.host) {
      if (audioObj.host === 'soundcloud') {
        const source = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${audioObj.trackID}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`
        return <iframe className="w-10/12 h-full" title="soundcloud" src={source}></iframe>
      } else {
        const source = `https://bandcamp.com/EmbeddedPlayer/size=small/bgcol=ffffff/linkcol=0687f5/track=${audioObj.trackID}/transparent=true/`;
        return <iframe className="w-10/12 h-full" title="bandcamp" src={source}><p>{name}</p></iframe>
      }
    } else {
      return
    }
  }

  return (
    <>
      <div className={styles.iframe} style={{ gridArea: 'audio' }}>
        {renderAudio()}
        <button
          type="button"
          className={styles.embedBtn}
          onClick={() => toggleEdit(!isEdit)}
        >
          add <br /> embed
        </button>
      </div>
      {isEdit &&
        <Modal
          innerStyles="w-10/12 h-10/12 bg-white px-5 p-2"
          exit={handleExit}
        >
          <h2 className="text-center font-futura text-2xl">
            Add audio embed from Soundcloud or Bandcamp
          </h2>
          <p className="text-center text-xl">
            To remove the current embed, submit a blank input
          </p>
          <p className="text-center text-xl mt-2">
            To permanently store this embed, you <strong>must </strong>
            save edits on the song’s page
          </p>
          <form
            className="mt-2"
            onSubmit={e => processAudioEmbed(e)}
            style={{ gridArea: 'audio' }}
          >
            {error && <p className="font-bold">{error}</p>}
            <label className={styles.audio}>
              enter entire embed code
              <input
                name="newAudio"
                onChange={e => onAudioChange(e)}
                value={newAudio}
                className={styles.inputLG}
              />
            </label>
            <button className={styles.submitBtn}>
              Submit
            </button>
            <button
              className={styles.submitBtn}
              type="button"
              onClick={handleExit}
            >
              Cancel
            </button>
          </form>
        </Modal>
      }
    </>
  )
}
export default Audio;
