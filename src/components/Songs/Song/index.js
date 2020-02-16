import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  songUpdate,
  songCreate,
  songDelete,
  songDateChanged,
  songLyricsChanged,
  songVoxChanged,
  songAudioChanged,
  songReqSharksChanged,
  songMessageChanged,
} from '../../../actions';

import {
  Modal,
  DetailWrapper,
  EditOrCreate,
  Confirm,
  DateInput,
  Message
} from '../../common';

import LyricInput from './Lyrics';
import VoxInput from './VoxInput';
import Audio from './Audio';
import ReqSharkInput from './ReqSharkInput';

import {
  input,
  floatingBtn,
  submitBtn,
  modalInner,
  futuraHeading,
} from '../../../classLists';

const styles = {
  wrapper: 'grid-song h-full w-full p-4',
  label: input.label,
  cover: 'absolute top-0 right-0 mt-6 mr-8 text-sm md:mr-10 lg:mr-20',
  addSong: floatingBtn.topSmall,
  btnSubmit: submitBtn,
  inputXL: input.input,
  modalInnerSm: modalInner,
  heading: futuraHeading + ' text-2xl my-1',
}

const Song = ({
  sharks,
  songs,
  gigs,

  detailedSong,

  songAudioChanged,
  songCreate,
  songDateChanged,
  songDelete,
  songLyricsChanged,
  songMessageChanged,
  songReqSharksChanged,
  songUpdate,
  songVoxChanged,

  error,
  message,

  isUnmounting,
  exit
}) => {
  // local song attributes:
  const [status, changeStatus] = useState('');
  const [name, changeName] = useState(detailedSong.name);
  const [isCover, toggleCover] = useState(detailedSong.isCover);

  // is edit or create?
  const [isEdit, setIsEdit] = useState(!!detailedSong.id)

  // confirm here is for deleting
  const [isConfirm, toggleConfirm] = useState(false);

  const onChangeName = e => changeName(e.target.value);

  const onEdit = () => {
    const { audio, dob, id, lyrics, reqSharks, vox } = detailedSong;
    const song = {
      audio,
      dob,
      id,
      isCover,
      lyrics,
      name: name || detailedSong.name,
      reqSharks,
      status: status || detailedSong.status,
      vox,
    };
    songUpdate(songs, song);
  }
  const onCreate = () => {
    const { dob, lyrics, vox, reqSharks, audio, id } = detailedSong;
    const song = { audio, dob, id, name, vox, status, isCover, lyrics, reqSharks };

    setIsEdit(true);
    songCreate(songs, song);
  }

  const findSongInSetLists = () => {
    const gigsValues = Object.values(gigs);
    const id = detailedSong.id;
    // if there isn't a id no need to do the rest
    if (!id) return false;
    let gigCount = 0;
    gigsValues.forEach(gig => {
      if (gig.setList.indexOf(id) !== -1) gigCount++;
    })

    const sharksValues = Object.values(sharks.active);
    let sharkFavCount = 0;
    sharksValues.forEach(shark => {
      if (shark.favSongs && shark.favSongs.indexOf(id) !== -1) sharkFavCount++;
    })

    return { gig: gigCount, sharkFav: sharkFavCount }
  }

  const count = findSongInSetLists();

  const dismiss = () => {
    songMessageChanged('')
  }

  const handleDelete = () => {
    if (count.gig || count.sharkFav) {
      songMessageChanged('You can not delete a song that is included in a setlist or A Sharks’ Dozen list')
    } else if (!detailedSong.id) {
      songMessageChanged('You can’t delete a song that hasn’t been made')
    } else {
      toggleConfirm(true)
    }
  }

  const onDelete = () => {
    exit();
    songDelete(detailedSong.id)
  }

    return (
      <DetailWrapper
        handleExit={exit}
        classNames="songWrapper"
        isUnmounting={isUnmounting}
      >
        {message &&
          <Message
            text={message.text}
            type={message.type}
            dismiss={dismiss}
          />}
        <div className={styles.wrapper}>
          <label className={styles.label} style={{ gridArea: 'name' }}>
            name
            <input
              onChange={onChangeName}
              value={name}
              className={styles.inputXL}
            />
          </label>
          {detailedSong.id && <p style={{ gridArea: 'stats' }}>This song is found in {count.gig} gigs</p>}

          <DateInput
            labelText="Date of birth"
            name="dob"
            storeDate={songDateChanged}
            date={detailedSong ? detailedSong.dob : ''}
          />

          <label className={styles.label} style={{ gridArea: 'status' }}>
            status
            <select
              name="status"
              onChange={e => changeStatus(e.target.value)}
              value={status || detailedSong.status}
              className={styles.inputXL}
            >
              <option value="solid">solid</option>
              <option value="shakey">shakey</option>
              <option value="inactive">inactive</option>
              <option value="retired">retired</option>
              <option value="idea">idea</option>
            </select>
          </label>

          <VoxInput
            vox={detailedSong.vox}
            sharks={sharks}
            storeVox={songVoxChanged}
          />

          <Audio
            audioObj={detailedSong.audio}
            name={name}
            storeAudio={songAudioChanged}
          />

          <LyricInput
            lyrics={detailedSong.lyrics}
            storeLyrics={songLyricsChanged}
          />

          <ReqSharkInput
            reqSharks={detailedSong.reqSharks}
            sharks={sharks}
            storeReqSharks={songReqSharksChanged}
          />

          <EditOrCreate
            isEdit={isEdit}
            className={styles.btnSubmit}
            handleCreate={onCreate}
            handleEdit={onEdit}
            createValidation={name}
            editValidation={true}
          />
          <button
            style={{ gridArea: 'delete' }}
            onClick={handleDelete}
          >
            Delete Song
          </button>

          <label className={styles.cover}>
            {isCover ? "cover" : "original"}
            <input
              type="checkbox"
              className="invisible"
              onChange={() => toggleCover(!isCover)}
              checked={isCover} // to do: this is a problem
            />
          </label>

        </div>

        {isConfirm &&
          <Modal
            innerStyles={styles.modalInner}
            exit={toggleConfirm}
          >
            <Confirm
              onYes={onDelete}
              onNo={() => toggleConfirm()}
              message="Are you sure you want to delete this song?"
            />
          </Modal>
        }
       </DetailWrapper>
    );
  }

const mapStateToProps = state => {
  const { songs, message, detailedSong } = state.songs;
  const { gigs } = state.gigs;
  const { sharks } = state.sharks;
  return { songs, message, detailedSong, gigs, sharks };
}

export default connect(mapStateToProps, {
  songAudioChanged,
  songCreate,
  songDateChanged,
  songDelete,
  songLyricsChanged,
  songMessageChanged,
  songReqSharksChanged,
  songUpdate,
  songVoxChanged,
})(Song);
