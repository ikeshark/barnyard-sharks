import React, { useState } from 'react';
import { connect } from 'react-redux';

import SetList from './SetList';
import Media from './Media';

const What = ({
  authUser,

  detailedGig,
  setList,
  storeSetList,

  storeMedia,
}) => {
  const [tab, setTab] = useState('media');

  const setListArray = detailedGig.setList.split(',');

  return (
    <div className="relative overflow-hidden" style={{ placeSelf: 'stretch', gridArea: 'what' }}>
      <h3 className="font-futura font-bold text-center text-2xl my-1">
        <button
          value="media"
          onClick={e => setTab(e.target.value)}
          className={tab === 'media' ? 'underline mr-5' : 'mr-5'}
        >
          MEDIA
        </button>
        <button
          value="setList"
          onClick={e => setTab(e.target.value)}
          className={tab === 'setList' ? 'underline' : ''}
        >
          SETLIST
        </button>
      </h3>
      {tab === 'setList' ? (
        <SetList
          setList={setListArray}
          storeSetList={storeSetList}
        />
      ) : (
        <Media storeMedia={storeMedia} />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  const { detailedGig } = state.gigs;
  return { detailedGig };
}

export default connect(mapStateToProps)(What);
