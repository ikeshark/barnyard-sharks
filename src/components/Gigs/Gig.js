import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  gigUpdate,
  gigCreate,
  gigDelete,
  gigDateChanged,
  gigMessageChanged,
  gigSetListUpdated,
} from '../../actions';

import {
  Modal,
  Message,
  Confirm,
  DateInput,
  DetailWrapper,
  EditOrCreate,
} from '../common';

import SetList from './SetList';
import Media from './Media';

import {
  input,
  floatingBtn,
  submitBtn,
  modalInner,
  futuraHeading,
} from '../../classLists';

const styles = {
  wrapper: 'grid-gig h-full w-full p-4',
  label: input.label,
  addSong: floatingBtn.topSmall,
  btnSubmit: submitBtn,
  inputXL: input.input,
  modalInnerSm: modalInner,
  heading: futuraHeading + ' text-2xl my-1',
}

const Gig = ({
  detailedGig,

  gigCreate,
  gigDelete,
  gigUpdate,

  gigDateChanged,
  gigSetListChanged,
  gigMessageChanged,
  gigSetListUpdated,

  message,
  authUser,
  isUnmounting,
  exit
}) => {
  const [location, changeLocation] = useState(detailedGig.location);
  const [tab, setTab] = useState(detailedGig.media ? 'media' : 'setList');
  // is edit or create?
  const [isEdit, setIsEdit] = useState(!!detailedGig.id)

  // confirm is for deleting
  const [isConfirm, toggleConfirm] = useState(false);

  const onEdit = () => {
    const gig = {
      setList: detailedGig.setList,
      location: location || detailedGig.location,
      date: detailedGig.date,
      id: detailedGig.id,
    };
    gigUpdate(gig)
  }

  const onCreate = () => {
    const gig = {
      date: detailedGig.date,
      location,
      setList: detailedGig.setList,
    }

    setIsEdit(true);
    gigCreate(gig);
  }

  const onDelete = () => {
    exit();
    gigDelete(detailedGig.id)
  }

  const dismiss = () => {
    gigMessageChanged('')
  }

  return (
      <DetailWrapper
        handleExit={exit}
        classNames="gigWrapper"
        isUnmounting={isUnmounting}
      >
        {message &&
          <Message
            text={message.text}
            type={message.type}
            dismiss={dismiss}
          />
        }
        <div className={styles.wrapper}>
          <label className={styles.label} style={{ gridArea: 'where' }}>
            location
            <input
              onChange={e => changeLocation(e.target.value)}
              value={location}
              className={styles.inputXL}
            />
          </label>

          <DateInput
            labelText="Date"
            name="when"
            storeDate={gigDateChanged}
            date={detailedGig ? detailedGig.date : ''}
          />

          <div className="relative overflow-hidden" style={{ placeSelf: 'stretch', gridArea: 'what' }}>
            <h3 className={styles.heading}>
              <button
                onClick={e => setTab('media')}
                className={tab === 'media' ? 'underline font-bold mr-5' : 'mr-5'}
              >
                MEDIA
              </button>
              <button
                onClick={e => setTab('setList')}
                className={tab === 'setList' ? 'underline font-bold' : ''}
              >
                SETLIST
              </button>
            </h3>
            {tab === 'setList' ? (
              <SetList
                setList={detailedGig.setList ? detailedGig.setList.split(',') : []}
                storeSetList={gigSetListUpdated}
              />
            ) : <Media /> }
          </div>

          <EditOrCreate
            isEdit={isEdit}
            className={styles.btnSubmit}
            handleCreate={onCreate}
            handleEdit={onEdit}
            createValidation={location}
            editValidation={true}
          />
          {authUser &&
            <button
              style={{ gridArea: 'delete' }}
              onClick={() => toggleConfirm(true)}
            >
              Delete Gig
            </button>
          }
        </div>

        {isConfirm &&
          <Modal
            innerStyles={styles.modalInnerSm}
            exit={() => toggleConfirm(false)}
          >
            <Confirm
              onYes={onDelete}
              onNo={() => toggleConfirm(false)}
              message="Are you sure you want to delete this gig?"
            />
          </Modal>
        }
       </DetailWrapper>

  );
}

const mapStateToProps = state => {
  const { message, detailedGig } = state.gigs;
  return { message, detailedGig };
}

export default connect(mapStateToProps, {
  gigCreate,
  gigDelete,
  gigUpdate,
  gigMessageChanged,
  gigDateChanged,
  gigSetListUpdated,
})(Gig);
