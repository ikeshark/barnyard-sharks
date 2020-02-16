import React, { useState } from 'react';
import { connect } from 'react-redux'
import {
  Modal,
  Confirm,
} from '../common';

import {
  gigMessageChanged,
  gigMediaAdded,
  gigMediaDeleted
} from '../../actions';

import { modalInner, floatingBtn } from '../../classLists';

const styles = {
  modalInner,
  addBtn: floatingBtn.topSmall,
};

const MediaItem = ({ item }) => {
  if (item.type === 'photo') {
    return <img className="block mx-auto mb-1" src={item.src} alt="" />
  }
}

const Media = ({ gigMediaAdded, gigMediaDeleted, gigMessageChanged, detailedGig, authUser }) => {
  const [isAddMedia, toggleAddMedia] = useState(false);
  const [isConfirm, toggleConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [src, setSrc] = useState('');
  const [mediaId, setMediaId] = useState(null);

  const media = detailedGig.media ?
    Object.entries(detailedGig.media) :
    [];

  const onAddMedia = () => {
    if (!detailedGig.id) {
      gigMessageChanged('You must create the gig first before adding media');
      return false;
    } else toggleAddMedia(true)
  }

  const onPushToMedia = e => {
    e.preventDefault();
    const duplicate = media.filter(media => media[1].src === src);
    if (duplicate.length) {
      setError('That media is already added');
      toggleAddMedia(false)
      return false;
    }

    const mediaObj = {
      type: 'photo',
      src
    }
    gigMediaAdded(mediaObj, detailedGig.id);
    toggleAddMedia(false);
  }
  const startDeleteMedia = e => {
    setMediaId(e.target.value);
    toggleConfirm(true);
  }
  const onFinishDeleteMedia = () => {
    gigMediaDeleted(detailedGig.id, mediaId);
    toggleConfirm(false);
  }


  return (
    <>
    <div className="h-full overflow-y-scroll flex flex-col">
      {error && <p>{error}</p>}
      {media.map(item => (
        <div
          className="relative mx-auto"
          style={{maxWidth: '500px'}}
          key={item[0]}
        >
          <MediaItem item={item[1]} />
          <button
            value={item[0]}
            onClick={startDeleteMedia}
            className="absolute right-0 top-0 ml-2 text-xl px-2 border-2 border-white text-white"
          >
            &times;
          </button>
        </div>
      ))}

      <button
        onClick={onAddMedia}
        type="button"
        className={styles.addBtn}
      >
        Add Media
      </button>
    </div>
    {isAddMedia &&
      <Modal
        innerStyles={styles.modalInner}
        exit={() => toggleAddMedia(false)}
      >
        <h2 className="text-center mb-4 font-futura">Please enter the source of the photo</h2>
        <form className="p-2">
          <input
            onChange={e => setSrc(e.target.value)}
            value={src}
            className="block text-lg mb-4 p-2 w-full border-black border-2"
          />
          <button
            onClick={onPushToMedia}
            type="submit"
            // disabled={!this.props.authUser || this.state.src}
            className="border-black border-2 text-lg block mx-auto p-2 rounded-lg"
          >
            save picture
          </button>
        </form>
      </Modal>
    }
    {isConfirm &&
      <Modal
        innerStyles={styles.modalInner}
        exit={() => toggleConfirm(false)}
      >
        <Confirm
          onYes={onFinishDeleteMedia}
          onNo={() => toggleConfirm(false)}
          message="Are you sure you want to delete this media item?"
          disabled={false}
        />
      </Modal>
    }
    </>
  );
}

const mapStateToProps = state => {
  const { detailedGig } = state.gigs;
  return { detailedGig };
}

export default connect(mapStateToProps, {
  gigMessageChanged,
  gigMediaAdded,
  gigMediaDeleted
})(Media);
