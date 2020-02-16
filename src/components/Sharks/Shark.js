import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  sharkUpdate,
  sharkDateChanged,
  sharkFavSongsChanged,
  sharkMessageChanged,
} from '../../actions';

import {
  submitBtn,
  input,
  heading,
} from '../../classLists';

import SetList from '../Gigs/SetList';
import { DetailWrapper, Message, DateInput } from '../common/';

const styles = {
  submitBtn,
  input,
  heading,
  wrapper: 'grid-shark overflow-y-scroll h-full w-full p-4',
}

const Shark = ({
  authUser,
  detailedShark,

  sharkDateChanged,
  sharkFavSongsChanged,
  sharkUpdate,
  sharkMessageChanged,

  message,
  isUnmounting,
  exit
}) => {
  const [name, setName] = useState(detailedShark.name)

  const handleEdit = () => {
    const shark = { ...detailedShark, name: name || detailedShark.name }
    sharkUpdate(shark)
  }

  const dismiss = () => {
    sharkMessageChanged('')
  }

  // if current user is the detailed shark, you are valid
  const validated = authUser && authUser.uid === detailedShark.id;

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
        <label className={styles.input.label}>
          Name
          <input
            onChange={e => setName(e.target.value)}
            value={name}
            className={styles.input.input}
          />
        </label>

        <DateInput
          labelText="Shark Since"
          name="when"
          storeDate={sharkDateChanged}
          date={detailedShark ? detailedShark.sharkSince : ''}
        />

        <div className="overflow-y-scroll relative" style={{ gridArea: 'favs' }}>
          <h3 className={styles.heading.futura}>
            A SHARK’S <br />DOZEN
          </h3>
          <SetList
            setList={detailedShark.favSongs ? detailedShark.favSongs.split(',') : []}
            storeSetList={sharkFavSongsChanged}
          />
        </div>

        {validated && navigator.onLine &&
          <button
            className={styles.submitBtn}
            type="submit"
            style={{ gridArea: 'submit' }}
            onClick={handleEdit}
          >
            save edits
          </button>
        }
      </div>


    </DetailWrapper>
  );
}

const mapStateToProps = state => {
  const { detailedShark, message } = state.sharks;
  return { detailedShark, message }
}

export default connect(mapStateToProps, {
  sharkFavSongsChanged,
  sharkDateChanged,
  sharkUpdate,
  sharkMessageChanged,
})(Shark);
